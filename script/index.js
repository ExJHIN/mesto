const profileEditPopupNode = document.querySelector('.popup_edit_profile');
const newCardPopupNode = document.querySelector('.popup_new_place');
const cardsContainerNode = document.querySelector('.elements');
let KEYCODE_ESC = 27;
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
const profileForm = profileEditPopupNode.querySelector('.form');
const profileNameInput = profileEditPopupNode.querySelector(
	'.form__input_text_name'
);
const profileDescriptionInput = profileEditPopupNode.querySelector(
	'.form__input_text_descr'
);
const profileCloseButton = profileEditPopupNode.querySelector('.popup__close');

const newCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopupNode.querySelector('.popup__close');
const newCardForm = newCardPopupNode.querySelector('.form');
const cardNameAddingInput = newCardPopupNode.querySelector(
	'.form__input_text_name'
);
const cardLinkAddingInput = newCardPopupNode.querySelector('.form__input_text_link');




// Слушатель на открытие popup по кнопке редактирования
profileEditingButton.addEventListener('click', () => {
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
	closePopup(newCardPopupNode);
});




profileForm.addEventListener('submit', (event) => {
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
	const popup = document.querySelector('.popup_opened');
	if (evt.target === popup) {
		closePopup(popup);
	}
}

function openPopup(popup) {
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
	initialCards.forEach((card, index) => {
		renderCard(card, place, index);
	});
}

//Получить Card
function getCardNode({ name, link }) {
	const card = document
		.querySelector('#cardNode')
		.content.cloneNode(true)
		.querySelector('.element');

	const trashButton = card.querySelector('.element__trash-btn');
	trashButton.addEventListener('click', () => {
		card.parentNode.removeChild(card);
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
//Функция рендера карточки
function renderCard(card, place) {
	const cardNode = getCardNode(card);
	place.prepend(cardNode);
}

// Вызов рендера карточек
renderInitialCards(cardsContainerNode);


const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('form__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('form__input_type_error');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);

	}
};


const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
}






const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.setAttribute('disabled', true);
		buttonElement.classList.remove('popup__button-valid');
		buttonElement.classList.add('popup__button-invalid');

	} else {
		buttonElement.removeAttribute('disabled');
		buttonElement.classList.remove('popup__button-invalid');
		buttonElement.classList.add('popup__button-valid');
	}
};

const resetButtonState = () => {
	const button = document.querySelector('.form__save');
	button.classList.add('popup__button-invalid');
}













const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(`.form__input`));
	const buttonElement = formElement.querySelector('.form__save');
	toggleButtonState(inputList, buttonElement);
	formElement.addEventListener('submit', function (evt) {
		evt.preventDefault();
		resetButtonState();
	});
	formElement.addEventListener('input', function (evt) {
		const inputElement = evt.target;
		checkInputValidity(formElement, inputElement);
		toggleButtonState(inputList, buttonElement);
	});

}






const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElement) => {
		setEventListeners(formElement);
	});
};

enableValidation();


newCardForm.addEventListener('submit', (event) => {
	
	event.preventDefault();
	const card = {
		name: cardNameAddingInput.value,
		link: cardLinkAddingInput.value,
	};
	renderCard(card, cardsContainerNode);
	resetNewCardInputs();
	closePopup(newCardPopupNode);
	


});


// LIKE
function addLikeListener(card) {
	const likeButton = card.querySelector('.element__like-btn');

	likeButton.addEventListener('click', () => {
		likeButton.classList.toggle('element__like-btn_active');
	});
}

//Клик по карточке
function onCardClick({ name, link, buttons }, evt) {
	if (buttons.includes(evt.target)) {
		return;
	}

	openPopup(picturePopup);

	picturePopupImage.src = link;
	picturePopupDescription.textContent = name;
}
