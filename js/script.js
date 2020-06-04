const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__icon-close');
const popupName = document.querySelector('.popup__input-name');
const popupAbout = document.querySelector('.popup__input-about');
const popupAdd = document.querySelector('.popup-add');
const closeButtonPopupAdd = document.querySelector('.popup-add__icon-close')
const inputPlace = document.querySelector('.popup-add__input-place');
const inputLink = document.querySelector('.popup-add__input-link');
const popupImg = document.querySelector('.popup-img');
const popupImgImage = document.querySelector('.popup-img__image');
const popupImgTitle = document.querySelector('.popup-img__title');
const closeButtonPopupImg = document.querySelector('.popup-img__icon-close');
const formElement = document.querySelector('.popup__container');
const cardsContainer = document.querySelector('.card-grid');
const itemCardTemplate = document.querySelector('.card-template').content;
const formAdd = document.querySelector('.popup-add__container');

//----------------------------------- исходные данные начальных карточек

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
  popupClose();
};
formElement.addEventListener('submit', formSubmitHandler);
//--------------------------------------------------------------------------------------

//------------------------------функция добавления карточки на страницу (рендер карточки)
function renderCard(cardTemplate, cardsContainer) {
  cardsContainer.prepend(cardTemplate);
}
//---------------------------------------------------------------------------------------

//----------------------------- функция создания карточки со слушателями
function getCard(name, link) {
  const cardTemplate = itemCardTemplate.cloneNode(true);
  cardTemplate.querySelector('.card__title').textContent = name;
  cardTemplate.querySelector('.card__image').setAttribute('src', link);
  cardTemplate.querySelector('.card__image').setAttribute('alt', 'Фотография ' + name);

  addTemplateEvent(cardTemplate); // вызываем функцию добавления слушателей лайк, удалить, фото

  return cardTemplate;

}
//--------------------------------------------------------------------------------------------

//--------------------------------функция добавления слушателей в карточку
function addTemplateEvent(cardTemplate) {
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

  // слушатель фотографии
  cardTemplate.querySelector('.card__image').addEventListener('click', function (evt) {
    const imageInfo = evt.target;
    popupImgOpened(imageInfo);
  });
};
//-------------------------------------------------------------------------------------------

//----------------------------- добавить начальные карточки
function renderCardTemplate(item) {
  const name = item.name;
  const link = item.link;

  const cardTemplate = getCard(name, link);
  renderCard(cardTemplate, cardsContainer);
};

initialCards.forEach(renderCardTemplate)
//-----------------------------------------------------------------------------------------

//------------------------------  Форма добавления карточек 
// открыть
function popupAddOpened() {
  popupAdd.classList.add('popup-add_opened');
};
addButton.addEventListener('click', popupAddOpened);

// закрыть
function popupAddClose() {
  popupAdd.classList.remove('popup-add_opened');
};
closeButtonPopupAdd.addEventListener('click', popupAddClose);

//добавить карточку через форму
function renderCardUser(evt) {              // функция добавления карточки через форму
  evt.preventDefault();

  if (inputPlace.value && inputLink.value) {        //не допускаем пустых строк в форме

    const cardTemplate = getCard(inputPlace.value, inputLink.value);     //функция создать карточку
    renderCard(cardTemplate, cardsContainer);                           //функция добавляет карточку
    inputPlace.value = '';  //обнуляем
    inputLink.value = '';   //обнуляем

    popupAddClose();  //закрываем форму
  };
};

formAdd.addEventListener('submit', renderCardUser);     // слушатель формы добавления карточек
//------------------------------------------------------------------------------------------------------------

//-------------------------------popup с картинкой

//открытие
function popupImgOpened(item) {                     //функция открытия popup
  popupImg.classList.add('popup-img_opened'); //добавляем класс "открытия" popup
  const link = item.getAttribute('src');  //получаем ссылку кликнутой картинки
  popupImgImage.setAttribute('src', link);  //передаем ссылку в popup с картинкой

  const name = item.getAttribute('alt');    //получаем текст с атрибута alt
  popupImgTitle.textContent = name;         //присваиваем title popup с картинкой текст с атрибута alt
}

//закрытие
function popupImgClose() {                              //функция закрытия popup
  popupImg.classList.remove('popup-img_opened');    //удаляем класс "открытия" popup
};
closeButtonPopupImg.addEventListener('click', popupImgClose); // вешаем слушатель на клик кнопки закрытия popup с картинкой
//---------------------------------------------------------------------------------------------------------------------


















