import {Popup} from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(popupSelector, confirmPopup) {
    super(popupSelector)
    this._confirmPopup = confirmPopup;
    this._deleteButton = this._popupElement.querySelector('.form__save')
  }

  changeSubmitHandler(newSubmitHandler) {
    this._confirmPopup = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners()
    this._deleteButton.addEventListener('click', event => {
      event.preventDefault()
      this._confirmPopup();
    })
  }
}