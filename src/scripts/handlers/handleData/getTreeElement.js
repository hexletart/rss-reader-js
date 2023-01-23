export default (header, attachment) => ({
  name: 'div',
  type: 'tag',
  attributes: {
    classes: ['card', 'border-0'],
  },
  children: [
    {
      name: 'div',
      type: 'tag',
      attributes: {
        classes: ['card-body'],
      },
      children: [
        {
          name: 'h2',
          type: 'tag',
          attributes: {
            classes: ['card-title', 'h4'],
          },
          children: [
            {
              name: '',
              type: 'text',
              content: header,
            },
          ],
        },
      ],
    },
    {
      name: 'ul',
      type: 'tag',
      attributes: {
        classes: ['list-group', 'border-0', 'rounded-0'],
      },
      children: attachment,
    },
  ],
});
