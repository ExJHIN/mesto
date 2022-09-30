import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popup) {
    super(popup);
    this._fullPictureImage = this._popup;
    this._place = document.querySelector('.popup__picture');
    this._fullPictureTitle = this._popup.querySelector('.popup__description');
  }

  //перезаписываем родительский метод
  open(name,imgLink) {

    console.log(imgLink);
    this._place.src = imgLink;
    this._place.alt = 'На изображении ' + name;
    this._fullPictureTitle.textContent = name;
    super.open();
  }
}