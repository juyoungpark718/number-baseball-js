export const createElement = (tagName, attributes, text) => {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  if (text) element.appendChild(document.createTextNode(text));
  return element;
};
