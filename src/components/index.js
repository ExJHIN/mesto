import '../styles/index.css'; 
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from '../utils/constants.js';
import { enableValidationProfile , elements } from '../utils/constants.js';
import { Section } from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithForm} from './PopupWithForm.js';
import {profileEditPopupNode, newCardPopupNode, cardsContainerNode, KEYCODE_ESC, picturePopup, picturePopupImage, picturePopupDescription, picturePopupCloseButton, profileName, profileDescription, profileEditingButton, newCardButton, profileForm,newCardForm, jobInput,  nameInput, cardNameAddingInput, profileCloseButton,newCardCloseButton ,buttonElement, formList, element, cardLinkAddingInput} from '../utils/constants.js';






const dataUserInfo = new UserInfo ({
	nameSelector: '.profile__title',
	jobSelector: '.profile__description'
  });



const popupImage = new PopupWithImage('.popup_open_popup');



// Вызов валидации
const formProfileValidator = new FormValidator(enableValidationProfile, profileForm);
const formAddCardValidator = new FormValidator(enableValidationProfile, newCardForm);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

//Генерация контейнера
const cardsList = new Section({elements: initialCards, renderer: createCard},'.elements' );






//Функция создания карточки
function createCard({ name, imgLink}) {
	
	const card = new Card({
		name,
		imgLink,
		selectors: {
			template: '#cardNode',
			innerContent: '.element',
			trashButton: '.element__trash-btn',
			img: '.element__img',
			title: '.element__title',
			likeButton: '.element__like-btn',
			likeButtonActive: 'element__like-btn_active'
		}
	}, {
		cardClick: (name, imgLink) => {
			popupImage.open(name,imgLink);
		},
		deleteClick: () => {
			card.dettach();
		},
		likeClick: () => {
			card.toggleLike();
		}
	});
	return card.getNode();
}





initialCards.forEach(({ name, imgLink}) => {
	const card = createCard({
		name,
		imgLink,
	})
	cardsList.addItemAppend(card);
  }) 




//Сабмит формы добавления карточки
const addCardPopup = new PopupWithForm('.popup_new_place', (data) => {
	const card = createCard({
		name: data.name,
		imgLink: data.url
	});
	  cardsList.addItemPrepend(card);
	  newCardForm.reset();
	  addCardPopup.close();
	});
  


// Слушатель на открытие popup по кнопке добавления карточки
	newCardButton.addEventListener('click', () => {
		formAddCardValidator.resetValidation();
		event.preventDefault();
		resetNewCardInputs();
		addCardPopup.open();
	
	});
	










//сабмитим форму редктирования профиля
const editProfilePopup = new PopupWithForm('.popup_edit_profile', (name, about) => {
	  dataUserInfo.setUserInfo(name, about);
	  editProfilePopup.close()
});
  

// Слушатель на открытие popup по кнопке редактирования
profileEditingButton.addEventListener('click', (event) => {
	formProfileValidator.resetValidation();
	event.preventDefault();
	const userData = dataUserInfo.getUserInfo();
	nameInput.value = userData.name;
	jobInput.value = userData.about;
	editProfilePopup.open(); 
});






//reset
function resetNewCardInputs() {
	cardNameAddingInput.value = '';
	cardLinkAddingInput.value = '';
}


//слушатели для закрытия попапов
popupImage.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();








