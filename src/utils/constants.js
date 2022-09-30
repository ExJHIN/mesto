export const initialCards = [
	{
		name: 'Ясуо',
		imgLink: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0ea8d48e2a085006/5f0e41e6f7f785077f5d8e6d/SB_Yasuo.jpg',
	},
	{
		name: 'Джин',
		imgLink: 'https://kartinkin.net/uploads/posts/2021-07/1626259192_9-kartinkin-com-p-liga-legend-rell-art-art-krasivo-9.jpg',
	},
	{
		name: 'Ирелия',
		imgLink: 'https://kartinkin.net/uploads/posts/2022-01/1641926577_4-kartinkin-net-p-liga-legend-ireliya-art-krasivo-4.jpg',
	},
	{
		name: 'Афелий',
		imgLink: 'https://img5.goodfon.ru/original/2880x1800/2/80/lol-liga-legend-league-of-legends-igra-game-afelii-lol.jpg',
	},
	{
		name: 'Экко',
		imgLink: 'https://i.pinimg.com/originals/e6/a1/9b/e6a19bcd897a5ff5aa79cfbfdd65e44f.jpg',
	},
	{
		name: 'Сенна',
		imgLink: 'https://img.championat.com/news/big/f/v/pered-finalom-chm-po-league-of-legends-vystupit-nov_15724345732020490787.jpg',
	},
];
export const enableValidationProfile = {
	formSelector: '.form_one',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__save',
	inactiveButtonClass: 'popup__button-invalid',
	errorClass: 'popup__error_visible',
	buttonValid: 'popup__button-valid',
	buttonInvalid: 'popup__button-invalid',
};
 export const name = 'User';
export const elements = [];
export const enableValidationAddCard = {
	formSelector: '.form_two',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__save',
	inactiveButtonClass: 'popup__button-invalid',
	errorClass: 'popup__error_visible',
	buttonValid: 'popup__button-valid',
	buttonInvalid: 'popup__button-invalid',

};
export const profileEditPopupNode = document.querySelector('.popup_edit_profile');
export const newCardPopupNode = document.querySelector('.popup_new_place');
export const cardsContainerNode = document.querySelector('.elements');
export const KEYCODE_ESC = 27;
export const picturePopup = document.querySelector('.popup_open_popup');
export const picturePopupImage = picturePopup.querySelector('.popup__picture');
export const picturePopupDescription = picturePopup.querySelector(
	'.popup__description'
);
export const picturePopupCloseButton = picturePopup.querySelector('.popup__close');



export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const profileEditingButton = document.querySelector('.profile__edit-button');
export const newCardButton = document.querySelector('.profile__add-button');

export const profileForm = profileEditPopupNode.querySelector('.form_one');
export const newCardForm = newCardPopupNode.querySelector('.form_two');
export const nameInput = profileEditPopupNode.querySelector(
	'.form__input_text_name'
);
export const jobInput = profileEditPopupNode.querySelector(
	'.form__input_text_descr'
);
export const cardNameAddingInput = newCardPopupNode.querySelector(
	'.form__input_text_name'
);


export const profileCloseButton = profileEditPopupNode.querySelector('.popup__close');
export const newCardCloseButton = newCardPopupNode.querySelector('.popup__close');



export const buttonElement = newCardForm.querySelector(`.form__save`);
export const formList = Array.from(document.querySelectorAll('.form'));


export const element = document.querySelector('.element__img');
export const cardLinkAddingInput = newCardPopupNode.querySelector('.form__input_text_link');