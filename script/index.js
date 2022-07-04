const editProfilePopupNode = document.querySelector('.popup_edit-profile');
const newCardPopupNode = document.querySelector('.popup_new-place');
const cardsContainerNode = document.querySelector('.elements');

const picturePopup = document.querySelector('.popup_open-picture');
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
const profileForm = editProfilePopupNode.querySelector('.form');
const profileNameInput = editProfilePopupNode.querySelector(
	'.form__input_text_name'
);
const profileDescriptionInput = editProfilePopupNode.querySelector(
	'.form__input_text_descr'
);
const profileCloseButton = editProfilePopupNode.querySelector('.popup__close');

const newCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopupNode.querySelector('.popup__close');
const newCardForm = newCardPopupNode.querySelector('.form');
const addingCardnameInput = newCardPopupNode.querySelector(
	'.form__input_text_name'
);
const addingCardlinkInput = newCardPopupNode.querySelector('.form__input_link');

// Слушатель на открытие popup по кнопке редактирования
profileEditingButton.addEventListener('click', () => {
	profileNameInput.value = profileName.textContent.trim();
	profileDescriptionInput.value = profileDescription.textContent.trim();

	openPopup(editProfilePopupNode);
});
profileForm.addEventListener('submit', (event) => {
	event.preventDefault();

	profileName.textContent = profileNameInput.value;
	profileDescription.textContent = profileDescriptionInput.value;

	closePopup(editProfilePopupNode);
});
profileCloseButton.addEventListener('click', () =>
	closePopup(editProfilePopupNode)
);
// Слушатель на открытие popup по кнопке добавления карточки
newCardButton.addEventListener('click', () => openPopup(newCardPopupNode));
newCardCloseButton.addEventListener('click', () => {
	closePopup(newCardPopupNode);

	resetNewCardInputs();
});
newCardForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const card = {
		name: addingCardnameInput.value,
		link: addingCardlinkInput.value,
	};
	renderCard(card, cardsContainerNode);
	closePopup(newCardPopupNode);
	resetNewCardInputs();
});

function resetNewCardInputs() {
	addingCardnameInput.value = '';
	addingCardlinkInput.value = '';
}

//Функция отрытия/закрытия popup
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
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

	const trashButton = card.querySelector('button');
	trashButton.addEventListener('click', () => {
		card.parentNode.removeChild(card);
	});
	const img = card.querySelector('img');
	img.setAttribute('src', link);
	img.setAttribute('alt', name);

	const bottomBlock = card.querySelector('div');

	const title = card.querySelector('h3');
	title.textContent = name;

	const likeContainer = card.querySelector('div');

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
