import {Popup} from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(popup, confirmPopup) {
    super(popup)
    this._confirmPopup = confirmPopup;
    this._deleteButton = this._popup.querySelector('.form__save')
  }

  changeSubmitHandler(newSubmitHandler) {
    this._confirmPopup = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners()
    this._deleteButton.addEventListener('click', event => {
      event.preventDefault()
      this._confirmPopup();
      super.close();
    })
  }
}