import getFeedListElement from './getFeedListElement';
import getPostListElement from './getPostListElement';
import getTreeElement from './getTreeElement';
import buildHtml from './buildHtml';

export default (elements, wordHandler, responseData) => {
  const { posts: postElement, feeds: feedElement } = elements;
  postElement.textContent = '';
  feedElement.textContent = '';
  const headerPostText = wordHandler.t('aggregator.dataSection.postBlock.header');
  const headerFeedText = wordHandler.t('aggregator.dataSection.feedBlock.header');
  const submitText = wordHandler.t('aggregator.dataSection.postBlock.submit');
  const { posts, feeds } = responseData;
  const postNodes = posts.map((post) => getPostListElement(submitText, post));
  const feedNodes = feeds.map(getFeedListElement);
  const postTree = getTreeElement(headerPostText, postNodes);
  const feedTree = getTreeElement(headerFeedText, feedNodes);
  postElement.appendChild(buildHtml(postTree));
  feedElement.appendChild(buildHtml(feedTree));
};
