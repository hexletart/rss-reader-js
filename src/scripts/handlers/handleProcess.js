/* eslint-disable no-param-reassign */
import handleSendingAnimation from './handleSendingAnimation';

export default (elements, process) => {
  switch (process) {
    case 'filling':
      handleSendingAnimation(elements, false);
      elements.formSubmit.disabled = false;
      elements.input.disabled = false;
      break;
    case 'error':
      handleSendingAnimation(elements, false);
      elements.formSubmit.disabled = true;
      elements.input.disabled = false;
      break;
    case 'sending':
      handleSendingAnimation(elements, true);
      elements.formSubmit.disabled = true;
      elements.input.disabled = true;
      break;
    case 'sent':
      handleSendingAnimation(elements, false);
      elements.formSubmit.disabled = false;
      elements.input.disabled = false;
      elements.form.reset();
      elements.form.focus();
      break;
    default:
      throw new Error(`Unknown process - ${process}`);
  }
};
