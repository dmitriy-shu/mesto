//------------------------------------функция проверки валидации формы
function enableValidation(obj) {
  //находим все формы
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  //для каждой формы
  formElements.forEach(formElement => {
    //находим все её импуты
    const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
    //находим кнопки(сабмит)
    const submitButton = formElement.querySelector(obj.submitButtonSelector);

    //для каждого импута
    inputElements.forEach(inputElement => {
      //добавляем слушатель на событие ввода с клавиатуры  
      inputElement.addEventListener('input', () => handleInput(inputElement, obj))
    });
    formElement.addEventListener('input', () => handleFormInput(formElement, submitButton, obj.inactiveButtonClass))

    //отключаем обработку сабмита
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  });
};
//------------------------функция показа ошибок
function showInputError(inputElement, obj) {
  //находим span в который будем добавлять текст ошибки
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = ''; //очищаем текст ошибки
  inputElement.classList.remove(obj.inputErrorClass);  //удаляем красное подчеркивание
};
//------------------------функция скрытия ошибок
function hideInputError(inputElement, obj) {
  //находим span в который будем добавлять текст ошибки
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;  //добавляем текст ошибки
  inputElement.classList.add(obj.inputErrorClass);   //добавляем красное подчеркивание
};
//---------------------------------функция управления текстом и визуализации ошибок 
function handleInput(inputElement, obj) {
  if (inputElement.checkValidity()) {
    //ввод валиден
    showInputError(inputElement, obj) //показываем ошибку
  } else {
    //ввод не валиден
    hideInputError(inputElement, obj) //скрываем ошибку
  }
};
//----------------------------функция управления кнопкой формы
function handleFormInput(formElement, submitButton, inactiveButtonClass) {
  if (formElement.checkValidity()) {
    //форма валидна
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  } else {
    //форма не валидна
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  }

};


const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
enableValidation(obj);








