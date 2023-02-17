import * as yup from 'yup';

export default (disallowedValues) => {
  yup.setLocale({
    string: { url: 'url' },
    mixed: { required: 'required', notOneOf: 'notOneOf' },
  });
  return yup.object().shape({
    link: yup.string().required().url().notOneOf(disallowedValues),
  });
};
