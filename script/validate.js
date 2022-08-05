
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('form__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);

	} else {
		hideInputError(formElement, inputElement);

	}

};









const toggleButtonState = (formElement, buttonElement) => {
	formElement.addEventListener('input', (event) => {
		const formElement = event.currentTarget;
		const isValid = formElement.checkValidity();


		if (isValid) {
			buttonElement.removeAttribute('disabled');
			buttonElement.classList.remove('popup__button-invalid');
			buttonElement.classList.add('popup__button-valid');


		} else {
			buttonElement.setAttribute('disabled', true);
			buttonElement.classList.remove('popup__button-valid');
			buttonElement.classList.add('popup__button-invalid');
		}





	}
	)
}

















const setEventListeners = (formElement) => {
	const buttonElement = formElement.querySelector('.form__save');
	toggleButtonState(formElement, buttonElement);
	formElement.addEventListener('submit', function (evt) {
		evt.preventDefault();
		toggleButtonState(formElement, buttonElement);
	});
	formElement.addEventListener('input', function (evt) {
		const inputElement = evt.target;
		checkInputValidity(formElement, inputElement);
		toggleButtonState(formElement, buttonElement);
	});

}

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElement) => {
		setEventListeners(formElement);
	});

};