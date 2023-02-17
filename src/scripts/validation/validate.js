import getSchema from './schema';

export default (inputValue, disallowedValues) => {
  const schema = getSchema(disallowedValues);
  return schema.validate(inputValue, { abortEarly: false })
    .then(() => ({}))
    .catch((err) => err);
};
