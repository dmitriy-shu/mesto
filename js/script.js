const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__icon-close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__input-about');

const formElement = document.querySelector('.popup__container');


//------------------------------------  Форма редактирования профиля 

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


//----------------------------------- исходные данные начальных карточек

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

//----------------------------- добавить начальные карточки

function renderCardTemplate(item) {

  const cardTemplate = itemCardTemplate.cloneNode(true);
  cardTemplate.querySelector('.card__title').textContent = item.name;
  cardTemplate.querySelector('.card__image').setAttribute('src', item.link);
  cardTemplate.querySelector('.card__image').setAttribute('alt', item.name);

  // слушатель лайков
  const likeButton = cardTemplate.querySelector('.card__button-like');

  likeButton.addEventListener('click', function (evt) {
    const eventTargetLikeButton = evt.target;
    eventTargetLikeButton.classList.toggle('card__button-like_active');
  });

  // слушатель корзины
  const deletButton = cardTemplate.querySelector('.card__button-delet');

  deletButton.addEventListener('click', function (evt) {
    const eventTargetDeletButton = evt.target;
    const parents = eventTargetDeletButton.closest('.card');
    parents.remove();
  });

  card.append(cardTemplate);
}

function render() {
  initialCards.forEach(renderCardTemplate)
}

render()
//-------------------------------------------------------------------------

//------------------------------  Форма добавления карточек 

// открыть
const popupAdd = document.querySelector('.popup-add');
const AddButton = document.querySelector('.profile__add-button');

function popupAddOpened() {
  popupAdd.classList.add('popup-add_opened');
};

AddButton.addEventListener('click', popupAddOpened);

// закрыть
const closeButtonPopupAdd = document.querySelector('.popup-add__icon-close')

function popupAddClose() {
  popupAdd.classList.remove('popup-add_opened');
};
closeButtonPopupAdd.addEventListener('click', popupAddClose);

// добавить карточку
const inputPlace = document.querySelector('.popup-add__input-place');
const inputLink = document.querySelector('.popup-add__input-link');

function renderCardUser(evt) {
  evt.preventDefault();

  if (inputPlace.value && inputLink.value) {        //не допускаем пустых строк в форме

    const cardUser = itemCardTemplate.cloneNode(true);                           //клонируем шаблон
    cardUser.querySelector('.card__title').textContent = inputPlace.value;            //заполняем шаблон
    cardUser.querySelector('.card__image').setAttribute('src', inputLink.value);      //заполняем шаблон
    cardUser.querySelector('.card__image').setAttribute('alt', inputLink.value);      //заполняем шаблон

    // слушатель лайков
    const likeButton = cardUser.querySelector('.card__button-like');

    likeButton.addEventListener('click', function (evt) {
      const eventTargetLikeButton = evt.target;
      eventTargetLikeButton.classList.toggle('card__button-like_active');
    });

    // слушатель корзины
    const deletButton = cardUser.querySelector('.card__button-delet');

    deletButton.addEventListener('click', function (evt) {
      const eventTargetDeletButton = evt.target;
      const parents = eventTargetDeletButton.closest('.card');
      parents.remove();
    });

    card.prepend(cardUser); // добавляем заполненый  шаблон 

    inputPlace.value = '';  //обнуляем
    inputLink.value = '';   //обнуляем

    popupAddClose();  //закрываем форму
  };









};

const formAdd = document.querySelector('.popup-add__container');

formAdd.addEventListener('submit', renderCardUser);























/* //  Добавляем начальные карточки

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
  cardTemplate.querySelector('.card__image').setAttribute('alt', item.name);
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
    // клонируем карточку из шаблона
    const cardUser = itemCardTemplate.cloneNode(true);
    // передаем значения из "формы добавления карточки" в клонированную карточку
    cardUser.querySelector('.card__title').textContent = addPopupPlace.value;
    cardUser.querySelector('.card__image').setAttribute('src', addPopupLink.value);
    cardUser.querySelector('.card__image').setAttribute('alt', addPopupPlace.value);
    // добавляем карточку
    card.prepend(cardUser);
    addPopup.classList.remove('popup_opened');
    addPopupPlace.value = '';
    addPopupLink.value = '';
    // добавляем слушатель на лайк
    const likeButton = document.querySelector('.card__button-like');
    likeButton.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle('card__button-like_active')
    });

  }
};
addformElement.addEventListener('submit', formSubmitAdd);

// удаление карточек

// выберем кнопку удаления
const deleteButton = document.querySelectorAll('.card__button-delet');
const deletCsrd = document.querySelector('.card');
function remove(ev) {
  console.log(ev.target)
  ev.target.closest('.card').remove();
}
deleteButton.forEach(function (ele) {
  ele.addEventListener('click', remove)
})

console.log(deleteButton) */