export default {
  translation: {
    aggregator: {
      header: 'RSS aggregator',
      description: "Start reading RSS today! It's easy and nice.",
      form: {
        label: 'RSS link',
        submit: 'Add',
      },
      hint: 'Example: https://www.formula1.com/content/fom-website/en/latest/all.xml',
      notifications: {
        successes: {
          rssUpload: 'RSS uploaded successfully',
        },
        errors: {
          validation: {
            empty: 'Must not be empty',
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
      dataSection: {
        feedBlock: {
          header: 'Feeds',
        },
        postBlock: {
          header: 'Posts',
          submit: 'View',
        },
      },
      modalComponent: {
        modalBodyContent: 'Content preview is limited due to invalid format. To view it, please go to the page of the resource.',
        btnRead: 'Read in full',
        btnClose: 'Close',
      },
      languageButton: {
        passive: 'Eng',
        active: 'Choose russian language',
      },
      footerText: 'Created by hexletart',
    },
  },
};
