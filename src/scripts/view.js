import handleProcess from './handlers/handleProcess';
import handleBaseView from './handlers/handleBaseView';
import handleVisitedPost from './handlers/handleVisitedPost';
import handleNotification from './handlers/handleNotification';
import handleButtonLng from './handlers/handleButtonLng';
import handleDataForModal from './handlers/handleDataForModal';
import { handleFeeds, handlePosts } from './handlers/handleResponseData';

export default (watchedState, elements, wordHandler, path, value) => {
  const { formNotifications } = watchedState.form;
  const regexByVisitedChange = /^form\.response\.posts\.(\d+)$/;
  if (regexByVisitedChange.test(path)) {
    handleDataForModal(elements, value, wordHandler);
    handleVisitedPost(elements, value);
  }
  switch (path) {
    case 'lng':
      handleBaseView(elements, wordHandler);
      handleNotification(
        elements,
        (typeof formNotifications === 'function' ? formNotifications.bind(watchedState) : formNotifications),
      );
      break;
    case 'form.processState':
      handleProcess(elements, value);
      break;
    case 'form.response.feeds':
      handleFeeds(elements, wordHandler, value);
      break;
    case 'form.response.posts':
      handlePosts(watchedState, elements, wordHandler, value);
      break;
    case 'form.formNotifications':
      handleNotification(elements, value);
      break;
    case 'form.uiButtonLng':
      handleButtonLng(elements, value, wordHandler);
      break;
    default:
      break;
  }
  return undefined;
};
