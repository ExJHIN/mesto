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


/////////////////////////////// validate

const formOne = {
	form: '.form[name="formNameTwo"]',
	button: '.form__save',
	buttonValid: 'popup__button-valid',
	buttonInvalid:'popup__button-invalid'
}
const formTwo = {
	form: '.form[name="formNameOne"]',
	button: '.form__save',
	buttonValid: 'popup__button-valid',
	buttonInvalid:'popup__button-invalid'
}
function enableValidation(config) {
	//Нашли форму в документе
	const form = document.querySelector(config.form);
	form.addEventListener('submit', handleFormSubmit);
	form.addEventListener('input',(event)=> handleFormInput(event,config));
}
function handleFormInput(event,config) {
	const input = event.target;
	const form = event.currentTarget;
	showFieldError(input);
	setSubmitButtonState(form,config);
}

const showFieldError = (input) => {
	const error = input.nextElementSibling;
	error.textContent= input.validationMessage;
}

function setSubmitButtonState (form, config){
	const button= form.querySelector(config.button);
	const isValid = form.checkValidity();
	if (isValid){
		button.removeAttribute('disabled');
		button.classList.remove(config.buttonInvalid);
		button.classList.add(config.buttonValid);
	} else {
		button.setAttribute('disabled', true);
		button.classList.remove(config.buttonValid);
		button.classList.add(config.buttonInvalid);
	}
}


function handleFormSubmit(event) {
	event.preventDefault();
	const form = event.currentTarget;
	const isValid = form.checkValidity();
	const formElement = document.querySelector('[name="formNameTwo"]');
	const formInput = formElement.querySelector('.form__input');
	if (isValid) {
		// showInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		showFieldError(formInput, formInput.validationMessage);
		addNewCart();
		form.reset();
		//showInputError(form, inputElement, inputElement.validationMessage);
	} else {
		// hideInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		//hideInputError(formElement, inputElement);
		showFieldError(input);
	}
}
enableValidation(formOne);
enableValidation(formTwo);




/////////////////////////////// validate

const hideInputError = (formElement, inputElement) => {
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	// Остальной код такой же
	inputElement.classList.remove('popup__error_visible');
	errorElement.classList.remove('.popup__error_visible');
	errorElement.textContent = '';
};



/////////////////////////////// validate








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
