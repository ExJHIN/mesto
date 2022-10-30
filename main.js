(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=n,this._settings=e,this._inputList=Array.from(this._form.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._form.querySelector(this._settings.submitButtonSelector)}var n,r;return n=t,(r=[{key:"_showInputError",value:function(e,t){var n=this._settings.errorClass,r=this._form.querySelector(".".concat(e.id,"-error"));r.textContent=t,r.classList.add(n)}},{key:"_hideInputError",value:function(e){var t=this._settings.errorClass,n=this._form.querySelector(".".concat(e.id,"-error"));n.classList.remove(t),n.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.setAttribute("disabled",!0),this._buttonElement.classList.remove(this._settings.buttonValid),this._buttonElement.classList.add(this._settings.buttonInvalid)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._settings.buttonInvalid),this._buttonElement.classList.add(this._settings.buttonValid))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._buttonElement.setAttribute("disabled",!0),this._buttonElement.classList.remove("popup__button-valid"),this._buttonElement.classList.add("popup__button-invalid"),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._isLiked=!1,this._imgLink=t.imgLink,this._innerCardTemplateSelector=t.innerCardTemplateSelector,this._selectors=t.selectors,this._handleCardClick=n.cardClick,this._handleDeleteClick=n.deleteClick,this._handleLikeClick=n.likeClick,this._userId=t.userId,this._node=null,this._likeButton=null,this._trashButton=null,this._img=null,this._alt="На изображении "+t.name,this._cardTemplate=document.querySelector(this._selectors.template).content,this._createNode(),this._addListeners()}var t,r;return t=e,(r=[{key:"getData",value:function(){return{name:this._name,isLiked:this._isLiked}}},{key:"getNode",value:function(){return this._node}},{key:"dettach",value:function(){this._node.remove()}},{key:"toggleLike",value:function(){this._likeButton.classList.toggle(this._selectors.likeButtonActive),this._isLiked=!1}},{key:"_addListeners",value:function(){var e=this;this._node.querySelector(this._selectors.img).addEventListener("click",(function(t){t.target!==e._trashButton&&t.target!==e._likeButton&&e._handleCardClick(e._name,e._imgLink)})),this._trashButton.addEventListener("click",(function(){return e._handleDeleteClick()})),this._likeButton.addEventListener("click",(function(){return e._handleLikeClick()}))}},{key:"_createNode",value:function(){this._node=this._cardTemplate.cloneNode(!0).querySelector(this._selectors.innerContent),this._img=this._node.querySelector(this._selectors.img),this._img.setAttribute("src",this._imgLink),this._img.setAttribute("alt",this._name),this._node.querySelector(this._selectors.title).textContent=this._name,this._trashButton=this._node.querySelector(this._selectors.trashButton),this._likeButton=this._node.querySelector(this._selectors.likeButton)}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),o={formSelector:".form_one",inputSelector:".form__input",submitButtonSelector:".form__save",inactiveButtonClass:"popup__button-invalid",errorClass:"popup__error_visible",buttonValid:"popup__button-valid",buttonInvalid:"popup__button-invalid"},i=document.querySelector(".popup_edit_profile"),a=document.querySelector(".popup_new_place"),s=(document.querySelector(".elements"),document.querySelector(".popup_open_popup")),u=s.querySelector(".popup__picture"),c=s.querySelector(".popup__description"),l=s.querySelector(".popup__close"),f=(document.querySelector(".profile__avatar-image"),document.querySelector(".profile__title"),document.querySelector(".profile__description"),document.querySelector(".profile__edit-button")),p=document.querySelector(".profile__add-button"),h=i.querySelector(".form_one"),d=a.querySelector(".form_two"),_=i.querySelector(".form__input_text_name"),y=i.querySelector(".form__input_text_descr"),m=a.querySelector(".form__input_text_name"),v=(i.querySelector(".popup__close"),a.querySelector(".popup__close")),b=(d.querySelector(".form__save"),Array.from(document.querySelectorAll(".form")),document.querySelector(".element__img"),a.querySelector(".form__input_text_link"));function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var k=function(){function e(t,n){var r=t.elements,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._renderer=o,this._elements=r}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._elements.forEach((function(t){e.addItem(e._renderer(t))}))}},{key:"addItemPrepend",value:function(e){this._container.prepend(e.getNode())}},{key:"addItemAppend",value:function(e){this._container.append(e)}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close"))&&e.close()}))}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=P(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},L.apply(this,arguments)}function P(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function C(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._fullPictureImage=t._popup,t._place=document.querySelector(".popup__figure"),t._fullPictureTitle=t._place.querySelector(".popup__description"),t}return t=a,(n=[{key:"open",value:function(){L(q(a.prototype),"open",this).call(this)}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(w);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var A=function(){function e(t){var n=t.nameSelector,r=t.jobSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=document.querySelector(n),this._profileJob=document.querySelector(r),this._avatarSelector=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._profileName.textContent,about:this._profileJob.textContent}}},{key:"setUserInfo",value:function(e,t){this._profileName.textContent=e,this._profileJob.textContent=t}},{key:"setAvatarInfo",value:function(e){this._avatarSelector.src=e}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=U(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},R.apply(this,arguments)}function U(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=D(e)););return e}function N(e,t){return N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},N(e,t)}function V(e,t){if(t&&("object"===T(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}var J=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&N(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(r);if(o){var n=D(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return V(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitForm=t,n._submitButton=n._popup.querySelector(".popup__submit-button"),n._form=n._popup,n._formProfile=n._popup.querySelector("form"),n._inputList=n._form.querySelectorAll(".form__input"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;R(D(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._submitForm(e._getInputValues())}))}},{key:"close",value:function(){R(D(a.prototype),"close",this).call(this),this._formProfile.reset()}}])&&x(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(w);function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var F,H=new(function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._headers=r,this._baseUrl=n}var t,n;return t=e,(n=[{key:"getInfo",value:function(){return Promise.all([this.getInitialCards(),this.getProfile()])}},{key:"getProfile",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"editProfile",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"addImage",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}},{key:"editAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).catch(console.log)}}])&&z(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-52",headers:{authorization:"1a9c818d-8c80-4566-ac65-ebfe34375ff2","Content-Type":"application/json"}});function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Y=new k({elements:[],renderer:W},".elements"),$=new A({nameSelector:".profile__title",jobSelector:".profile__description",avatarSelector:".profile__avatar-image"});H.getInfo().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];F=i._id,$.setUserInfo(i.name,i.about),$.setAvatarInfo(i.avatar),o.forEach((function(e){var t=W({place:e.name,link:e.link,likes:e.likes,id:e._id,userId:F,ownerId:e.owner._id});Y.addItemAppend(t)}))})).catch((function(e){console.log(e)}));var G=new I(".popup_open_popup"),K=new t(o,h),Q=new t(o,d);function W(e){var t=e.name,n=e.imgLink,o=new r({name:t,imgLink:n,selectors:{template:"#cardNode",innerContent:".element",trashButton:".element__trash-btn",img:".element__img",title:".element__title",likeButton:".element__like-btn",likeButtonActive:"element__like-btn_active"}},{cardClick:function(e,t){G.open(),u.src=t,c.textContent=e,u.alt=e},deleteClick:function(){o.dettach()},likeClick:function(){o.toggleLike()}});return Y.addItemAppend(o.getNode()),o}K.enableValidation(),Q.enableValidation(),[{name:"Ясуо",imgLink:"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt0ea8d48e2a085006/5f0e41e6f7f785077f5d8e6d/SB_Yasuo.jpg"},{name:"Джин",imgLink:"https://phonoteka.org/uploads/posts/2021-07/1625656125_21-phonoteka-org-p-dzhin-lol-art-krasivo-21.jpg"},{name:"Ирелия",imgLink:"https://kartinkin.net/uploads/posts/2022-01/1641926577_4-kartinkin-net-p-liga-legend-ireliya-art-krasivo-4.jpg"},{name:"Афелий",imgLink:"https://img5.goodfon.ru/original/2880x1800/2/80/lol-liga-legend-league-of-legends-igra-game-afelii-lol.jpg"},{name:"Экко",imgLink:"https://i.pinimg.com/originals/e6/a1/9b/e6a19bcd897a5ff5aa79cfbfdd65e44f.jpg"},{name:"Сенна",imgLink:"https://img.championat.com/news/big/f/v/pered-finalom-chm-po-league-of-legends-vystupit-nov_15724345732020490787.jpg"}].forEach((function(e){W(e)})),l.addEventListener("click",(function(){return closePopup(s)}));var X=new J(".popup_new_place",(function(e,t){var n=W({name:m.value,imgLink:b.value});Y.addItemPrepend(n),d.reset(),X.close()}));p.addEventListener("click",(function(){Q.resetValidation(),event.preventDefault(),m.value="",b.value="",X.open()})),v.addEventListener("click",(function(){closePopup(a)}));var Z=new J(".popup_edit_profile",(function(e){var t=e.name,n=e.about;H.editProfile(t,n).then((function(e){$.setUserInfo(t,n),Z.close()})).catch((function(e){console.log(e)}))}));f.addEventListener("click",(function(){K.resetValidation();var e=$.getUserInfo();_.value=e.name,y.value=e.about,Z.open()})),G.setEventListeners(),Z.setEventListeners(),X.setEventListeners()})();