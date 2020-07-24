export class Api {
  constructor({ serverUrl, headers }) {
    this.serverUrl = serverUrl;
    this.headers = headers;
  }

  //метод отправки запроса
  _sendRequest(way, options) {
    return fetch(`${this.serverUrl}${way}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else if (!res.ok) {
          return Promise.reject(res.status);
        }
      })
  }

  //метод запроса информации о пользователе с сервера
  getUserInfo() {
    return this._sendRequest(`/users/me`, {
      headers: this.headers
    })
  }

  //метод отправки новой информации пользователя на сервер
  sendUserInfo(newUserInfo) {
    return this._sendRequest(`/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newUserInfo.popupEditName,
        about: newUserInfo.popupEditAbout
      })
    })
  }

  //метод обновления аватара
  sendUserAvatar(avatar) {
    console.log(avatar.avatar)
    return this._sendRequest(`/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatar.avatar }),
      headers: this.headers
    })
  }

  //метод запроса карточек с сервера
  getCards() {
    return this._sendRequest(`/cards`, {
      method: 'GET',
      headers: this.headers
    })
  }

  //метод отправки новой карточки на сервер
  addCard(card) {
    return this._sendRequest(`/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
      headers: this.headers
    })
  }

  //метод добавления лайка у карточки
  addLike(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  //метод удаления лайка
  deleteLike(id) {
    return this._sendRequest(`/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  //метод удаления карточки
  deleteCard(id) {
    return this._sendRequest(`/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }
}