export class Popup {
    constructor(popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
    }
  
    //метод, который реализует открытие по нажатию esc
    _handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    setEventListeners() {
      this._popupSelector.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
          this.close()
        }
      })
    }   
  
    //метод открытия попапа
    open() {
      this._popupSelector.classList.add('popup_opened');
  
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    //метод закрытия попапа
    close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }