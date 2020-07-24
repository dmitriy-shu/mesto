import './index.css';

import { Card } from '../components/card.js';
import { PopupWithDelete } from '../components/popupWithDelete.js';
import { FormValidator } from '../components/validate.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/userInfo.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { Api } from '../components/Api.js';
import {
  initialCards,
  obj,
  popupImg,
  profileName,
  profileAbout,
  profileAvatar,
  popup,
  popupAdd,
  popupDelete,
  popupAvatar,
  editButton,
  addButton,
  editAvatarButton,
  popupName,
  popupAbout,
  formElement,
  formAdd,
  formAvatar,
  cardsContainer,
  popupButton
} from '../utils/constants.js';

//экземпляр класса Api
export const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '142ee563-ae5b-48cb-a3a6-cd51382bcffa',
    'Content-Type': 'application/json'
  }
});

//---------------------------------------editPopup------------------------------------

//экземпляр класса управления отображением информации о пользователе на странице
const userInfoProfile = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout,
  profileAvatar: profileAvatar
});

//экземпляр класса для попапа профиля
const editPopup = new PopupWithForm(popup, {
  //отправка формы профиля
  handleFormSubmit: () => {
    editPopup.sendingLoading(true);
    const inputValues = editPopup.getInputValues();
    api.sendUserInfo(inputValues)
      .then((data) => {
        userInfoProfile.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editPopup.sendingLoading(false);
        editPopup.close();
      })
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

/* //---------------------------------------начальные карточки------------------------------------

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
 */
//---------------------------------------addPopup------------------------------------

/* //добавление новой карточки на сайт пользователем
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
}) */

//---------------------------------------imgPopup------------------------------------

//экземпляр класса для попапа добавления карточки с фото
const popupWithImage = new PopupWithImage(popupImg);

//добавляю слушатели попапу фото
popupWithImage.setEventListeners();

//---------------------------------------deletePopup------------------------------------

//экземпляр класса попапа удаления карточки
const popupWithDelete = new PopupWithDelete(popupDelete);

//добавляю слушатель на попап удаления карточки
popupWithDelete.setEventListeners();

//------------------------------------avatarPopup-------------------------------------------

//отправка нового аватара на сервер
const popupEditAvatar = new PopupWithForm(popupAvatar, {
  handleFormSubmit: () => {
    popupEditAvatar.sendingLoading(true);
    const inputValues = popupEditAvatar.getInputValues();
    api.sendUserAvatar(inputValues)
      .then((data) => {
        console.log(data)
        userInfoProfile.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.sendingLoading(false);
        popupEditAvatar.close();
      })
  }
})

//добавляем слушатель на попап аватара
popupEditAvatar.setEventListeners();

//валидация формы редактирования картинки аватара
const formValidatorEditAvatar = new FormValidator(obj, formAvatar);

//при нажатие на кнопку редактирования картинки аватара открываем попап редактирования аватара
editAvatarButton.addEventListener('click', () => {
  formValidatorEditAvatar.reset();
  formValidatorEditAvatar.enableValidation();
  formValidatorEditAvatar.handleFormInput(popupButton);
  popupEditAvatar.open();
});
//-------------------------------------------------------------------------------------------



//получаем данные пользователя и карточек с сервера
Promise.all([api.getUserInfo(), api.getCards()])
  .then((data) => {
    //передаём данные в класс UserInfo
    userInfoProfile.setUserInfo(data[0]); console.log(data[1])

    //id пользователя
    const userId = data[0]._id;

    //загружаю карточки на сайт с сервера
    const primaryCards = new Section(data[1], {
      renderer: (data) => {
        const card = new Card(data, userId, {
          cardTemplate: '.card-template',
          handleCardClick: () => {
            popupWithImage.open(data);
          },
          deleteCards: () => {
            popupWithDelete.open();
            popupWithDelete.setHandleSubmit(() => {
              api.deleteCard(data._id)
                .then(() => {
                  card.deletCard();
                })
                .catch((err) => {
                  console.log(err)
                })
            })
          },
          handleLike: () => {
            api.addLike(data._id)
              .then((data) => {
                card.likeCounterCard(data.likes);
                card.toggleLike();
              })
              .catch((err) => {
                console.log(err);
              })
          },
          handleDeleteLike: () => {
            api.deleteLike(data._id)
              .then((data) => {
                card.likeCounterCard(data.likes);
                card.toggleLike();
              })
              .catch((err) => {
                console.log(err);
              })
          }
        });
        const cardElement = card.generateCard(data);
        primaryCards.addItem(cardElement);
      }
    }, cardsContainer);

    //отрисовываю карточки
    primaryCards.renderItems()


    //добавление и отправка на сервер новой карточки пользователем
    const addPopup = new PopupWithForm(popupAdd, {
      handleFormSubmit: () => {
        addPopup.sendingLoading(true);
        const inputValues = addPopup.getInputValues();
        api.addCard(inputValues)
          .then((data) => {
            const card = new Card(data, userId, {
              cardTemplate: '.card-template',
              handleCardClick: () => {
                popupWithImage.open(data);
              },
              deleteCards: () => {
                popupWithDelete.open();
                popupWithDelete.setHandleSubmit(() => {
                  api.deleteCard(data._id)
                    .then(() => {
                      card.deletCard();
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                })
              },
              handleLike: () => {
                api.addLike(data._id)
                  .then((data) => {
                    card.likeCounterCard(data.likes);
                    card.toggleLike();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              },
              handleDeleteLike: () => {
                api.deleteLike(data._id)
                  .then((data) => {
                    card.likeCounterCard(data.likes);
                    card.toggleLike();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            });
            const cardElement = card.generateCard(data);
            primaryCards.addItem(cardElement);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            addPopup.sendingLoading(false);
            addPopup.close();
          })
      }
    })

    //добавляю слушатели на попап карточки
    addPopup.setEventListeners();

    //открываем попап добавления карточки
    const openaddPopup = () => {
      addPopup.open();
    }

    //валидация формы добавления новой карточки
    const formValidatorAdd = new FormValidator(obj, formAdd);

    /* //слушатель открытия попапа карточки
    addButton.addEventListener("click", () => { openaddPopup(); discartingFieldsPopup(); formCardPopup.toggleButtonState(inputListCard, popupButtonSaveCard); formCardPopup.hideInputError(popupCard, popupCardTitle); formCardPopup.hideInputError(popupCard, popupCardLink) }); */
    //при нажатие на кнопку добавить  открываем попап добавления места
    addButton.addEventListener('click', () => {
      formValidatorAdd.reset();
      formValidatorAdd.enableValidation();
      formValidatorAdd.handleFormInput(popupButton);
      addPopup.open();
    })
  })
  .catch((err) => {
    console.log(err)
  });




/* //экземпляр класса для попапа профиля
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


 */




