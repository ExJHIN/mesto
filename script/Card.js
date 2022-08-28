

export class Card {
	constructor(data, clickHandlers) {
		this._name = data.name;
		this._isLiked = false;
		this._imgLink = data.imgLink;
		this._innerCardTemplateSelector = data.innerCardTemplateSelector;
		this._selectors = data.selectors;

		this._handleCardClick = clickHandlers.cardClick;
		this._handleDeleteClick = clickHandlers.deleteClick;
		this._handleLikeClick = clickHandlers.likeClick;

		this._node = null;
		this._likeButton = null;
		this._trashButton = null;
		this._img = null;

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

	dettach() {
		this._node.remove();
	}

	toggleLike() {
		this._likeButton.classList.toggle(this._selectors.likeButtonActive);
		this._isLiked = false;
	}

	_addListeners() {
		const img = this._node.querySelector(this._selectors.img);
		img.addEventListener('click', event => {
			if (event.target === this._trashButton || event.target === this._likeButton) {
				return;
			}

			this._handleCardClick(event);
		});

		
		this._trashButton.addEventListener('click', () => this._handleDeleteClick());
		this._likeButton.addEventListener('click', () => this._handleLikeClick());
	}

	_createNode() {
		this._node = this._cardTemplate
			.cloneNode(true)
			.querySelector(this._selectors.innerContent);

		this._img = this._node.querySelector(this._selectors.img);

		this._img.setAttribute('src', this._imgLink);
		this._img.setAttribute('alt', this._name);

		this._node.querySelector(this._selectors.title).textContent = this._name;

		
		this._trashButton = this._node.querySelector(this._selectors.trashButton);
		this._likeButton = this._node.querySelector(this._selectors.likeButton);
	}
}

