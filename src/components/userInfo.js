export class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }

  //метод возвращает обьект с информацией о пользователе
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._profileName.textContent = data.popupEditName;
    this._profileAbout.textContent = data.popupEditAbout;
  }
}