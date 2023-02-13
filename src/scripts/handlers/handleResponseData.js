/* eslint-disable no-param-reassign */
import _ from 'lodash';
import getFeedListElement from '../htmlElements/feedListElement';
import getPostListElement from '../htmlElements/postListElement';
import getTreeElement from '../htmlElements/treeElement';
import buildHtml from '../utilities/htmlBuilder';

export const handleFeeds = (elements, wordHandler, feeds) => {
  const { feeds: feedContainer, dataSection } = elements;
  if (feedContainer.innerHTML === '') {
    dataSection.classList.add('mt-1em', 'mb-3em', 'p-5', 'shadow-dark-blue');
  }
  const feedHeader = wordHandler.t('aggregator.dataSection.feedBlock.header');
  const feedNodes = feeds.map(getFeedListElement);
  const feedTree = getTreeElement(feedHeader, feedNodes);
  feedContainer.innerHTML = '';
  feedContainer.appendChild(buildHtml(feedTree));
};

export const handlePosts = (watchedState, elements, wordHandler, posts) => {
  const { posts: postContainer } = elements;
  const postHeader = wordHandler.t('aggregator.dataSection.postBlock.header');
  const postSubmit = wordHandler.t('aggregator.dataSection.postBlock.submit');
  const postNodes = posts.map((post) => getPostListElement(postSubmit, post));
  const postTree = getTreeElement(postHeader, postNodes);
  const renderedPosts = buildHtml(postTree);
  renderedPosts.querySelectorAll('.list-group-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      const elementIndexById = _.findIndex(watchedState.form.response.posts, { id });
      watchedState.form.response.posts[elementIndexById] = {
        ...watchedState.form.response.posts[elementIndexById],
        visited: true,
      };
    });
  });
  postContainer.innerHTML = '';
  postContainer.appendChild(renderedPosts);
};
