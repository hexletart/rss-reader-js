import getFeedListElement from '../htmlElements/getFeedListElement';
import getPostListElement from '../htmlElements/getPostListElement';
import getTreeElement from '../htmlElements/getTreeElement';
import buildHtml from '../buildHtml';

export default (elements, wordHandler, responseData) => {
  const { posts: postElement, feeds: feedElement, dataSection } = elements;
  dataSection.classList.add('mt-custom-1rem', 'shadow-section-main');
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
