export const ValidateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  submitButtonInactiveClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorActiveClass: 'popup__error_active',
  errorSelectorPrefix: '.popup__error_',
  errors: {
    valueMissing: 'Вы пропустили это поле',
    tooShort: 'Слишком мало символов',
    typeMismatch: 'Введите url',
    default: 'Ошибка.'
  }
};

const showInputError = (formElement, inputElement, validity, settings) => {
  const { inputErrorClass, errorSelectorPrefix, errors, errorActiveClass } = settings;
  const errorElement = formElement.querySelector(`${errorSelectorPrefix}${inputElement.name}`);

  inputElement.classList.add(inputErrorClass);

  if (validity.valueMissing) {
    errorElement.textContent = errors.valueMissing;
  } else if (validity.tooShort) {
    errorElement.textContent = errors.tooShort;
  } else if (validity.typeMismatch) {
    errorElement.textContent = errors.typeMismatch;
  } else {
    errorElement.textContent = errors.default;
  }

  errorElement.classList.add(errorActiveClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const { inputErrorClass, errorActiveClass, errorSelectorPrefix } = settings;
  const errorElement = formElement.querySelector(`${errorSelectorPrefix}${inputElement.name}`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorActiveClass);
  errorElement.textContent = '';
};

const toggleButtonState = (formElement, settings) => {
  const { submitButtonSelector, submitButtonInactiveClass } = settings;
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const isFormValid = formElement.checkValidity();
  if (isFormValid) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(submitButtonInactiveClass);
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(submitButtonInactiveClass);
  }
};

const validateInput = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validity, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
  toggleButtonState(formElement, settings);
};

const setEventListeners = (formElement, settings) => {
  const { inputSelector } = settings;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement, settings);
    });
  });
};

export const enableValidation = (settings) => {
  const { formSelector } = settings;
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((formElement) => {
    setEventListeners(formElement, settings);
    toggleButtonState(formElement, settings);
  });
};
