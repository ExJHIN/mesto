import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { enableValidationProfile } from './constants.js';
const profileEditPopupNode = document.querySelector('.popup_edit_profile');
const newCardPopupNode = document.querySelector('.popup_new_place');
const cardsContainerNode = document.querySelector('.elements');
const KEYCODE_ESC = 27;
const picturePopup = document.querySelector('.popup_open_popup');
const picturePopupImage = picturePopup.querySelector('.popup__picture');
const picturePopupDescription = picturePopup.querySelector(
	'.popup__description'
);
const picturePopupCloseButton = picturePopup.querySelector('.popup__close');

picturePopupCloseButton.addEventListener('click', () =>
	closePopup(picturePopup)
);

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditingButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const profileForm = profileEditPopupNode.querySelector('.form_one');
const newCardForm = newCardPopupNode.querySelector('.form_two');
const profileNameInput = profileEditPopupNode.querySelector(
	'.form__input_text_name'
);
const profileDescriptionInput = profileEditPopupNode.querySelector(
	'.form__input_text_descr'
);
const cardNameAddingInput = newCardPopupNode.querySelector(
	'.form__input_text_name'
);


const profileCloseButton = profileEditPopupNode.querySelector('.popup__close');
const newCardCloseButton = newCardPopupNode.querySelector('.popup__close');



export const buttonElement = newCardForm.querySelector(`.form__save`);
export const formList = Array.from(document.querySelectorAll('.form'));


const element = document.querySelector('.element__img');
const cardLinkAddingInput = newCardPopupNode.querySelector('.form__input_text_link');


// Вызов валидации


const formProfileValidator = new FormValidator(enableValidationProfile, profileForm);
const formAddCardValidator = new FormValidator(enableValidationProfile, newCardForm);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

const template = document.querySelector('#cardNode');
// Слушатель на открытие popup по кнопке редактирования
profileEditingButton.addEventListener('click', () => {
	profileNameInput.value = profileName.textContent.trim();
	profileDescriptionInput.value = profileDescription.textContent.trim();
	formProfileValidator.resetValidation();
	openPopup(profileEditPopupNode);
});

profileCloseButton.addEventListener('click', () =>
	closePopup(profileEditPopupNode)
);
// Слушатель на открытие popup по кнопке добавления карточки
newCardButton.addEventListener('click', () => {
	formAddCardValidator.resetValidation();
	resetNewCardInputs();
	openPopup(newCardPopupNode);

});
newCardCloseButton.addEventListener('click', () => {
	closePopup(newCardPopupNode);
});

newCardForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const card = createCard({
		name: cardNameAddingInput.value,
		imgLink: cardLinkAddingInput.value
	});
	newCardForm.reset();
	renderCard(card.getNode(), cardsContainerNode);
	closePopup(newCardPopupNode);
	

});

profileForm.addEventListener('submit', (event, profileForm) => {
	event.preventDefault();
	profileName.textContent = profileNameInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closePopup(profileEditPopupNode);
});


function resetNewCardInputs() {
	cardNameAddingInput.value = '';
	cardLinkAddingInput.value = '';
}




//Функция отрытия/закрытия popup
function closePopupEsc(evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_opened');
		closePopup(popup);

	}
}

function closePopupOverlay(evt) {
	const popup = evt.currentTarget;
	if (evt.target === popup) {
		closePopup(popup);
	}
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupEsc);
	popup.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupEsc);
	popup.removeEventListener('click', closePopupOverlay);
}

// Генерация карточек из массива
function renderInitialCards(place) {
	initialCards.forEach((cardData) => {
		const card = createCard(cardData);

		renderCard(card.getNode(), place);
	});
}



//Функция рендера карточки
function renderCard(cardNode, place) {
	place.prepend(cardNode);
}

// Вызов рендера карточек
renderInitialCards(cardsContainerNode);



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
			openPopup(picturePopup);
			picturePopupImage.src = imgLink;

			picturePopupDescription.textContent = name;

			picturePopupImage.alt = name;


		},
		deleteClick: () => {
			card.dettach();
		},
		likeClick: () => {
			card.toggleLike();
		}
	});

	return card;
}













