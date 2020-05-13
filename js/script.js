const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__input-about');

// при нажатии на кнопку edit открываем окно popup и подставляем в его формы значения из элемента profile
function popupOpened() {
  popup.classList.add('popup_opened');                          // добавляем элементу с классом "popup" класс 'popup_opened'
  popupName.setAttribute('value', profileName.textContent);     // задаем элементу с классом 'popup__input-name' атрибут и значение атрибута,(значение атрибута это текст - получаем из элемента с классом 'profile__title')
  popupAbout.setAttribute('value', profileAbout.textContent);
};
editButton.addEventListener('click', popupOpened);              //вешаем слушатель на элемент с классом "profile__edit-button", он сработает при событие 'click' и function popupOpened()


// при нажатие на крестик, закрываем окно popup
function popupClose() {
  popup.classList.remove('popup_opened');
};
closeButton.addEventListener('click', popupClose);


// при нажатие на кнопку "сохранить" значения из полей input записываются в соответствующие поля элемента profile и окно закрывается
let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let nameInputValue = popupName.value;         // сюда кладем значение  формы('popup') из строчки name ('popup__input-name')
  let aboutImputValue = popupAbout.value;

  profileName.textContent = nameInputValue;     // присваиваем значение name полученное из формы в элемент profile 'profile__title' 
  profileAbout.textContent = aboutImputValue;

  popup.classList.remove('popup_opened');       // закрываем форму


};

formElement.addEventListener('submit', formSubmitHandler);    // при нажатие на кнопку "сохранить" произойдет событие 'submit' и запустится function formSubmitHandler()


