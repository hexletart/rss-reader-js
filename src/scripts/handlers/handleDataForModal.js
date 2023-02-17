export default (elements, value, wordHandler) => {
  const stylesForInvalid = ['fw-bolder', 'text-center', 'text-custom-warning-pale'];
  const { postTitle, postDescription, postLink } = value;
  const { modalTitle, modalBody, modalButtonRead } = elements;
  const parser = new DOMParser();
  const parsedDescription = parser.parseFromString(postDescription, 'text/html');
  modalTitle.textContent = postTitle;
  modalButtonRead.href = postLink;

  modalBody.classList.remove(...stylesForInvalid);
  const { children } = parsedDescription.body;
  if (children.length > 0) modalBody.classList.add(...stylesForInvalid);

  if (children.length === 0) {
    modalBody.textContent = postDescription;
  } else {
    modalBody.classList.add(...stylesForInvalid);
    modalBody.textContent = wordHandler.t('aggregator.modalComponent.modalBodyContent');
  }
};
