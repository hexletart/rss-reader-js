export default {
  translation: {
    aggregator: {
      header: 'RSS aggregator',
      description: "Start reading RSS today! It's easy and nice.",
      form: {
        label: 'RSS link',
        submit: 'Add',
      },
      hint: 'Example: https://ru.hexlet.io/lessons.rss',
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
