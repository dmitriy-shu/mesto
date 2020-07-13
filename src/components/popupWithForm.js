import { Popup } from './popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  //метод сбора всех полей формы
  _getInputValues() {
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
    this._handleFormSubmit(this._getInputValues());
    this.close();
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
