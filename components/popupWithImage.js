import { Popup } from './popup.js'
export class PopupWithImage extends Popup {

  open(name, link) {
    const popupImgImage = document.querySelector('.popup__image');
    const popupImgTitle = document.querySelector('.popup__title-image');
    popupImgImage.src = link;
    popupImgImage.alt = name;
    popupImgTitle.textContent = name;
    super.open();
  }
}