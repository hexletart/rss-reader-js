import { uniqueId } from 'lodash';

export default (gotData) => {
  const parser = new DOMParser();
  const contents = parser.parseFromString(gotData, 'application/xml');
  const getElTextContent = (el, selectors) => el.querySelector(selectors).textContent;
  const feedTitle = getElTextContent(contents, 'channel title');
  const feedDescription = getElTextContent(contents, 'channel description');
  const feeds = [{ id: uniqueId(), feedTitle, feedDescription }];
  const posts = [...contents.querySelectorAll('item')].map((post) => {
    const postTitle = getElTextContent(post, 'title');
    const postLink = getElTextContent(post, 'link');
    const postDescription = getElTextContent(post, 'description');
    const id = uniqueId();
    return {
      id, postTitle, postLink, postDescription,
    };
  });
  return { feeds, posts };
};
