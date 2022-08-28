import { FormValidator } from './FormValidator.js';
import { initialCards, Card } from './Card.js';
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
<<<<<<< HEAD

const profileCloseButton = profileEditPopupNode.querySelector('.popup__close');
const newCardCloseButton = newCardPopupNode.querySelector('.popup__close');


const element = document.querySelector('.element__img');
const cardLinkAddingInput = newCardPopupNode.querySelector('.form__input_text_link');
export const buttonElement = newCardForm.querySelector(`.form__save`);
export const formList = Array.from(document.querySelectorAll('.form'));

=======
const element = document.querySelector('.element__img');
const cardLinkAddingInput = newCardPopupNode.querySelector('.form__input_text_link');
const buttonElement = newCardForm.querySelector(`.form__save`);


>>>>>>> a7caeeaaa5dab90b4444a632cce5bb489445577a
const template = document.querySelector('#cardNode');
// Слушатель на открытие popup по кнопке редактирования
profileEditingButton.addEventListener('click', () => {
	resetButton(buttonElement);
	profileNameInput.value = profileName.textContent.trim();
	profileDescriptionInput.value = profileDescription.textContent.trim();

	openPopup(profileEditPopupNode);
});

profileCloseButton.addEventListener('click', () =>
	closePopup(profileEditPopupNode)
);
// Слушатель на открытие popup по кнопке добавления карточки
newCardButton.addEventListener('click', () => openPopup(newCardPopupNode));
newCardCloseButton.addEventListener('click', () => {
	resetNewCardInputs();
	closePopup(newCardPopupNode);

	newCardForm.markAsPristine();
});

newCardForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const card = createCard({
		name: cardNameAddingInput.value,
		imgLink: cardLinkAddingInput.value
	});

	renderCard(card.getNode(), cardsContainerNode);
	resetNewCardInputs();
	closePopup(newCardPopupNode);
	resetButton(buttonElement);
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

const resetButton = (buttonElement) => {
	buttonElement.setAttribute('disabled', true);
	buttonElement.classList.remove('popup__button-valid');
	buttonElement.classList.add('popup__button-invalid');
}


//Функция отрытия/закрытия popup
function closePopupEsc(evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_opened');
		closePopup(popup);
		resetNewCardInputs();
	}
}

function closePopupOverlay(evt) {
	const popup = document.querySelector('.popup_opened');
	if (evt.target === popup) {
		closePopup(popup);
		resetNewCardInputs();
	}
}

function openPopup(popup) {
	resetButton(buttonElement);
	popup.classList.add('popup_opened');
	window.addEventListener('keydown', closePopupEsc);
	popup.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	window.removeEventListener('keydown', closePopupEsc);
	popup.removeEventListener('click', closePopupOverlay);
}

// Генерация карточек из массива
function renderInitialCards(place) {
	initialCards.forEach((cardData) => {
		const card = createCard(cardData);

		renderCard(card.getNode(), place);
	});
}

<<<<<<< HEAD
=======
//Получить Card
function getCardNode({ name, link }) {
	const card = template
		.content.cloneNode(true)
		.querySelector('.element');

	const trashButton = card.querySelector('.element__trash-btn');
	trashButton.addEventListener('click', (evt) => {
		const item = trashButton.closest('.element')
		item.remove();
		

		/* card.parentNode.removeChild(card); Работает */
	});
	const img = card.querySelector('.element__img');
	img.setAttribute('src', link);
	img.setAttribute('alt', name);


	const title = card.querySelector('.element__title');
	title.textContent = name;

	const likeButton = card.querySelector('.element__like-btn');

	card.addEventListener(
		'click',
		onCardClick.bind(picturePopup, {
			name,
			link,
			buttons: [trashButton, likeButton],
		})
	);
	addLikeListener(card);
	return card;
}
>>>>>>> a7caeeaaa5dab90b4444a632cce5bb489445577a
//Функция рендера карточки
function renderCard(cardNode, place) {
	place.prepend(cardNode);
}

// Вызов рендера карточек
renderInitialCards(cardsContainerNode);

<<<<<<< HEAD
=======
newCardForm.addEventListener('submit', (event) => {

	event.preventDefault();
	const card = {
		name: cardNameAddingInput.value,
		link: cardLinkAddingInput.value,
	};
	renderCard(card, cardsContainerNode);
	resetNewCardInputs();

	closePopup(newCardPopupNode);
	resetButton(buttonElement);
>>>>>>> a7caeeaaa5dab90b4444a632cce5bb489445577a


function createCard({ name, imgLink }) {
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
		cardClick: () => {
			openPopup(picturePopup);

<<<<<<< HEAD
			picturePopupImage.src = cardLinkAddingInput.value;
			picturePopupDescription.textContent = cardNameAddingInput.value;
			picturePopupImage.alt = cardNameAddingInput.value;
		},
		deleteClick: () => {
			card.dettach();
		},
		likeClick: () => {
			card.toggleLike();
		}
=======

profileForm.addEventListener('submit', (event, profileForm) => {
	event.preventDefault();
	profileName.textContent = profileNameInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	closePopup(profileEditPopupNode);
});




enableValidation(formVal);

// LIKE
function addLikeListener(card) {
	const likeButton = card.querySelector('.element__like-btn');
	likeButton.addEventListener('click', () => {
		likeButton.classList.toggle('element__like-btn_active');
>>>>>>> a7caeeaaa5dab90b4444a632cce5bb489445577a
	});

	return card;
}



<<<<<<< HEAD
// Вызов валидации
const enableValidation = {
	formSelector: '.form_one',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__save',
	inactiveButtonClass: 'popup__button-invalid',
	errorClass: 'popup__error_visible',
	buttonValid: 'popup__button-valid',
	buttonInvalid: 'popup__button-invalid',
};

const enableValidationTwo = {
	formSelector: '.form_two',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__save',
	inactiveButtonClass: 'popup__button-invalid',
	errorClass: 'popup__error_visible',
	buttonValid: 'popup__button-valid',
	buttonInvalid: 'popup__button-invalid',
=======
	picturePopupImage.src = link;
	picturePopupDescription.textContent = name;
	picturePopupImage.alt = name;
>>>>>>> a7caeeaaa5dab90b4444a632cce5bb489445577a
}

const formOneValidator = new FormValidator(enableValidation, profileForm);
const formTwoValidator = new FormValidator(enableValidationTwo, newCardForm);

formOneValidator.enableValidation();
formTwoValidator.enableValidation();

formOneValidator.resetValidation();
formTwoValidator.resetValidation();