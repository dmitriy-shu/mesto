//------------------------------------функция проверки валидации формы
function enableValidation(obj) {
  //находим все формы
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  //для каждой формы
  formElements.forEach(formElement => {
    //находим все её импуты
    const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
    //находим кнопки(сабмит)
    const submitButton = formElement.querySelector('.popup__button');

    //для каждого импута
    inputElements.forEach(input => {
      //добавляем слушатель на событие ввода с клавиатуры  
      input.addEventListener('input', evt => handleInput(evt, obj))
    });
    formElement.addEventListener('input', () => handleFormInput(formElement, submitButton, obj.inactiveButtonClass))

    //отключаем обработку сабмита
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  });
};
//---------------------------------функция управления текстом и визуализации ошибок 
function handleInput(evt, obj) {
  const input = evt.target;
  //находим span в который будем добавлять текст ошибки
  const error = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    //ввод валиден
    error.textContent = ''; //очищаем текст ошибки
    input.classList.remove(obj.inputErrorClass);  //удаляем красное подчеркивание
  } else {
    //ввод не валиден
    error.textContent = input.validationMessage;  //добавляем текст ошибки
    input.classList.add(obj.inputErrorClass);   //добавляем красное подчеркивание
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








