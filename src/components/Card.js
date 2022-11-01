export class Card {
	constructor(data, clickHandlers,handleCardClick,handleDeleteClick,userId) {
		
		this._name = data.name;
		this._imgLink = data.imgLink;
		this._innerCardTemplateSelector = data.innerCardTemplateSelector;
		this._selectors = data.selectors;
		this._handleCardClick = clickHandlers.cardClick;
		this._handleDeleteClick = clickHandlers.deleteClick;
		this._handleLikeClick = clickHandlers.likeClick;
		this._userId = data.userId;
		this._likes = data.likes;
		this._ownerId = data.ownerId;
		this._node = null;
		this._likeButton = null;
		this._trashButton = null;
		this._deleteButton = null;
		this._img = null;
		this._id = data.id;
		this._alt = 'На изображении ' + data.name;
		this._cardTemplate = document.querySelector(this._selectors.template).content;

		this._createNode();
		this._addListeners();
	}

	getData() {
		return {
			name: this._name,
			isLiked: this._isLiked
		}
	}

	getNode() {
		return this._node;
	}

	blockCard() {
		if(this._ownerId !== this._userId) {
			this._node.querySelector('.element__trash-btn').style.display = 'none'
		  } else{
			this._node.querySelector('.element__trash-btn').style.display = 'block'
		  }
	}
	dettach() {
		this._node.remove();
	}

	_fillLike = () => {
		this._likeButton = this._node.querySelector(this._selectors.likeButton);
		this._likeButton.classList.add(this._selectors.likeButtonActive);
	   }
	 
	   _deleteLike = () => {
		this._likeButton = this._node.querySelector(this._selectors.likeButton);
		 this._likeButton.classList.remove(this._selectors.likeButtonActive);
		}

	setLikes(newLikes) {
		this._likes = newLikes;
		const likeCounElement = this._node.querySelector('.element__like-count');
		likeCounElement.textContent = this._likes.length;
		
		  if(this.isLiked()) {
		  this._fillLike();
		} else {
		  this._deleteLike();
		} 
	  }
	_addListeners() {
		const img = this._node.querySelector(this._selectors.img);
		img.addEventListener('click', event => {
			if (event.target === this._trashButton || event.target === this._likeButton) {
				return;
			}
			this._handleCardClick(this._name,this._imgLink);
		});
		this._trashButton.addEventListener('click', () => this._handleDeleteClick(this._id)); 
		this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id)); //метод класса исп toggleLike
	}
	isLiked(){
		const userHasLikedCard = this._likes.find(user => user._id === this._userId);
		return userHasLikedCard;
	  }

	_createNode() {
		this._node = this._cardTemplate
			.cloneNode(true)
			.querySelector(this._selectors.innerContent);

		this._img = this._node.querySelector(this._selectors.img);
		this.setLikes(this._likes);
		this._img.setAttribute('src', this._imgLink);
		this._img.setAttribute('alt', this._name);

		this._node.querySelector(this._selectors.title).textContent = this._name;
		
		this._trashButton = this._node.querySelector(this._selectors.trashButton);
		this._likeButton = this._node.querySelector(this._selectors.likeButton); 
		
	}
}

