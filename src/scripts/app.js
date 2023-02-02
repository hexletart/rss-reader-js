/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import i18next from 'i18next';
import initView from './view';
import resources from './locales/index';
import validate from './validation/validate';
import getNotifications from './notifications';
import parseContentsData from './parser';
import indexSourceData from './indexSourceData';

const isValidResponse = (responseData) => {
  const { content_type: contentType, http_code: httpCode } = responseData.status;
  const rssRegex = /application\/rss\+xml/;
  const formatValidator = new RegExp(rssRegex);
  return _.inRange(httpCode, 200, 300) && (contentType && formatValidator.test(contentType));
};

const getAxiosResponse = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => response.data)
  .catch((err) => { throw err; });

export default (language = 'en') => {
  let notifications;

  const elements = {
    form: document.querySelector('.rss-form'),
    hint: document.querySelector('.agr-example'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    input: document.getElementById('form-input'),
    header: document.querySelector('.agr-header'),
    formLabel: document.querySelector('.rss-form label'),
    formSubmit: document.querySelector('.rss-submit'),
    dataSection: document.getElementById('section-data'),
    menuSection: document.getElementById('section-menu'),
    description: document.querySelector('.agr-description'),
    notification: document.querySelector('.feedback'),
    formSubmitContainer: document.querySelector('.rss-submit .spinner-container'),
    formSubmitDescription: document.querySelector('.rss-submit .button-description'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalButtonRead: document.querySelector('.modal-footer a'),
    modalButtonClose: document.querySelector('.modal-footer button'),
  };
  console.log(elements);

  const state = {
    lng: '',
    form: {
      field: {
        link: '',
      },
      processState: '',
      processError: null,
      formNotifications: {},
      involvedSources: [],
      uiState: {
        hasStarted: false,
        displayedPosts: [],
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

  const getNewPosts = (posts) => {
    const { posts: postsInState } = state.form.response;
    return posts.filter(({ postTitle: responsePostTitle }) => !postsInState
      .some(({ postTitle }) => responsePostTitle === postTitle));
  };

  const updatePosts = (watchedState) => {
    const { involvedSources } = state.form;
    setTimeout(
      () => {
        const promises = involvedSources.map((source) => getAxiosResponse(source)
          .then((responseData) => {
            if (isValidResponse(responseData)) return responseData.contents;
            throw notifications.errors.networkErrors.axiosError();
          })
          .then((responseContents) => parseContentsData(responseContents))
          .then(({ posts }) => getNewPosts(posts))
          .then((posts) => {
            if (!_.isEmpty(posts)) {
              watchedState.form.response.posts.unshift(...indexSourceData(posts));
            }
          })
          .catch((err) => { throw err; }));
        Promise.all(promises)
          .catch(() => {
            console.log(notifications.errors.networkErrors.axiosError());
          });
        return updatePosts(watchedState);
      },
      5000,
    );
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.uiState.hasStarted':
        updatePosts(watchedState);
        break;
      default: initView(elements, i18nInstance, path, value);
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
        watchedState.form.processError = null;
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
          return getAxiosResponse(watchedState.form.field.link)
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
                watchedState.form.uiState.hasStarted = true;
                watchedState.form.formNotifications = { notice: success };
                watchedState.form.processState = 'sent';
                console.log(watchedState, 'watchedState');
              } else {
                const error = notifications.errors.networkErrors.notValidRss();
                watchedState.form.formNotifications = { notice: error };
                watchedState.form.processState = 'error';
              }
            })
            .catch((err) => {
              throw err;
            });
        }
        watchedState.form.processState = 'error';
        return undefined;
      })
      .catch((caughtErr) => {
        const notice = (caughtErr.name !== 'AxiosError')
          ? notifications.errors.runtimeErrors.internalError()
          : notifications.errors.networkErrors.axiosError();
        console.log(notice);
        watchedState.form.processError = { notice };
        watchedState.form.processState = 'filling';
      });
  });
};
