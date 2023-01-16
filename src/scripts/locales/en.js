export default {
  translation: {
    aggregator: {
      headerName: 'RSS aggregator',
      description: "Start reading RSS today! It's easy and nice.",
      form: {
        inputLabel: 'RSS link',
        submitLabel: 'Add',
      },
      fieldHint: 'Example: https://ru.hexlet.io/lessons.rss',
      notifications: {
        successes: {
          rssUpload: 'RSS uploaded successfully',
        },
        errors: {
          validation: {
            notOneOf: 'RSS already exists',
            url: 'Link must be a valid URL',
          },
          process: {
            notValidRss: 'The resource does not contain valid RSS',
            axiosError: 'Network error',
            internalError: 'Internal error',
          },
        },
      },
    },
  },
};
