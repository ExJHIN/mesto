import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector)
    this._submitForm = submitForm;
    this._submitButton = this._popupElement.querySelector('.form__save');
    this._form = this._popupElement;
    this._formProfile = this._popupElement.querySelector('form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  //метод, собирающий данные всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupElement.addEventListener('submit', event => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
    })
  }

  renderLoading(isLoading) {
    if(isLoading){
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = 'Сохранить'
    }
  }

  close() {
    super.close();
    this._formProfile.reset();
  }
}