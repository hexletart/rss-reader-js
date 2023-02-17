import _ from 'lodash';

export default (elements, notificationData) => {
  const { notification, input } = elements;
  notification.textContent = '';
  notification.classList.remove('text-danger', 'text-success');
  input.classList.remove('is-invalid', 'is-valid');
  if (_.isEqual(notificationData, {})) return;
  const { text, noticeType } = notificationData();
  const currentClass = (noticeType === 'success') ? 'text-success' : 'text-danger';
  notification.classList.add(currentClass);
  notification.textContent = text;
  if (noticeType === 'validationError') {
    input.classList.add('is-invalid');
  } else if (noticeType === 'success') {
    input.classList.add('is-valid');
  }
};
