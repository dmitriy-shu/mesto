export const initialCards = [
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

export const obj = {
  formSelector: '.popup__form',                     //форма
  inputSelector: '.popup__input',                   //все инпуты
  submitButtonSelector: '.popup__button',           //все кнопки сабмит
  inactiveButtonClass: 'popup__button_disabled',    //стили для неактивной кнопки (серая кнопка)
  inputErrorClass: 'popup__input_type_error',       //стили для инпута во время ошибки
  errorClass: 'popup__error_visible'                // стили для спана во время ошибки
}

export const popup = document.querySelector('.popup');              //popupEdit
export const popupAdd = document.querySelector('.popup_type_add');  //popupAdd
export const popupImg = document.querySelector('.popup_type_img');  //popupImage
export const popupDelete = document.querySelector('.popup_type_delet');  //popupDelet
export const popupAvatar = document.querySelector('.popup_type_edit-avatar');  //popupEditAvatar


export const profileName = document.querySelector('.profile__title');   // имя пользователя в профайле
export const profileAbout = document.querySelector('.profile__subtitle'); // "о себе" пользователя в профайле
export const profileAvatar = document.querySelector('.profile__avatar'); //аватар профиля

export const editButton = document.querySelector('.profile__edit-button');  //кнопка открытия формы редактирования профиля popupEdit
export const addButton = document.querySelector('.profile__add-button');    //кнопка открытия формы добавления новой карточки popupAdd
export const editAvatarButton = document.querySelector('.profile__edit-button-avatar'); //кнопка открытия формы добавления картинки аватара

export const popupName = document.querySelector('.popup__input_type_name');   //поля ввода имени пользователя
export const popupAbout = document.querySelector('.popup__input_type_about');   //поля ввода "о себе"

export const formElement = document.querySelector('.popup__form');        //форма popupEdit
export const formAdd = document.querySelector('.popup__form_type_add');   //форма popupAdd
export const formAvatar = document.querySelector('.popup__form_edit-avatar');   //форма popupAvatar

export const cardsContainer = document.querySelector('.card-grid'); //контейнер для карточек

export const popupButton = document.querySelector('.popup__button');  //кнопка отправить форму
