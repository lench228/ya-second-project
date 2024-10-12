import {initialCards} from './cards.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// Общие DOM узлы
const container = document.querySelector('.places__list');

// DOM Редактирование профиля

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

const editButtonElement = document.querySelector('.profile__edit-button');

const Popups = {
  profilePopup:  document.querySelector('.popup_type_edit'),
  cardPopup: document.querySelector('.popup_type_new-card'),
  imagePopup:  document.querySelector('.popup_type_image'),
}

const profileFormElement = Popups.profilePopup.querySelector('.popup__form');

const profileFormTitle = profileFormElement.elements['name'];
const profileFormDescription = profileFormElement.elements['description'];

// DOM Создание карточки
const createCardButton = document.querySelector('.profile__add-button');

const createCardFormElement = Popups.cardPopup.querySelector('.popup__form');

const createCardFormName = createCardFormElement.elements['place-name'];
const createCardFormLink = createCardFormElement.elements['link'];


// Просмотр карточки

const viewCardCaption = document.querySelector('.popup__caption');
const viewCardImage = document.querySelector('.popup__image');


function handleCardImageClick (card) {
  viewCardCaption.textContent = card.name;
  viewCardImage.src = card.link;
  openModal(Popups.imagePopup);
}

// Обработчики событий на попапы

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

//  Функция создания карточки
function createCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', (e) => handleCardImageClick(card));

  const likeCardButton = cardElement.querySelector('.card__like-button');
  const deleteCardButton = cardElement.querySelector('.card__delete-button');

  likeCardButton.addEventListener('click' ,() => likeCardButton.classList.toggle('card__like-button_is-active'));
  deleteCardButton.addEventListener('click', (e) => container.removeChild(e.currentTarget.closest('.card')));
  return cardElement;
}



//  Попап редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = profileFormTitle.value;
  profileDescriptionElement.textContent = profileFormDescription.value;

  closePopup(Popups.profilePopup);
}

function handleEditButtonClick(title, description, popup) {

  profileFormTitle.value = title;
  profileFormDescription.value = description;

  openModal(Popups.profilePopup);
}

editButtonElement.addEventListener('click', (e) => handleEditButtonClick(profileTitleElement.textContent, profileDescriptionElement.textContent, e.currentTarget));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

Object.values(Popups).forEach((popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');
  popup.classList.add('popup_is-animated');
  closeButtonElement.addEventListener('click' ,() => closePopup(popup));
})


// Попап добавления карточки

function handleCreateCardSubmit(e) {
  e.preventDefault();
  const card = createCard({name: createCardFormName.value, link: createCardFormLink.value});
  container.prepend(card);
  closePopup(Popups.cardPopup);
}

createCardFormElement.addEventListener('submit', (e) => {handleCreateCardSubmit(e)})

function handleCreateButtonClick(){
  createCardFormName.value = '';
  createCardFormLink.value = '';
  openModal(Popups.cardPopup);
}

createCardButton.addEventListener('click', (e) => handleCreateButtonClick())


// @todo: Функция удаления карточки

initialCards.forEach((card) => {
  const newCard = createCard(card);
  container.appendChild(newCard);
});


// ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__input_error');
  const error = formElement.querySelector(`.popup__error_${inputElement.name}`);
  error.textContent = errorMessage;
  error.classList.add('popup__error_active');
}

const hideInputError = (formElement, inputElement) =>{
  inputElement.classList.remove('popup__input_error');
  const error = formElement.querySelector(`.popup__error_${inputElement.name}`);
  error.classList.remove('popup__error_active');
}


const isValid = (formElement, inputElement) => {
  const button = formElement.querySelector('.popup__button');
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_inactive');
    console.log(button);
  } else {
    hideInputError(formElement, inputElement);
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_inactive');
  }
};

const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  console.log(formList);
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

