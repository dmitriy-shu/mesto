export class Section {
  constructor(data, { renderer }, containerSelector) {
    this._renderedItems = data;
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