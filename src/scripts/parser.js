export default (contents, ordinalFeedsID, ordinalPostsID) => {
  const getElTextContent = (el, selectors) => el.querySelector(selectors).textContent;
  const channelTitle = getElTextContent(contents, 'channel title');
  const channelDescription = getElTextContent(contents, 'channel description');
  const feeds = [{ id: ordinalFeedsID + 1, channelTitle, channelDescription }];
  const posts = [...contents.querySelectorAll('item')].map((item, i) => {
    const itemTitle = getElTextContent(item, 'title');
    const itemLink = getElTextContent(item, 'link');
    const itemDescription = getElTextContent(item, 'description');
    const id = ordinalPostsID + i;
    return {
      id, itemTitle, itemLink, itemDescription,
    };
  });
  return { feeds, posts };
};
