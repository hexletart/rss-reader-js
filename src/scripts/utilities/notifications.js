import _ from 'lodash';

const wordHandlerMap = [
  { noticeName: 'axiosError', path: 'aggregator.notifications.errors.process.axiosError', noticeType: 'networkError' },
  { noticeName: 'internalError', path: 'aggregator.notifications.errors.process.internalError', noticeType: 'error' },
  { noticeName: 'rssUpload', path: 'aggregator.notifications.successes.rssUpload', noticeType: 'success' },
  { noticeName: 'url', path: 'aggregator.notifications.errors.validation.url', noticeType: 'validationError' },
  { noticeName: 'required', path: 'aggregator.notifications.errors.validation.empty', noticeType: 'validationError' },
  { noticeName: 'notOneOf', path: 'aggregator.notifications.errors.validation.notOneOf', noticeType: 'validationError' },
  { noticeName: 'notValidRss', path: 'aggregator.notifications.errors.process.notValidRss', noticeType: 'validationError' },
];

export default (wordHandler) => (property) => () => {
  const propertySource = _.find(wordHandlerMap, property);
  const { noticeType, path } = propertySource;
  return { noticeType, text: wordHandler.t(path) };
};
