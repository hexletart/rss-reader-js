export default (elements, butStatus, wordHandler) => {
  const { formSwitchLabel: button } = elements;
  button.textContent = '';
  button.classList.remove('transition-close', 'transition-open');
  switch (butStatus) {
    case 'active':
      button.textContent = wordHandler.t('aggregator.languageButton.active');
      button.classList.add('transition-open');
      break;
    case 'passive':
      button.textContent = wordHandler.t('aggregator.languageButton.passive');
      button.classList.add('transition-close');
      break;
    default: throw Error(`Unknown status - ${butStatus} in handleButtonLng`);
  }
};
