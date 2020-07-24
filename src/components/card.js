
export class Card {
  constructor(data, userId, { cardTemplate, handleCardClick, deleteCards, handleLike, handleDeleteLike }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._userId = userId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCards;
    this._handleLike = handleLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  //метод копирования пустой карточки из шаблона
  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);

    return cardTemplate;
  }

  //метод постановки/снятия лайка
  toggleLike() {
    this._cardTemplate.querySelector('.card__button-like').classList.toggle('card__button-like_active')
  }

  //метод счетчик лайков
  likeCounterCard(arr) {
    this._cardTemplate.querySelector('.card__counter-like').textContent = arr.length;
  }

  //метод отображения количества лайков у карточки
  _showlike() {
    this._cardTemplate.querySelector('.card__button-like').classList.contains('card__button-like_active')
      ? this._handleDeleteLike()
      : this._handleLike();
  }

  //метод установки слушателей
  _setEventListeners() {

    // слушатель лайков
    this._cardTemplate.querySelector('.card__button-like').addEventListener('click', () => {
      this._showlike();
    });

    // слушатель корзины
    this._cardTemplate.querySelector('.card__button-delet').addEventListener('click', () => {
      this._deleteCard();
    });

    // слушатель фотографии
    this._cardTemplate.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //метод создания и заполнения пустой карточки
  generateCard() {
    this._cardTemplate = this._getCardTemplate();

    this._cardTemplate.querySelector('.card__title').textContent = this._name;

    const cardImage = this._cardTemplate.querySelector('.card__image');

    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt', `Тут должна была быть фотография места: "${this._name}", но что-то пошло не так`);
    cardImage.setAttribute('name', this._name);

    this._cardTemplate.id = this._id;

    this._cardTemplate.querySelector('.card__counter-like').textContent = `${this._likes.length}`;

    if (this._likes.find((like) => like._id === this._userId)) {
      this._cardTemplate.querySelector('.card__button-like').classList.add('card__button-like_active');
    }

    if (this._owner._id === this._userId) {
      this._cardTemplate.querySelector('.card__button-delet').style.display = 'block';
    }

    this._setEventListeners();

    return this._cardTemplate;
  }

  //метод удаления карточки
  deletCard() {
    this._cardTemplate.remove()
  }

};



