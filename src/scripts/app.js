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

const getAxiosResponse = (url) => axios
  .get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
  .then((response) => response.data)
  .catch((err) => { throw err; });

export default () => {
  let notifications;
  const defaultLanguage = 'ru';
  const rssRegex = /application\/rss\+xml/;
  const formatValidator = new RegExp(rssRegex);

  const elements = {
    form: document.querySelector('.rss-form'),
    hint: document.querySelector('.agr-example'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    input: document.getElementById('form-input'),
    header: document.querySelector('.agr-header'),
    formLabel: document.querySelector('.rss-form label'),
    formSubmit: document.querySelector('.rss-submit'),
    description: document.querySelector('.agr-description'),
    notification: document.querySelector('.feedback'),
  };

  const state = {
    lng: '',
    form: {
      field: {
        link: '',
      },
      processState: '',
      processError: null,
      mentionedFeedLinks: [],
      response: {
        posts: [],
        feeds: [],
      },
    },
    formNotifications: {},
  };

  const i18nInstance = i18next.createInstance();
  const gettingInstance = i18nInstance
    .init({
      lng: defaultLanguage,
      debug: false,
      resources,
    });

  const watchedState = onChange(state, initView(elements, i18nInstance));

  const rendering = gettingInstance
    .then(() => { watchedState.lng = defaultLanguage; })
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
          watchedState.form.mentionedFeedLinks,
          i18nInstance,
        );
      })
      .then((notice) => {
        watchedState.formNotifications = { notice };
        if (_.isEmpty(watchedState.formNotifications.notice)) {
          return getAxiosResponse(watchedState.form.field.link)
            .then((axiosResponse) => {
              const { content_type: contentType } = axiosResponse.status;
              if (contentType && formatValidator.test(contentType)) {
                const parser = new DOMParser();
                const parsedContents = parser.parseFromString(axiosResponse.contents, 'application/xml');
                const responseData = parseContentsData(
                  parsedContents,
                  watchedState.form.response.feeds.length,
                  watchedState.form.response.posts.length,
                );
                const { feeds, posts } = watchedState.form.response;
                const mergedResponse = _.mergeWith(
                  responseData,
                  { feeds, posts },
                  (src, dest) => dest.concat(src),
                );
                watchedState.form.response = { ...mergedResponse };
                watchedState.form.processState = 'sent';
                watchedState.form.mentionedFeedLinks.push(watchedState.form.field.link);
                const success = notifications.successes.forms.rssUpload();
                watchedState.formNotifications = { notice: success };
              } else {
                watchedState.form.processState = 'filling';
                const error = notifications.errors.networkErrors.notValidRss();
                watchedState.formNotifications = { notice: error };
              }
            })
            .catch((err) => {
              throw err;
            });
        }
        watchedState.form.processState = 'filling';
        return undefined;
      })
      .catch((caughtErr) => {
        const notice = (caughtErr.name !== 'AxiosError')
          ? notifications.errors.runtimeErrors.internalError()
          : notifications.errors.networkErrors.axiosError();
        watchedState.form.processError = { notice };
        watchedState.form.processState = 'filling';
        console.log(caughtErr);
      });
  });
};
