
export class Card {
  constructor({ initialCards, handleCardClick }, cardTemplate) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
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

    const cardImage = this._cardTemplate.querySelector('.card__image');

    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt', `Тут должна была быть фотография места: "${this._name}", но что-то пошло не так`);
    cardImage.setAttribute('name', this._name);

    this._setEventListeners();

    return this._cardTemplate;
  }

  //метод установки слушателей
  _setEventListeners() {

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
      this._handleCardClick(this._name, this._link);
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

};

