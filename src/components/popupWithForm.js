import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupSelector.querySelector('.popup__button');
    this._buttonText = this._submitButton.textContent;
  }
  //метод сбора всех полей формы
  getInputValues() {
    this._inputs = this._popupSelector.querySelectorAll('.popup__input');
    this._dataInputs = {};
    this._inputs.forEach(input => {
      this._dataInputs[input.name] = input.value;
    });

    return this._dataInputs;
  }

  //метод отправки формы
  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this.getInputValues());
    this.close();
  }

  //метод отображения загрузки при отправке данных на сервер
  sendingLoading(isLoading) {
    if (isLoading) {
      this._submitButton.classList.add('popup__button_loading');
      this._submitButton.textContent = 'Сохранение...'
    }
    else if (!isLoading) {
      this._submitButton.classList.remove('popup__button_loading');
      this._submitButton.textContent = this._buttonText;

    }
  }

  //вешаем слушатели
  setEventListeners() {
    super.setEventListeners();
    this._submit = this._handleSubmit.bind(this);
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._submit);
  }

  //метод закрытия формы
  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
  }

}
