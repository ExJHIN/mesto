const formVal = {
    buttonValid: 'popup__button-valid',
    buttonInvalid:'popup__button-invalid',
	button: '.form__save',
	form: '.form',
	disabled: 'disabled'
}



const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = errorMessage;
	
};
// Зачтите пожалуйста :)
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);

	} else {
		hideInputError(formElement, inputElement);

	}

};



function handleFormSubmit (event, config, buttonElement) {
	const formElement = event.currentTarget;
	const isValid = formElement.checkValidity();


	if (isValid) {
		buttonElement.removeAttribute(config.disabled);
	/* 	buttonElement.classList.remove('popup__button-invalid');
		buttonElement.classList.add('popup__button-valid'); */
		buttonElement.classList.remove(config.buttonInvalid);
		buttonElement.classList.add(config.buttonValid);


	} else {
		buttonElement.setAttribute(config.disabled, true);
		buttonElement.classList.remove(config.buttonValid);
		buttonElement.classList.add(config.buttonInvalid);
	}





}





const toggleButtonState = (formElement, buttonElement,config) => {
	formElement.addEventListener('input', (event) => handleFormSubmit(event, config, buttonElement));
	
}

















const setEventListeners = (formElement,config) => {
	const buttonElement = formElement.querySelector('.form__save');
	toggleButtonState(formElement, buttonElement,config);
	formElement.addEventListener('submit', function (evt) {
		evt.preventDefault();
		toggleButtonState(formElement, buttonElement,config);
	});
	formElement.addEventListener('input', function (evt) {
		const inputElement = evt.target;
		checkInputValidity(formElement, inputElement);
		toggleButtonState(formElement, buttonElement,config);
	});

}

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.form));
	formList.forEach((formElement) => {
		setEventListeners(formElement,config);
	});

};
