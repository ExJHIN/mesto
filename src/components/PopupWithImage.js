import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._fullPictureImage = this._popupElement.querySelector('.popup__picture')
    this._fullPictureTitle = this._popupElement.querySelector('.popup__description')
  }

  //перезаписываем родительский метод
  open({name,imgLink}) {
    this._fullPictureImage.src = imgLink;
    this._fullPictureImage.alt = 'На изображении ' + name;
    this._fullPictureTitle.textContent = name;
    super.open();
  }
}