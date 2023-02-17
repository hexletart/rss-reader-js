/* eslint-disable func-names */
/* eslint-disable no-console */

// import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import _ from 'lodash';
import i18next from 'i18next';
import { AxiosError } from 'axios';
import initView from './view';
import resources from './locales/index';
import validate from './validation/validate';
import parseContentsData from './utilities/parser';
import formNotice from './utilities/notifications';
import getAsyncResponse from './utilities/axiosGetter';
import indexSourceData from './utilities/sourceDataIndexator';
import updatePosts from './utilities/postUpdater';
import elements from './utilities/elements';

export default (language = 'en') => {
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
      uiButtonLng: 'passive',
    },
  };

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance
    .init({
      lng: language,
      debug: false,
      resources,
    });

  const noticeGetter = formNotice(i18nInstance);

  const watchedState = onChange(state, function (path, value) {
    switch (path) {
      case 'form.uiState.gotFirstResponse':
        updatePosts(this, noticeGetter);
        break;
      default: initView(this, elements, i18nInstance, path, value);
        break;
    }
  });

  const rendering = gettingInstance
    .then(() => { watchedState.lng = language; })
    .catch((err) => { throw err; });

  elements.input.addEventListener('input', (inputEvent) => {
    rendering
      .then(() => inputEvent.preventDefault())
      .then(() => {
        watchedState.form.processState = 'filling';
      })
      .catch((err) => { throw err; });
  });

  elements.formSwitchLabel.addEventListener('mouseover', (overEvent) => {
    rendering.then(() => {
      overEvent.preventDefault();
      watchedState.form.uiButtonLng = 'active';
    });
  });

  elements.formSwitchLabel.addEventListener('mouseout', (outEvent) => {
    rendering.then(() => {
      outEvent.preventDefault();
      watchedState.form.uiButtonLng = 'passive';
    });
  });

  elements.formSwitchLabel.addEventListener('click', () => {
    rendering
      .then(() => {
        const [oppositeLanguage] = ['ru', 'en'].filter((lng) => lng !== language);
        const currentLanguage = (elements.formSwitchCheckbox.checked) ? oppositeLanguage : language;
        i18nInstance.changeLanguage(currentLanguage)
          .then(() => {
            watchedState.lng = currentLanguage;
          })
          .catch((err) => { throw err; });
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
        return validate(watchedState.form.field, watchedState.form.involvedSources);
      })
      .then((error) => {
        const notice = ((error.message) ? noticeGetter({ noticeName: error.message }) : {});
        watchedState.form.formNotifications = notice;
        if (_.isEqual(watchedState.form.formNotifications, {})) {
          return getAsyncResponse(watchedState.form.field.link)
            .then((responseData) => {
              const { link } = watchedState.form.field;
              const { contents: gotDataByAxios } = responseData;
              const parsedResponseData = parseContentsData(gotDataByAxios, link);
              if (parsedResponseData) {
                const { feeds, posts } = parsedResponseData;
                const [indexedFeeds, indexedPosts] = [feeds, posts].map(indexSourceData);
                watchedState.form.response.feeds.unshift(...indexedFeeds);
                watchedState.form.response.posts.unshift(...indexedPosts);
                watchedState.form.involvedSources.push(link);
                watchedState.form.uiState.gotFirstResponse = true;
                watchedState.form.formNotifications = noticeGetter({ noticeName: 'rssUpload' });
                watchedState.form.processState = 'sent';
              } else {
                watchedState.form.formNotifications = noticeGetter({ noticeName: 'notValidRss' });
                watchedState.form.processState = 'error';
                setTimeout(() => {
                  watchedState.form.processState = 'filling';
                }, 2000);
              }
            })
            .catch((err) => {
              throw err;
            });
        }
        watchedState.form.processState = 'error';
        setTimeout(() => {
          watchedState.form.processState = 'filling';
        }, 2000);
        return undefined;
      })
      .catch((caughtErr) => {
        const notice = (caughtErr instanceof AxiosError)
          ? noticeGetter({ noticeName: 'internalError' })
          : noticeGetter({ noticeName: 'axiosError' });
        console.log(caughtErr);
        watchedState.form.formNotifications = notice;
        watchedState.form.processState = 'filling';
      });
  });
};
