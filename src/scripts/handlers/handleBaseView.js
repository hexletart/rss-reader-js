/* eslint-disable no-param-reassign */
const getWordMapByElements = (words) => ({
  formSubmitDescription: words.t('aggregator.form.submit'),
  header: words.t('aggregator.header'),
  description: words.t('aggregator.description'),
  hint: words.t('aggregator.hint'),
  formLabel: words.t('aggregator.form.label'),
  modalButtonRead: words.t('aggregator.modalComponent.btnRead'),
  modalButtonClose: words.t('aggregator.modalComponent.btnClose'),
  formSwitchLabel: words.t('aggregator.languageButton.passive'),
  footerText: words.t('aggregator.footerText'),
});

export default (elements, wordHandler) => {
  const wordMap = getWordMapByElements(wordHandler);
  Object.entries(wordMap)
    .forEach(([key, value]) => {
      elements[key].textContent = '';
      elements[key].textContent = value;
    });
};
