import { Card } from './card.js';
import { FormValidator } from './validate.js';

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__icon-close_type_edit');
const popupName = document.querySelector('.popup__input_type_name');
const popupAbout = document.querySelector('.popup__input_type_about');
const popupAdd = document.querySelector('.popup_type_add');
const closeButtonPopupAdd = document.querySelector('.popup__icon-close_type_add')
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const popupImg = document.querySelector('.popup_type_img');
const popupImgImage = document.querySelector('.popup__image');
const popupImgTitle = document.querySelector('.popup__title-image');
const closeButtonPopupImg = document.querySelector('.popup__icon-close_type_img');
const formElement = document.querySelector('.popup__form');
const cardsContainer = document.querySelector('.card-grid');
const itemCardTemplate = document.querySelector('.card-template').content;
const formAdd = document.querySelector('.popup__form_type_add');
const popupButton = document.querySelector('.popup__button');
const popupButtonAdd = document.querySelector('.popup__button_type_add')

//----------------------------------- исходные данные начальных карточек
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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
//-------------------------функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  reset(popup);
  //снимаем слушатели на owerlay и esc
  popup.removeEventListener('mousedown', toClosePopupByClickOwerlay);
  document.removeEventListener('keydown', toClosePopupByClickEsc);
};
//-------------------------функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //слушатель на закрытие формы кликом на оверлей
  popup.addEventListener('mousedown', toClosePopupByClickOwerlay);
  //слушатель на закрытие формы при нажатие esc
  document.addEventListener('keydown', toClosePopupByClickEsc);
};

//функция закрытия попап при клике на оверлае
function toClosePopupByClickOwerlay(evt) {
  const popup = evt.target;
  if (evt.target.classList.contains('popup')) {      //проверка клика на оверлее
    closePopup(popup);  //функция закрытия 
  }
};
//функция закрытия попап при клике на esc
function toClosePopupByClickEsc(evt) {
  if (evt.key === 'Escape') {                         //проверка на эскейп
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
};
//функция очистки ошибок и инпутов
function reset(popup) {
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('popup__input_type_error');
  });
  const errors = popup.querySelectorAll('.popup__input-error');
  errors.forEach(eror => {
    eror.textContent = '';
  })
};

//------------------------------------  Форма редактирования профиля -------------------------

// открыть
function openEditPopup(popup, formElement, popupButton) {
  openPopup(popup);

  const formValidator = new FormValidator(obj, formElement);    //создаем экземпляр класса FormValidator
  formValidator.enableValidation();                              //вызываем метод enableValidation() - включит валидацию
  formValidator.handleFormInput(popupButton);                    //вызываем метод управления кнопкой (при открытие формы сразу проверяется валидность инпутов => управление кнопкой)

  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
};

editButton.addEventListener('click', () => {
  openEditPopup(popup, formElement, popupButton, obj.inactiveButtonClass)
});

// закрыть
closeButton.addEventListener('click', () => {
  closePopup(popup)
});

// редактировать профиль
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popup)
};
formElement.addEventListener('submit', formSubmitHandler);
//--------------------------------------------------------------------------------------

//------------------------------функция добавления карточки на страницу (рендер карточки)------------
function renderCard(cardTemplate, cardsContainer) {
  cardsContainer.prepend(cardTemplate);
}
//---------------------------------------------------------------------------------------


//----------------------------- добавить начальные карточки--------------------------------------------------------
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '.card-template');
  const cardTemplate = card.generateCard();
  renderCard(cardTemplate, cardsContainer);
})
//-----------------------------------------------------------------------------------------

//------------------------------  Форма добавления карточек -----------------------------------------------------------

// открыть
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  const formValidator = new FormValidator(obj, formAdd); //создаем экземпляр класса FormValidator
  formValidator.enableValidation();                       //вызываем метод enableValidation() - включит валидацию
  formValidator.handleFormInput();                        //вызываем метод управления кнопкой (при открытие формы сразу проверяется валидность инпутов => управление кнопкой)
});

// закрыть
closeButtonPopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

//добавить карточку через форму
function renderCardUser(evt) {              // функция добавления карточки через форму
  evt.preventDefault();

  const card = new Card(inputPlace.value, inputLink.value, '.card-template');
  const cardTemplate = card.generateCard()                                //метод создания карточки
  renderCard(cardTemplate, cardsContainer);                           //функция добавляет карточку на страницу


  closePopup(popupAdd);  //закрываем форму

};

formAdd.addEventListener('submit', renderCardUser);     // слушатель формы добавления карточек
//---------------------------------------------------------------------------------------------------------------------

//-------------------------------popup с картинкой-----------------------------------------------------------------------

//открытие
export function openImagePopup(imageInfo) {                     //функция открытия popup

  const link = imageInfo.getAttribute('src');                     //получаем ссылку кликнутой картинки
  popupImgImage.setAttribute('src', link);                    //передаем ссылку в popup с картинкой

  const name = imageInfo.getAttribute('name');                 //получаем текст с атрибута alt
  popupImgTitle.textContent = name;                         //присваиваем title popup с картинкой текст с атрибута alt

  openPopup(popupImg);                                        //открываем
}

//закрытие
closeButtonPopupImg.addEventListener('click', () => {       // вешаем слушатель на клик кнопки закрытия popup с картинкой
  closePopup(popupImg)
});








