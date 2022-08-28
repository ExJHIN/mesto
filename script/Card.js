

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
		const likeButton = this._node.querySelector(this._selectors.likeButton);

		likeButton.classList.toggle(this._selectors.likeButtonActive);

		if (likeButton.classList.has(this._selectors.likeButtonActive)) {
			this._isLiked = true;

			return;
		}

		this._isLiked = false;
	}

	_addListeners() {
		this._node.addEventListener('click', event => {
			if (event.target === this._trashButton || event.target === this._likeButton) {
				return;
			}

			this._handleCardClick(event);
		});
		this._trashButton.addEventListener('click', this._handleDeleteClick);
		this._likeButton.addEventListener('click', this._handleLikeClick);
	}

	_createNode() {
		const node = this._cardTemplate
			.cloneNode(true)
			.querySelector(this._selectors.innerContent);

		const img = node.querySelector(this._selectors.img);

		img.setAttribute('src', this._imgLink);
		img.setAttribute('alt', this._name);

		node.querySelector(this._selectors.title).textContent = this._name;

		this._node = node;
		this._trashButton = this._node.querySelector(this._selectors.trashButton);
		this._likeButton = this._node.querySelector(this._selectors.likeButton);
	}
}

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