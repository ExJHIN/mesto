export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
    }
  
    //метод, который реализует открытие по нажатию esc
    _handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this._popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
          this.close()
        }
      })
    }   
  
    //метод открытия попапа
    open() {
      this._popupElement.classList.add('popup_opened');
  
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    //метод закрытия попапа
    close() {
      this._popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }