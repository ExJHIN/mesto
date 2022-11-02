import './index.css'; 
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { enableValidationProfile , elements } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupDelete } from '../components/PopupDelete.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {profileEditPopupNode, enableAvatar,newAvatarForm, enableValidationAddCard,editAvatarForm,avatarPopupButton, newCardPopupNode,   submitDeleteButton, cardsContainerNode, KEYCODE_ESC, picturePopup, picturePopupImage, picturePopupDescription, picturePopupCloseButton, profileName, profileDescription, profileEditingButton, newCardButton, profileForm,newCardForm, jobInput,  nameInput, cardNameAddingInput, profileCloseButton,newCardCloseButton ,buttonElement, formList, element, cardLinkAddingInput,avatarSelector} from '../utils/constants.js';
import {api} from '../components/Api.js';

let userId;

const cardsList = new Section({
	renderer: (data) => {
		cardsList.addItem(createCard({
			name: data.name,
			imgLink: data.link,
			likes: data.likes,
			id: data._id,
			userId: userId,
			ownerId: data.owner._id
		  }));
	  }
  },'.elements');
  
//Генерация контейнера
  api.getInfo()
  .then(([elements, res]) => {
    userId = res._id
    dataUserInfo.setUserInfo(res.name, res.about,)
    dataUserInfo.setAvatarInfo(res.avatar);
	cardsList.renderItems(elements); 
  })
  .catch((err) => {
    console.log(err);
  });

  const dataUserInfo = new UserInfo ({
	nameSelector: '.profile__title',
	jobSelector: '.profile__description',
	avatarSelector: '.profile__avatar-image'
  });

const popupImage = new PopupWithImage('.popup_open_popup');
const popupConfirmation = new PopupDelete('.popup_delete');

const popupEditAvatar = new PopupWithForm('.popup_change-avatar', (data) => {
	const {avatar} = data
	 popupEditAvatar.renderLoading(true); 
	api.editAvatar(avatar)
	.then(res => {
	  dataUserInfo.setAvatarInfo(avatar);
	  popupEditAvatar.close();
	})
	.catch((err) => {
	  console.log(err);
	})
	.finally(() => popupEditAvatar.renderLoading(false))
  })
// Вызов валидации
const formProfileValidator = new FormValidator(enableValidationProfile, profileForm);
const formAddCardValidator = new FormValidator(enableValidationProfile, newCardForm);
const editAvatarValidator = new FormValidator(enableValidationAddCard, newAvatarForm); 
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
 editAvatarValidator.enableValidation(); 
//Функция создания карточки

 function createCard({ name, imgLink,id,data, userId,ownerId,likes}) {
	
	const card = new Card({	
		name,
		imgLink,
		id,
		data,
		userId,
		likes,
		ownerId,
		selectors: {
			template: '#cardNode',
			innerContent: '.element',
			trashButton: '.element__trash-btn',
			img: '.element__img',
			title: '.element__title',
			likeButton: '.element__like-btn',
			likeButtonActive: 'element__like-btn_active',
			deleteButton:'.form__save-add'
		},
	},  {
		cardClick: (name, imgLink) => {	
			popupImage.open({name, imgLink});
		},
		deleteClick: (id) => {
			popupConfirmation.open();
			popupConfirmation.changeSubmitHandler(() => {
				api.deleteCard(id)
				.then(res => {
				card.dettach(); 
				popupConfirmation.close();
				})
				.catch((err) => {
					console.log(err);
				  })
				
			  })
			  
			 
		},
		likeClick: (id) => {
				if(card.isLiked()) {
				  api.deleteLike(id)
				.then(res => {
				  card.setLikes(res.likes)
				})} else {
				  api.addLike(id)
				.then(res => {
				  card.setLikes(res.likes)
				})
				.catch((err) => {
					console.log(err);
				  })
				}	
		},
	});
	cardsList.addItemAppend(card.getNode());
	card.blockCard();
	return card;
} 

picturePopupCloseButton.addEventListener('click', () =>
	closePopup(picturePopup)
);

//Сабмит формы добавления карточки
const popupAddCard = new PopupWithForm('.popup_new_place', (data) => {
	popupAddCard.renderLoading(true)
	api.addImage(data.name,data.link, data.ownerId, data.likes)
	.then(res => {
		const card = createCard({
			name: data.name,
			imgLink: data.link,
        	likes: res.likes,
			id: res._id,
        	userId: userId,
			ownerId: res.owner._id
			
		})
		cardsList.addItemPrepend(card);
		card.blockCard();
		newCardForm.reset();
	  popupAddCard.close();
	  })
	  .catch((err) => {
		console.log(err);
	  })
	});
	
// Слушатель на открытие popup по кнопке добавления карточки
	newCardButton.addEventListener('click', () => {
		formAddCardValidator.resetValidation();
		event.preventDefault();
		resetNewCardInputs();
		popupAddCard.open();
	
	});
	
newCardCloseButton.addEventListener('click', () => {
	closePopup(newCardPopupNode);
});

 //открываем форму редактирования аватара
avatarPopupButton.addEventListener('click', () => {
	 editAvatarValidator.resetValidation(); 
	popupEditAvatar.open();
  }) 

//сабмитим форму редктирования профиля

const popupEditProfile = new PopupWithForm('.popup_edit_profile', (data) => {
	 popupEditProfile.renderLoading(true)
	const {name, about} = data
	api.editProfile(name, about)
	.then(res => {
	  dataUserInfo.setUserInfo(name, about);
	  popupEditProfile.close()
	})
	.catch((err) => {
	  console.log(err);
	})
	.finally(() => popupEditProfile.renderLoading(false))
  });

// Слушатель на открытие popup по кнопке редактирования
  profileEditingButton.addEventListener('click', () => {
	formProfileValidator.resetValidation();
	const userData = dataUserInfo.getUserInfo();
  
	nameInput.value = userData.name;
	jobInput.value = userData.about;

	popupEditProfile.open();
  });
//reset
function resetNewCardInputs() {
	cardNameAddingInput.value = '';
	cardLinkAddingInput.value = '';
}

//слушатели для закрытия попапов
popupImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupConfirmation.setEventListeners();
popupEditAvatar.setEventListeners();


