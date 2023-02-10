import _ from 'lodash';

export default (responseData) => {
  // console.log('\n', 'RESPONSE ====> ', responseData, '\n');
  // console.log('\n', 'RESPONSE STATUS ====> ', responseData.status, '\n');
  // console.log('\n', 'RESPONSE CONTENTS ====> ', responseData.contents, '\n');

  const { content_type: contentType, http_code: httpCode } = responseData.status;
  const rssRegex = /application\/rss\+xml/;
  const formatValidator = new RegExp(rssRegex);
  return _.inRange(httpCode, 200, 300) && (contentType && formatValidator.test(contentType));
};
