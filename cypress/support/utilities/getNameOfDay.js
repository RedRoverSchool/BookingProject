const getNameOfDay = ($el) => {
  for (let i = 0; i < 7; i++) {
    const nameOfDay = $el[i].ownerDocument.defaultView
      .getComputedStyle($el[i], "before")
      .getPropertyValue("content");

    return nameOfDay;
  }
};

export default getNameOfDay;
