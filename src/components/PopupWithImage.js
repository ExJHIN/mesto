import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._fullPictureImage = this._popupSelector;
    this._place = this._popupSelector.querySelector('.popup__figure');
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