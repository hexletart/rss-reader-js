/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
// import _ from 'lodash';

const handleProcess = (elements, process) => {
  switch (process) {
    case 'filling':
      elements.submit.disabled = false;
      elements.input.disabled = false;
      break;
    case 'sending':
      elements.submit.disabled = true;
      elements.input.disabled = true;
      break;
    case 'error':
      elements.submit.disabled = false;
      elements.input.disabled = false;
      break;
    case 'sent':
      elements.submit.disabled = false;
      elements.input.disabled = false;
      elements.form.reset();
      elements.form.focus();
      break;
    default:
      throw new Error(`Unknown process - ${process}`);
  }
};

const handleNotification = (elements, notice) => {
  const { notification } = elements;
  notification.textContent = '';
  notification.classList.remove('text-danger', 'text-success');
  const getNoticeColor = (el) => ((el instanceof Error)
    ? 'text-danger' : 'text-success');
  if (!notice.message) return;
  notification.classList.add(getNoticeColor(notice));
  notification.textContent = notice.message;
};

export default (elements) => (path, value) => {
  // if (path === 'formNotifications') console.log(value.notice, '!!!!!!!!');
  switch (path) {
    // case 'form.response': handleResponseData(elements, value);
    //   break;
    case 'form.processError': handleNotification(elements, value.notice);
      break;
    case 'form.processState': handleProcess(elements, value);
      break;
    case 'formNotifications': handleNotification(elements, value.notice);
      break;
    default:
      break;
  }
};
