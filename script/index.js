const editProfilePopupNode = document.querySelector('.popup_edit-profile');
const addingCardPopupNode = document.querySelector('.popup_new-place');
const cardsContainerNode = document.querySelector('.elements');
const cardImg = document.querySelectorAll('.element__img');
const elementTitle = document.querySelector('.element__title');
const picturePopup = document.querySelector('.popup_open-picture');
const picturePopupImage = picturePopup.querySelector('.popup__picture');
const picturePopupDescription = picturePopup.querySelector('.popup__description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const openButton = document.querySelector('.profile__edit-button');
const closeButton = editProfilePopupNode.querySelector('.popup__close');
const submitButton = editProfilePopupNode.querySelector('.form__save');
const profileNameInput = editProfilePopupNode.querySelector('.form__input_text_name');
const profileDescriptionInput = editProfilePopupNode.querySelector('.form__input_text_descr');
const addingCardopenButton = document.querySelector('.profile__add-button');
const addingCardcloseButton = addingCardPopupNode.querySelector('.popup__close');
const addingCardsubmitButton = addingCardPopupNode.querySelector('.form__save');
const addingCardnameInput = addingCardPopupNode.querySelector('.form__input_text_name');
const addingCardlinkInput = addingCardPopupNode.querySelector('.form__input_link');


// Слушатель на открытие popup по кнопке редактирования
openButton.addEventListener('click', () => {
	profileNameInput.value = profileName.textContent;
	profileDescriptionInput.value = profileDescription.textContent;
  togglePopup(editProfilePopupNode);
});
closeButton.addEventListener('click', () => togglePopup(editProfilePopupNode));
submitButton.addEventListener('click', () => {
	profileName.textContent = profileNameInput.value;
	profileDescription.textContent = profileDescriptionInput.value;
	togglePopup(editProfilePopupNode);
});
// Слушатель на открытие popup по кнопке добавления карточки
addingCardopenButton.addEventListener('click', () => addingCardPopupNode.classList.add('popup_opened'));
addingCardcloseButton.addEventListener('click', () => addingCardPopupNode.classList.remove('popup_opened'));
addingCardsubmitButton.addEventListener('click', () => {
	const card = {
		name: addingCardnameInput.value,
		link: addingCardlinkInput.value,
	};
	renderCard(card, cardsContainerNode);
	addingCardPopupNode.classList.remove('popup_opened');
});
//Функция отрытия/закрытия popup
function togglePopup(editProfilePopupNode) {
	editProfilePopupNode.classList.toggle('popup_opened');
}



// Генерация карточек из массива
function renderInitialCards(place) {
	initialCards.forEach((card, index) => {
		renderCard(card, place, index);
	});
}

//Получить Card
function getCardNode({ name, link }) {
	const card  = document.querySelector('#cardNode').content.cloneNode(true).querySelector('.element');

	const trashButton = card.querySelector('button');
	trashButton.addEventListener('click', () => {
		card.parentNode.removeChild(card);
	});
	const img = card.querySelector('img');
	img.classList.add('element__img');
	img.setAttribute('src', link);
	img.setAttribute('alt', name);

	const bottomBlock = card.querySelector('div');
	bottomBlock.classList.add('element__bottom-block');

	const title = card.querySelector('h3');
	title.classList.add('element__title');
	title.textContent = name;

	const likeContainer = card.querySelector('div');
	likeContainer.classList.add('element__likes');

	const likeButton = card.querySelector('.element__like-btn');

	card.addEventListener(
		'click',
		onCardClick.bind(picturePopup, {
			name,
			link,
			buttons: [trashButton, likeButton],
		})
	);
	return card;
}
//Функция рендера карточки
function renderCard(card, place) {
	const cardNode = getCardNode(card);
	addLikeListener(cardNode);
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

//Закрытие popup
const closePopup = (evt) => {
	const popup = evt.target.closest('.popup');

	togglePopup(popup);
	const closeButton = popup.querySelector('.popup__close');
	closeButton.removeEventListener('click', closePopup);
}


//Клик по карточке
function onCardClick({ name, link, buttons }, evt) {
	if (buttons.includes(evt.target)) {
		return;
	}
	togglePopup(picturePopup);
	picturePopupImage.src = link;
	picturePopupDescription.textContent = name;
	const closeButton = this.querySelector('.popup__close');
	closeButton.addEventListener('click', closePopup);
}
