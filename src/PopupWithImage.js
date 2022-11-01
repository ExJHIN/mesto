import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popup) {
    super(popup);
    this._fullPictureImage = this._popup;
    this._place = document.querySelector('.popup__figure');
    this._fullPictureTitle = this._place.querySelector('.popup__description');
  }

  //перезаписываем родительский метод
  open({name,imgLink}) {

    
    this._fullPictureImage.src = imgLink;
    this._fullPictureImage.alt = 'На изображении ' + name;
    this._fullPictureTitle.textContent = name;

    super.open();
  }
}