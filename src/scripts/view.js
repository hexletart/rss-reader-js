import handleProcess from './handlers/handleProcess';
import handleBaseView from './handlers/handleBaseView';
import handleVisitedPost from './handlers/handleVisitedPost';
import handleNotification from './handlers/handleNotification';
import { handleFeeds, handlePosts } from './handlers/handleResponseData';

export default (watchedState, elements, wordHandler, path, value) => {
  const regexByVisitedChange = /^form\.response\.posts\.(\d+)$/;
  if (regexByVisitedChange.test(path)) return handleVisitedPost(elements, value);
  switch (path) {
    case 'lng': handleBaseView(elements, wordHandler);
      break;
    case 'form.processState': handleProcess(elements, value);
      break;
    case 'form.response.feeds': handleFeeds(elements, wordHandler, value);
      break;
    case 'form.response.posts': handlePosts(watchedState, elements, wordHandler, value);
      break;
    case 'form.formNotifications': handleNotification(elements, value);
      break;
    default:
      break;
  }
  return undefined;
};
