const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__input-about');

const formElement = document.querySelector('.popup__container');


//  Форма редактирования профиля 

// открыть
function popupOpened() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
};
editButton.addEventListener('click', popupOpened);

// закрыть
function popupClose() {
  popup.classList.remove('popup_opened');
};
closeButton.addEventListener('click', popupClose);


// редактировать профиль
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  popup.classList.remove('popup_opened');
};
formElement.addEventListener('submit', formSubmitHandler);


//  Добавляем начальные карточки

const card = document.querySelector('.card-grid');
const itemCardTemplate = document.querySelector('.card-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// добавить начальные каррточки
function renderCardTemplate(item) {

  const cardTemplate = itemCardTemplate.cloneNode(true);
  cardTemplate.querySelector('.card__title').textContent = item.name;
  cardTemplate.querySelector('.card__image').setAttribute('src', item.link);
  cardTemplate.querySelector('.card__image').setAttribute('alt', item.name)
  card.append(cardTemplate);
}

function render() {
  initialCards.forEach(renderCardTemplate)
}

render()

//  Форма добавления карточки

const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('.popup-add__icon-close');
const addPopup = document.querySelector('.popup-add');
const addPopupPlace = document.querySelector('.popup-add__input-place');
const addPopupLink = document.querySelector('.popup-add__input-link')

// открыть
function addPopupOpened() {
  addPopup.classList.add('popup_opened');
}
addButton.addEventListener('click', addPopupOpened);

// закрыть
function addPopupClose() {
  addPopup.classList.remove('popup_opened');
}
addCloseButton.addEventListener('click', addPopupClose);


// добавить карточку
const addformElement = document.querySelector('.popup-add__container');
function formSubmitAdd(evt) {
  evt.preventDefault();
  if (addPopupPlace.value && addPopupLink.value) {
    console.log(addPopupPlace.value, addPopupLink.value);
    const cardUser = itemCardTemplate.cloneNode(true);
    cardUser.querySelector('.card__title').textContent = addPopupPlace.value;
    cardUser.querySelector('.card__image').setAttribute('src', addPopupLink.value);
    cardUser.querySelector('.card__image').setAttribute('alt', addPopupPlace.value);
    card.prepend(cardUser);
    addPopup.classList.remove('popup_opened');
    addPopupPlace.value = '';
    addPopupLink.value = '';
  }


};
addformElement.addEventListener('submit', formSubmitAdd);

