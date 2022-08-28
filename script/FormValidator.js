export class FormValidator {
	constructor(settings, form) {
		this._form = form;
		this._settings = settings;
		this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
		this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
	}

	// метод, который показывает класс с ошибкой
	_showInputError(inputElement, errorMessage) {
		const { errorClass } = this._settings;
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

		errorElement.textContent = errorMessage;
		errorElement.classList.add(errorClass);
	};

	//метод, который удаляет класс с ошибкой
	_hideInputError(inputElement) {
		const { errorClass } = this._settings;
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

		errorElement.classList.remove(errorClass);
		errorElement.textContent = '';
	};

	//метод, который проверяет валидность поля
	_isValid(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);

			return;
		}

		this._hideInputError(inputElement);
	};

	//метод принимает массив полей и проходит по нему, оценивая валидность
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	};

	// метод который меняет состояние кнопки в зависимости от валидности
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.setAttribute('disabled', true);
			this._buttonElement.classList.remove(this._settings.buttonValid);
			this._buttonElement.classList.add(this._settings.buttonInvalid);
			

		} else {
			this._buttonElement.removeAttribute('disabled');
			this._buttonElement.classList.remove(this._settings.buttonInvalid);
			this._buttonElement.classList.add(this._settings.buttonValid);
		}
	};

	//метод, который устанавливает обработчики
	_setEventListeners() {
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._isValid(inputElement);
				this._toggleButtonState();
			});
		});
	};

	//метод, который включает валидацию формы
	enableValidation() {
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		this._setEventListeners();
	};

	//метод очищающий ошибки и управляющий кнопкой
	resetValidation() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement)
		});
	}
};
