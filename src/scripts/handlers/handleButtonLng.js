export default (elements, butStatus, wordHandler) => {
  const { formSwitchLabel: button } = elements;
  button.textContent = '';
  button.classList.remove('transformation-open');
  switch (butStatus) {
    case 'active':
      button.textContent = wordHandler.t('aggregator.languageButton.active');
      button.classList.add('transformation-open');
      break;
    case 'passive':
      button.textContent = wordHandler.t('aggregator.languageButton.passive');
      break;
    default: throw Error(`Unknown status - ${butStatus} in handleButtonLng`);
  }
};
