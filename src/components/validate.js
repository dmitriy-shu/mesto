export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._formElement = formElement;

  };
  //---------------------------метод запуска валидации
  enableValidation() {

    //находим все её импуты
    const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputElements.forEach(inputElement => {
      //добавляем слушатель на событие ввода с клавиатуры  
      inputElement.addEventListener('input', () => this._handleInput(inputElement))
    });
    this._formElement.addEventListener('input', () => this.handleFormInput())

    //отключаем обработку сабмита
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

  };

  //------------------------метод показа ошибок
  _showInputError(inputElement) {
    //находим span в который будем добавлять текст ошибки
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;  //добавляем текст ошибки
    inputElement.classList.add(this._inputErrorClass);   //добавляем красное подчеркивание

  };

  //------------------------метод скрытия ошибок
  _hideInputError(inputElement) {
    //находим span в который будем добавлять текст ошибки
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = ''; //очищаем текст ошибки
    inputElement.classList.remove(this._inputErrorClass);  //удаляем красное подчеркивание
  };

  //--------------------------метод управления текстом и визуализации ошибок 
  _handleInput(inputElement) {
    if (inputElement.checkValidity()) {
      //ввод валиден
      this._hideInputError(inputElement) //скрываем ошибку
    } else {
      //ввод не валиден
      this._showInputError(inputElement) //показываем ошибку
    }
  };

  //--------------------------метод управления кнопкой формы
  handleFormInput() {
    //находим кнопки(сабмит)
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    if (this._formElement.checkValidity()) {
      //форма валидна
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    } else {
      //форма не валидна
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    }
  };

  //метод очистки ошибок и инпутов
  reset() {
    const inputs = this._formElement.querySelectorAll('.popup__input');
    inputs.forEach(input => {
      input.classList.remove('popup__input_type_error');
    });
    const errors = this._formElement.querySelectorAll('.popup__input-error');
    errors.forEach(eror => {
      eror.textContent = '';
    })
  };
}








