/* eslint-disable object-curly-newline */
export default (elements, value) => {
  const visitedPost = elements.posts.querySelector(`a[data-id="${value.id}"]`);
  visitedPost.classList.remove('fw-bold');
  visitedPost.classList.add('fw-normal', 'opacity-75');
};
