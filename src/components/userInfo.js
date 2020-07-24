export class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  //метод возвращает обьект с информацией о пользователе
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }


  //метод установки картинки аватара
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

}