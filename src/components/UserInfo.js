export class UserInfo {
    constructor({ nameSelector, jobSelector,avatarSelector}) {
      this._profileName = document.querySelector(nameSelector);
      this._profileJob = document.querySelector(jobSelector);
      this._avatarSelector = document.querySelector(avatarSelector);
    }
  
    // возвращает объект с данными профиля, чтобы вставить данные в форму при открытии.
    getUserInfo() {
      const userData = {
        name: this._profileName.textContent,
        about: this._profileJob.textContent,
      }
      return userData
    }
  
    //принимает новые данные для профиля и добавляет их на страницу
    setUserInfo(name,about) {
      this._profileName.textContent = name; //Наставник сказал, это можно не делать , если ошибаюсь разъясните пожалуйста, что именно требуется
      this._profileJob.textContent = about;
  
    }
    setAvatarInfo(avatar) {
      this._avatarSelector.src = avatar;
    }
  
  }