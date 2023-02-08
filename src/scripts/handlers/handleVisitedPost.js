/* eslint-disable object-curly-newline */
export default (elements, value) => {
  const { postTitle, postDescription, postLink, id } = value;
  const { modalTitle, modalBody, modalButtonRead } = elements;
  const visitedPost = elements.posts.querySelector(`a[data-id="${id}"]`);
  visitedPost.classList.remove('fw-bold');
  visitedPost.classList.add('fw-normal', 'opacity-75');
  modalTitle.textContent = postTitle;
  modalBody.textContent = postDescription;
  modalButtonRead.href = postLink;
};
