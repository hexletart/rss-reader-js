/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import initView from './view';
import resources from './locales/index';

const getNotifications = (wordHandler) => ({
  errors: {
    networkErrors: {
      notValidRss: () => new Error(wordHandler
        .t('aggregator.notifications.errors.process.notValidRss')),
      axiosError: () => new Error(wordHandler
        .t('aggregator.notifications.errors.process.axiosError')),
    },
    runtimeErrors: {
      internalError: () => new Error(wordHandler
        .t('aggregator.notifications.errors.process.internalError')),
    },
  },
  successes: {
    forms: {
      rssUpload: () => ({
        message: wordHandler.t('aggregator.notifications.successes.rssUpload'),
      }),
    },
  },
});

const getSchema = (disallowedValues, wordHandler) => yup.object().shape({
  link: yup.string()
    .url(wordHandler.t('aggregator.notifications.errors.validation.url'))
    .notOneOf(
      disallowedValues,
      wordHandler.t('aggregator.notifications.errors.validation.notOneOf'),
    ),
});

const validate = (inputValue, disallowedValues, wordHandler) => {
  const schema = getSchema(disallowedValues, wordHandler);
  return schema.validate(inputValue, { abortEarly: false })
    .then(() => ({}))
    .catch((err) => err);
};

const getAxiosResponse = (url) => axios
  .get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
  .then((response) => response.data)
  .catch((err) => { throw err; });

const getContentsData = (contents, ordinalFeedsID, ordinalPostsID) => {
  const getElTextContent = (el, selectors) => el.querySelector(selectors).textContent;
  const channelTitle = getElTextContent(contents, 'channel title');
  const channelDescription = getElTextContent(contents, 'channel description');
  const feeds = [{ id: ordinalFeedsID + 1, channelTitle, channelDescription }];
  const posts = [...contents.querySelectorAll('item')].map((item, i) => {
    const itemTitle = getElTextContent(item, 'title');
    const itemLink = getElTextContent(item, 'link');
    const itemDescription = getElTextContent(item, 'description');
    const id = ordinalPostsID + i;
    return {
      id, itemTitle, itemLink, itemDescription,
    };
  });
  return { feeds, posts };
};

export default () => {
  const defaultLanguage = 'en';
  const rssRegex = /application\/rss\+xml/;
  const formatValidator = new RegExp(rssRegex);

  const elements = {
    form: document.querySelector('.rss-form'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    input: document.getElementById('form-input'),
    submit: document.querySelector('.rss-submit'),
    notification: document.querySelector('.feedback'),
  };

  const state = {
    lng: defaultLanguage,
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

  const watchedState = onChange(state, initView(elements));

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: state.lng,
    debug: false,
    resources,
  });

  const notifications = getNotifications(i18nInstance);
  elements.input.addEventListener('input', (inputEvent) => {
    Promise.resolve()
      .then(() => inputEvent.preventDefault())
      .then(() => {
        watchedState.form.processState = 'filling';
        watchedState.form.processError = null;
      });
  });

  elements.form.addEventListener('submit', (submitEvent) => {
    Promise.resolve()
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
                const responseData = getContentsData(
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
        watchedState.form.processState = 'error';
        console.log(`Caught Error => ${caughtErr}`);
      });
  });
};
