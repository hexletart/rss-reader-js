/* eslint-disable no-param-reassign */

const setAttribute = (attributes, element) => {
  Object.entries(attributes)
    .forEach(([attr, attrValue]) => {
      switch (attr) {
        case 'classes':
          element.classList.add(...attrValue);
          break;
        case 'data':
          Object.entries(attrValue)
            .forEach(([dataName, dataValue]) => {
              element.dataset[dataName] = dataValue;
            });
          break;
        case 'rels':
          element.setAttribute('rel', attrValue.join(' '));
          break;
        case 'areaHidden':
          element.ariaHidden = attrValue;
          break;
        default: element.setAttribute(attr, attrValue);
      }
    });
  return element;
};

const buildHtml = (tree, parent) => {
  const {
    name, type, attributes, content, children,
  } = tree;
  if (type === 'text') {
    parent.textContent = content;
    return undefined;
  }
  const element = document.createElement(name);
  if (attributes) {
    setAttribute(attributes, element);
  } if (children) {
    children.forEach((child) => buildHtml(child, element));
  } if (!parent) {
    return element;
  }
  parent.appendChild(element);
  return undefined;
};

export default buildHtml;
