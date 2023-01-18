import getSchema from './schema';

export default (inputValue, disallowedValues, wordHandler) => {
  const schema = getSchema(disallowedValues, wordHandler);
  return schema.validate(inputValue, { abortEarly: false })
    .then(() => ({}))
    .catch((err) => err);
};
