import * as yup from 'yup';

export default (disallowedValues, wordHandler) => {
  yup.setLocale({
    string: {
      url: wordHandler.t('aggregator.notifications.errors.validation.url'),
    },
    mixed: {
      required: wordHandler.t('aggregator.notifications.errors.validation.empty'),
      notOneOf: wordHandler.t('aggregator.notifications.errors.validation.notOneOf'),
    },
  });
  return yup.object().shape({
    link: yup.string().required().url().notOneOf(disallowedValues),
  });
};
