export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;

  }

  //метод создания элемента(карточки) из массива
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item)
    })
  }

  //метод дабавления элемента на страницу
  addItem(element) {
    this._container.prepend(element)
  }

}