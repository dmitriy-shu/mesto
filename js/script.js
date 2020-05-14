const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__input-about');

let name;
let about;



function popupOpened() {
  popup.classList.add('popup_opened');
  name = profileName.textContent;
  about = profileAbout.textContent;
  popupName.setAttribute('value', name);
  popupAbout.setAttribute('value', about);
};
editButton.addEventListener('click', popupOpened);

function popupClose() {
  popup.classList.remove('popup_opened');
};
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();

  name = popupName.value;
  about = popupAbout.value;
  profileName.textContent = name;
  profileAbout.textContent = about;

  popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler);


