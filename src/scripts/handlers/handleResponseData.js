import getFeedListElement from '../htmlElements/getFeedListElement';
import getPostListElement from '../htmlElements/getPostListElement';
import getTreeElement from '../htmlElements/getTreeElement';
import buildHtml from '../buildHtml';

export const renderFeeds = (elements, wordHandler, feeds) => {
  const { feeds: feedContainer, dataSection } = elements;
  if (feedContainer.innerHTML === '') {
    dataSection.classList.add('mt-custom-1rem', 'shadow-section-main');
  }
  const feedHeader = wordHandler.t('aggregator.dataSection.feedBlock.header');
  const feedNodes = feeds.map(getFeedListElement);
  const feedTree = getTreeElement(feedHeader, feedNodes);
  feedContainer.innerHTML = '';
  feedContainer.appendChild(buildHtml(feedTree));
};

export const renderPosts = (elements, wordHandler, posts) => {
  const { posts: postContainer } = elements;
  const postHeader = wordHandler.t('aggregator.dataSection.postBlock.header');
  const postSubmit = wordHandler.t('aggregator.dataSection.postBlock.submit');
  const postNodes = posts.map((post) => getPostListElement(postSubmit, post));
  const postTree = getTreeElement(postHeader, postNodes);
  postContainer.innerHTML = '';
  postContainer.appendChild(buildHtml(postTree));
};
