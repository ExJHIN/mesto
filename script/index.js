const editProfilePopupNode = document.querySelector('.popup_edit-profile');
const addingCardPopupNode = document.querySelector('.popup_new-place');

const cardsContainerNode = document.querySelector('.elements');

const cardImg = document.querySelectorAll('.element__img');
const elementTitle = document.querySelector('.element__title');

const picturePopup = document.querySelector('.popup_open-picture');
const picturePopupImage = picturePopup.querySelector('.popup__picture');
const picturePopupDescription = picturePopup.querySelector('.popup__description');

const editProfile = {
	profileName: document.querySelector('.profile__title'),
	profileDescription: document.querySelector('.profile__description'),
	popupNode: editProfilePopupNode,
	openButton: document.querySelector('.profile__edit-button'),
	closeButton: editProfilePopupNode.querySelector('.popup__close'),
	submitButton: editProfilePopupNode.querySelector('.form__save'),
	profileNameInput: editProfilePopupNode.querySelector(
		'.form__input_text_name'
	),
	profileDescriptionInput: editProfilePopupNode.querySelector(
		'.form__input_text_descr'
	),
	addListeners() {
		this.openButton.addEventListener('click', () => {
			this.profileNameInput.value = this.profileName.textContent;
			this.profileDescriptionInput.value =
				this.profileDescription.textContent;

			togglePopup(this.popupNode);
		});
		this.closeButton.addEventListener('click', () =>
			togglePopup(this.popupNode)
		);
		this.submitButton.addEventListener('click', () => {
			this.profileName.textContent = this.profileNameInput.value;
			this.profileDescription.textContent =
				this.profileDescriptionInput.value;
		});
	},
};

const addingCard = {
	popupNode: addingCardPopupNode,
	openButton: document.querySelector('.profile__add-button'),
	closeButton: addingCardPopupNode.querySelector('.popup__close'),
	submitButton: addingCardPopupNode.querySelector('.form__save'),
	nameInput: addingCardPopupNode.querySelector('.form__input_text_name'),
	linkInput: addingCardPopupNode.querySelector('.form__input_link'),
	addListeners(cards, containerNode) {
		this.openButton.addEventListener('click', () =>
			togglePopup(this.popupNode)
		);
		this.closeButton.addEventListener('click', () =>
			togglePopup(this.popupNode)
		);
		this.submitButton.addEventListener('click', () => {
			const card = {
				name: this.nameInput.value,
				link: this.linkInput.value,
			};

			cards.push(card);
			renderCard(card, containerNode);
		});
	},
};


function togglePopup(popupNode) {
	popupNode.classList.toggle('popup_opened');
}

const cards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
];

// Генерация карточек из массива
function render(place) {
	cards.forEach((card, index) => renderCard(card, place, index));
}

function rerender(place) {
	place.innerHTML = '';
	render(place);
}

//Получить Card
function getCardNode({ name, link }, removeHandler) {
	const card = document.createElement('li');
	card.classList.add('element');

	const trashButton = document.createElement('button');
	trashButton.classList.add('element__trash-btn');
	trashButton.addEventListener('click', () => removeHandler());
	card.append(trashButton);

	const img = document.createElement('img');
	img.classList.add('element__img');
	img.setAttribute('src', link);
	card.append(img);
	

	const bottomBlock = document.createElement('div');
	bottomBlock.classList.add('element__bottom-block');
	card.append(bottomBlock);

	const title = document.createElement('h3');
	title.classList.add('element__title');
	title.textContent = name;
	bottomBlock.append(title);

	const likeContainer = document.createElement('div');
	likeContainer.classList.add('element__likes');
	bottomBlock.append(likeContainer);

	const likeButton = document.createElement('button');
	likeButton.classList.add('element__like-btn');
	likeContainer.append(likeButton);

	card.addEventListener('click', onCardClick.bind(picturePopup, {name,link, buttons:[trashButton, likeButton]}));
	return card;
}



function removeCard(index, place) {
	return () => {
		cards.splice(index, 1);

		rerender(place);
	};
}

function renderCard(card, place, index) {
	const cardNode = getCardNode(card, removeCard(index, place));
	place.prepend(cardNode);
}


// Вызов рендера карточек
render(cardsContainerNode);
editProfile.addListeners();
const cardFavoriteBtn = document.querySelectorAll('.element__like-btn');
//Лайк карточек
Array.from(cardFavoriteBtn).forEach(cardBtn => {
	cardBtn.addEventListener('click', function(){
		cardBtn.classList.toggle('element__like-btn_active');
	})
});

function onCardClick ({ name, link,buttons } , evt){
	if (buttons.includes(evt.target)){
		return;
	}
	togglePopup(picturePopup);
	picturePopupImage.src = link;
	picturePopupDescription.textContent = name;
	const closeButton = this.querySelector('.popup__close');
	const closePopup = () => {
		togglePopup(this);
		closeButton.removeEventListener('click', closePopup);
	}
	
	closeButton.addEventListener('click', closePopup);
}


addingCard.addListeners(cards, cardsContainerNode);
