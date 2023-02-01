export default (submitLabel, post, togglePlacement = 'bottom') => {
  const {
    id, postTitle, postLink, postDescription,
  } = post;
  return {
    name: 'li',
    type: 'tag',
    attributes: {
      classes: ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0'],
    },
    children: [
      {
        name: 'a',
        type: 'tag',
        attributes: {
          classes: ['fw-bold'],
          href: postLink,
          data: {
            id,
            toggle: 'tooltip',
            placement: togglePlacement,
          },
          title: postDescription,
          target: '_blank',
          rels: ['noopener', 'noreferrer'],
        },
        children: [
          {
            name: '',
            type: 'text',
            content: postTitle,
          },
        ],
      },
      {
        name: 'button',
        type: 'tag',
        attributes: {
          classes: ['btn', 'btn-outline-primary'],
          data: {
            id,
            bsToggle: 'modal',
            bsTarget: '#modal',
          },
        },
        children: [
          {
            name: '',
            type: 'text',
            content: submitLabel,
          },
        ],
      },
    ],
  };
};
