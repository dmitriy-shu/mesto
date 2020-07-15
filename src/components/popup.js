export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  //метод закрытия попап кнопкой Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //метод закрытия попап при клике на оверлай
  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  //метод открытия попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose);  //слушатель на закрытие формы кликом на оверлей
    document.addEventListener('keydown', this._handleEscClose);     //слушатель на закрытие формы при нажатие esc
  }

  //метод закрытия попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose);  //удаляем слушатель
    document.removeEventListener('keydown', this._handleEscClose);     //удаляем слушатель
  }

  //метод добавления слушателя на кнопку закрыть
  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__icon-close')
    closeButton.addEventListener('click', () => {
      this.close()
    });
  }
}