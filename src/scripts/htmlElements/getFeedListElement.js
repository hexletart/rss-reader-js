export default (feed) => {
  const {
    channelTitle, channelDescription,
  } = feed;
  return {
    name: 'li',
    type: 'tag-nternal',
    attributes: {
      classes: ['list-group-item', 'border-0', 'border-end-0'],
    },
    children: [
      {
        name: 'h3',
        type: 'tag',
        attributes: {
          classes: ['h6', 'm-0'],
        },
        children: [
          {
            name: '',
            type: 'text',
            content: channelTitle,
          },
        ],
      },
      {
        name: 'p',
        type: 'tag',
        attributes: {
          classes: ['m-0', 'small'],
        },
        children: [
          {
            name: '',
            type: 'text',
            content: channelDescription,
          },
        ],
      },
    ],
  };
};
