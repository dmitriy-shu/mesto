import { Popup } from './popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form_type_delet');
  }

  setHandleSubmit(foo) {
    this._handleSubmit = foo;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    })
    super.setEventListeners();
  }
}