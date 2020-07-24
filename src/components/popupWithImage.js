import { Popup } from './popup.js'
export class PopupWithImage extends Popup {

  open(data) {
    const popupImgImage = document.querySelector('.popup__image');
    const popupImgTitle = document.querySelector('.popup__title-image');
    popupImgImage.src = data.link;
    popupImgImage.alt = data.name;
    popupImgTitle.textContent = data.name;
    super.open();
  }
}