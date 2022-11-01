import './styles/index.css'; 
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './utils/constants.js';
import { enableValidationProfile , elements } from './utils/constants.js';
import { Section } from './Section.js';
import { PopupDelete } from './PopupDelete.js';
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithForm} from './PopupWithForm.js';
import {profileEditPopupNode, enableAvatar,newAvatarForm, enableValidationAddCard,editAvatarForm,avatarPopupButton, newCardPopupNode,   submitDeleteButton, cardsContainerNode, KEYCODE_ESC, picturePopup, picturePopupImage, picturePopupDescription, picturePopupCloseButton, profileName, profileDescription, profileEditingButton, newCardButton, profileForm,newCardForm, jobInput,  nameInput, cardNameAddingInput, profileCloseButton,newCardCloseButton ,buttonElement, formList, element, cardLinkAddingInput,avatarSelector} from './utils/constants.js';
import {api} from './Api.js';
import { data } from 'autoprefixer';

let userId;





//Генерация контейнера





  api.getInfo()
  .then(([elements, res]) => {
    userId = res._id
    dataUserInfo.setUserInfo(res.name, res.about,)
    dataUserInfo.setAvatarInfo(res.avatar);
	

    elements.forEach((data) => {
      const card = createCard({
        name: data.name,
        imgLink: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      cardsList.addItemAppend(card.getNode());
    })
  })
  .catch((err) => {
    console.log(err);
  });

  const dataUserInfo = new UserInfo ({
	nameSelector: '.profile__title',
	jobSelector: '.profile__description',
	avatarSelector: '.profile__avatar-image'
  });

  const cardsList = new Section({
	elements: elements,
	renderer: createCard
  },'.elements');
const popupImage = new PopupWithImage('.popup_open_popup');
const deletePopup = new PopupDelete('.popup_delete');

const editAvatarPopup = new PopupWithForm('.popup_change-avatar', (data) => {
	const {avatar} = data
	 editAvatarPopup.renderLoading(true); 
	api.editAvatar(avatar)
	.then(res => {
	  dataUserInfo.setAvatarInfo(avatar);
	  editAvatarPopup.close();
	})
	.catch((err) => {
	  console.log(err);
	})
	.finally(() => editAvatarPopup.renderLoading(false))
  })
// Вызов валидации
const formProfileValidator = new FormValidator(enableValidationProfile, profileForm);
const formAddCardValidator = new FormValidator(enableValidationProfile, newCardForm);
 const editAvatarValidator = new FormValidator(enableValidationAddCard, newAvatarForm); 
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
 editAvatarValidator.enableValidation(); 
//Функция создания карточки

 function createCard({ name, imgLink,id,data, userId,ownerId,likes},) {
	
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
			
			popupImage.open(name, imgLink);
			picturePopupImage.src = imgLink;

			picturePopupDescription.textContent = name;

			picturePopupImage.alt = name;


		},
		deleteClick: (id) => {
			deletePopup.open();
			deletePopup.changeSubmitHandler(() => {
				api.deleteCard(id)
				.then(res => {
				card.dettach(); 
				  deletePopup.close();
				  
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
const addCardPopup = new PopupWithForm('.popup_new_place', (data) => {
	addCardPopup.renderLoading(true)
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
	  addCardPopup.close();
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
		addCardPopup.open();
	
	});
	




newCardCloseButton.addEventListener('click', () => {
	closePopup(newCardPopupNode);
});


 //открываем форму редактирования аватара
avatarPopupButton.addEventListener('click', () => {
	 editAvatarValidator.resetValidation(); 
	editAvatarPopup.open();
  }) 



//сабмитим форму редктирования профиля


const editProfilePopup = new PopupWithForm('.popup_edit_profile', (data) => {
	 editProfilePopup.renderLoading(true)
	const {name, about} = data
	api.editProfile(name, about)
	.then(res => {
	  dataUserInfo.setUserInfo(name, about);
	  editProfilePopup.close()
	})
	.catch((err) => {
	  console.log(err);
	})
	.finally(() => editProfilePopup.renderLoading(false))
  });





// Слушатель на открытие popup по кнопке редактирования
  profileEditingButton.addEventListener('click', () => {
	formProfileValidator.resetValidation();
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
deletePopup.setEventListeners();
editAvatarPopup.setEventListeners();


