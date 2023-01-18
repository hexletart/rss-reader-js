export default (wordHandler) => ({
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
