export const createElement = (tagName, attributes, text) => {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  if (text) element.appendChild(document.createTextNode(text));
  return element;
};

export const dupCheck = (number) => {
  if ([...new Set(number)].length === number.length) return true;
  return false;
};

export const checkEl = (num, resultValue) => {
  const container = createElement("div", { className: "check-container" });
  const number = createElement("span", { className: "check-number" }, num);
  const result = createElement(
    "span",
    { className: "check-result" },
    resultValue
  );
  container.appendChild(number);
  container.appendChild(result);

  return container;
};
