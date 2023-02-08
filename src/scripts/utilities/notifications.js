import DataGettingError from '../classes/dataGettingError';
import RssValidationError from '../classes/rssValidationError';

export default (wordHandler) => ({
  errors: {
    networkErrors: {
      notValidRss: () => new RssValidationError(wordHandler
        .t('aggregator.notifications.errors.process.notValidRss')),
      axiosError: () => new DataGettingError(wordHandler
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
