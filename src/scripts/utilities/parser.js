export default (gotData, source) => {
  const parser = new DOMParser();
  const contents = parser.parseFromString(gotData, 'application/xml');
  if (!contents.querySelector('rss')) return null;
  const getElTextContent = (el, selectors) => el.querySelector(selectors).textContent;
  const feedTitle = getElTextContent(contents, 'channel title');
  const feedDescription = getElTextContent(contents, 'channel description');
  const feeds = [{ feedTitle, feedDescription }];
  const posts = [...contents.querySelectorAll('item')].map((post) => {
    const postTitle = getElTextContent(post, 'title');
    const postLink = getElTextContent(post, 'link');
    const postDescription = getElTextContent(post, 'description');
    const visited = false;
    return {
      postTitle, postLink, postDescription, visited, source,
    };
  });
  return { feeds, posts };
};
