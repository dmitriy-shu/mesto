
function enableValidation(obj) {
  //находим все формы
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));
  //console.log(formElements);
  //для каждой формы
  formElements.forEach(formElement => {
    //находим все её импуты
    const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
    //console.log(inputElements);
    //находим кнопки(сабмит)
    const submitButton = formElement.querySelector('.popup__button');
    //console.log(submitButton);

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
  //console.log(input.checkValidity());
  //находим span в который будем добавлять текст ошибки
  const error = document.querySelector(`#${input.id}-error`);
  //console.log(error);
  if (input.checkValidity()) {
    //ввод валиден
    error.textContent = ''; //очищаем текст ошибки
    input.classList.remove(obj.inputErrorClass);  //удаляем красное подчеркивание
  } else {
    //ввод не валиден
    //console.log(input.validationMessage);
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








/* по тренажеру
//--------------------------------------------------------------------------------------------------------------
//const formElement = document.querySelector('.popup__container');
//const formInput = formElement.querySelector('.popup__input-name');
//const formError = formElement.querySelector(`#${formInput.id}-error`);


//функция добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  //console.log(formElement)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${inputElement.id}_type_error`); //красное подчеркивание
  errorElement.textContent = errorMessage; // добавляем текст ошибки
  //errorElement.classList.add(`${inputElement.id}-error`);  // подпись с ошибкой
};

//функция удаления класса с ошибкой
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${inputElement.id}_type_error`);
  //errorElement.classList.remove(`${inputElement.id}-error`);
  errorElement.textContent = '';
};

//функция проверки валидности поля ввода
function isValid(formElement, inputElement) {
  //console.log(formElement)
  // console.log(inputElement)
  //console.log(inputElement.validity.valid)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция добавления слушателей всем инпутам
function setEventListeners(formElement) {
  //console.log(formElement)
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.button');
  //console.log(buttonElement)

  //console.log(inputList)
  inputList.forEach((inputElement) => {
    //console.log(inputElement)

    inputElement.addEventListener('input', () => {

      //console.log(formElement)
      //console.log(inputElement)
      isValid(formElement, inputElement)

      toggleButtonState(inputList, buttonElement);

      console.log(hasInvalidInput(inputList))
    });
  });
};

//функция добавления слушателей всем формам
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  console.log(formList);
  formList.forEach((formElement) => {
    //console.log(formElement);
    formElement.addEventListener('submit', (evt) => {

      evt.preventDefault();
    });
    //console.log(formElement);
    setEventListeners(formElement);
  });
};

enableValidation();

// Функция проверки валидации всех полей
//если хотя бы одно поле не валидно, функция вернет trye
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//функция отключения/включения кнопки
function toggleButtonState(inputList, buttonElement) {
  //console.log(inputList)
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.removeAttribute('disabled');
  }
};


//------------------------------------------------------------------------------------------------------------------- */



/* const formInput = formElement.querySelector('.popup__input-name');
const formError = formElement.querySelector(`#${formInput.id}-error`);


//функция добавления класса с ошибкой
function showInputError(element, errorMessage) {
  element.classList.add('popup__input-name_type_error'); //красное подчеркивание
  formError.textContent = errorMessage; // добавляем текст ошибки
  formError.classList.add('popup__input-name-error');  // подпись с ошибкой

};

//функция удаления класса с ошибкой
function hideInputError(element) {
  element.classList.remove('popup__input-name_type_error');
  formError.classList.remove('popup__input-name-error');
};

//функция проверки валидности поля ввода
function isValid() {
  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);

//console.log(formInput.validity.valid) */

/* // Вызовем функцию isValid на каждый ввод символа
popupName.addEventListener('input', () => {
  isValid(formElement, popupName)

}
);
// Вызовем функцию isValid на каждый ввод символа
popupAbout.addEventListener('input', () => {
  isValid(formElement, popupAbout)

}
); */