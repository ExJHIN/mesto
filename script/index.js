const profileOpenPopupButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup'); 

const popupCloseButton = document.querySelector('.popup__close'); 
const popupSaveButton = document.querySelector('.form__save');


let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__input_text_name'); 
let jobInput = document.querySelector('.form__input_text_descr'); 

let profileName = document.querySelector('.profile__title'); 
let profileJob = document.querySelector('.profile__description'); 



function openPopup() { 
  popup.classList.add('popup_opened'); 

  nameInput.value = profileName.innerHTML;
  jobInput.value = profileJob.innerHTML;
}

function closePopup() { 
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
	evt.preventDefault(); 

  profileName.textContent = nameInput.value; 

  profileJob.textContent = jobInput.value; 

  closePopup(); 
}

formElement.addEventListener('submit', formSubmitHandler);
profileOpenPopupButton.addEventListener('click', openPopup); 
popupCloseButton.addEventListener('click', closePopup); 
popupSaveButton.addEventListener('click', formSubmitHandler);
