/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

// import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import _ from 'lodash';
import i18next from 'i18next';
import initView from './view';
import resources from './locales/index';
import validate from './validation/validate';
import parseContentsData from './utilities/parser';
import getNotifications from './utilities/notifications';
import getAsyncResponse from './utilities/axiosGetter';
import indexSourceData from './utilities/sourceDataIndexator';
import isValidResponse from './utilities/responseDataValidator';
import updatePosts from './utilities/postUpdater';
import elements from './utilities/elements';

export default (language = 'en') => {
  let notifications;
  const state = {
    lng: '',
    form: {
      field: {
        link: '',
      },
      processState: '',
      involvedSources: [],
      formNotifications: {},
      uiState: {
        gotFirstResponse: false,
      },
      response: {
        posts: [],
        feeds: [],
      },
    },
  };

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance
    .init({
      lng: language,
      debug: false,
      resources,
    });

  const watchedState = onChange(state, function (path, value) {
    switch (path) {
      case 'form.uiState.gotFirstResponse':
        updatePosts(this, notifications);
        break;
      default: initView(this, elements, i18nInstance, path, value);
        break;
    }
  });

  const rendering = gettingInstance
    .then(() => { watchedState.lng = language; })
    .then(() => { notifications = getNotifications(i18nInstance); })
    .catch((err) => { throw err; });

  elements.input.addEventListener('input', (inputEvent) => {
    rendering
      .then(() => inputEvent.preventDefault())
      .then(() => {
        watchedState.form.processState = 'filling';
      })
      .catch((err) => { throw err; });
  });

  elements.form.addEventListener('submit', (submitEvent) => {
    rendering
      .then(() => submitEvent.preventDefault())
      .then(() => {
        const { value } = submitEvent.target.elements.url;
        watchedState.form.processState = 'sending';
        watchedState.form.field.link = value.trim();
        return validate(
          watchedState.form.field,
          watchedState.form.involvedSources,
          i18nInstance,
        );
      })
      .then((notice) => {
        watchedState.form.formNotifications = { notice };
        if (_.isEmpty(watchedState.form.formNotifications.notice)) {
          return getAsyncResponse(watchedState.form.field.link)
            .then((responseData) => {
              const { link } = watchedState.form.field;
              if (isValidResponse(responseData)) {
                const { contents: gotDataByAxios } = responseData;
                const parsedResponseData = parseContentsData(gotDataByAxios, link);
                const { feeds, posts } = parsedResponseData;
                const [indexedFeeds, indexedPosts] = [feeds, posts].map(indexSourceData);
                const success = notifications.successes.forms.rssUpload();
                watchedState.form.response.feeds.unshift(...indexedFeeds);
                watchedState.form.response.posts.unshift(...indexedPosts);
                watchedState.form.involvedSources.push(link);
                watchedState.form.uiState.gotFirstResponse = true;
                watchedState.form.formNotifications = { notice: success };
                watchedState.form.processState = 'sent';
              } else {
                const error = notifications.errors.networkErrors.notValidRss();
                watchedState.form.formNotifications = { notice: error };
                watchedState.form.processState = 'error';
                setTimeout(() => {
                  watchedState.form.processState = 'filling';
                }, 4000);
              }
            })
            .catch((err) => {
              throw err;
            });
        }
        watchedState.form.processState = 'error';
        setTimeout(() => {
          watchedState.form.processState = 'filling';
        }, 4000);
        return undefined;
      })
      .catch((caughtErr) => {
        const notice = (caughtErr.name !== 'AxiosError')
          ? notifications.errors.runtimeErrors.internalError()
          : notifications.errors.networkErrors.axiosError();
        console.log(notice);
        watchedState.form.formNotifications = { notice };
        watchedState.form.processState = 'filling';
      });
  });
};
