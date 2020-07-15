import './index.css';

import { Card } from '../components/card.js';
import { FormValidator } from '../components/validate.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/userInfo.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import {
  initialCards,
  obj,
  popupImg,
  profileName,
  profileAbout,
  popup,
  popupAdd,
  editButton,
  addButton,
  popupName,
  popupAbout,
  formElement,
  formAdd,
  cardsContainer,
  popupButton
} from '../utils/constants.js';

//---------------------------------------editPopup------------------------------------

//экземпляр класса управления отображением информации о пользователе на странице
const userInfoProfile = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout
});

//экземпляр класса для попапа профиля
const editPopup = new PopupWithForm(popup, {
  //отправка формы профиля
  handleFormSubmit: (item) => {
    userInfoProfile.setUserInfo(item);
    editPopup.close();
  }
});

//добавляем слушатели форме профиля
editPopup.setEventListeners();

//валидация формы редактирования профиля
const formValidatorEdit = new FormValidator(obj, formElement);

//при нажатие на кнопку редактирования профиля открываем попап профиля и подставляем данные
editButton.addEventListener('click', () => {
  const profile = userInfoProfile.getUserInfo();
  popupName.value = profile.name;
  popupAbout.value = profile.about;
  formValidatorEdit.reset();
  editPopup.open();
  formValidatorEdit.enableValidation();
  formValidatorEdit.handleFormInput(popupButton);

});

//---------------------------------------начальные карточки------------------------------------

//добавляем начальные карточки
const primaryCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({
        initialCards: item,
        handleCardClick: () => {
          popupWithImage.open(item.name, item.link);
        }
      }, '.card-template');
      const cardTemplate = card.generateCard();
      primaryCards.addItem(cardTemplate);
    }
  }, cardsContainer);

primaryCards.renderItems();

//---------------------------------------addPopup------------------------------------

//добавление новой карточки на сайт пользователем
const addPopup = new PopupWithForm(popupAdd, {
  //отправка формы профиля
  handleFormSubmit: (item) => {
    const card = new Card({
      initialCards: item,
      handleCardClick: () => {
        popupWithImage.open(item.name, item.link);
      }
    }, '.card-template');

    const cardElement = card.generateCard();
    primaryCards.addItem(cardElement);
    addPopup.close();
  }
});
//добавлем слушатели на попап карточки
addPopup.setEventListeners();

//валидация формы добавления новой карточки
const formValidatorAdd = new FormValidator(obj, formAdd);

//при нажатие на кнопку добавить  открываем попап добавления места
addButton.addEventListener('click', () => {
  formValidatorAdd.reset();
  formValidatorAdd.enableValidation();
  formValidatorAdd.handleFormInput(popupButton);
  addPopup.open();
})

//---------------------------------------imgPopup------------------------------------

//экземпляр класса для попапа добавления карточки с фото
const popupWithImage = new PopupWithImage(popupImg);

//добавляю слушатели попапу фото
popupWithImage.setEventListeners();






