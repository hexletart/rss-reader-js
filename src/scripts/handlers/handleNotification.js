import { ValidationError } from 'yup';
import RssValidationError from '../classes/rssValidationError';

export default (elements, notificationData) => {
  if (notificationData === null) return;
  const { notice } = notificationData;
  const { notification, input } = elements;
  notification.textContent = '';
  notification.classList.remove('text-danger', 'text-success');
  input.classList.remove('is-invalid', 'is-valid');
  if (!notice.message) return;
  const isError = notice instanceof Error;
  const currentClass = (isError) ? 'text-danger' : 'text-success';
  notification.classList.add(currentClass);
  notification.textContent = notice.message;
  const shouldBeDisplayed = [ValidationError, RssValidationError];
  if (shouldBeDisplayed.some((err) => notice instanceof err) || !(isError)) {
    const validation = (isError) ? 'is-invalid' : 'is-valid';
    input.classList.add(validation);
  }
};
