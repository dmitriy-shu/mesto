//-----------------------------------класс Card-------------------------------------------

export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  //метод копирования пустой карточки из шаблона
  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);

    return cardTemplate;
  }

  //метод создания и заполнения пустой карточки
  generateCard() {
    this._cardTemplate = this._getCardTemplate();

    this._cardTemplate.querySelector('.card__title').textContent = this._name;
    this._cardTemplate.querySelector('.card__image').setAttribute('src', this._link);
    this._cardTemplate.querySelector('.card__image').setAttribute('alt', `Тут должна была быть фотография места: "${this._name}", но что-то пошло не так`);
    this._cardTemplate.querySelector('.card__image').setAttribute('name', this._name);

    this._addTemplateEvent();

    return this._cardTemplate;
  }

  //метод установки слушателей
  _addTemplateEvent() {

    // слушатель лайков
    this._cardTemplate.querySelector('.card__button-like').addEventListener('click', () => {
      this._toggleLike();
    });

    // слушатель корзины
    this._cardTemplate.querySelector('.card__button-delet').addEventListener('click', () => {
      this._deletCard();
    });

    // слушатель фотографии
    this._cardTemplate.querySelector('.card__image').addEventListener('click', () => {
      this._openCardImage();
    });
  };

  //метод постановки/снятия лайка
  _toggleLike() {
    this._cardTemplate.querySelector('.card__button-like').classList.toggle('card__button-like_active')
  }

  //метод удаления карточки
  _deletCard() {
    this._cardTemplate.remove()
  }

  //метод открытия карты с увеличением
  _openCardImage() {
    const imageInfo = this._cardTemplate.querySelector('.card__image');
    openImagePopup(popupImg, imageInfo);
  }
};
//-------------------------------------------------------------------------------------------
