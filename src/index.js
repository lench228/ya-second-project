import {initialCards} from './mock/mock-cards.js';
import './pages/index.css';

import {enableValidation, ValidateSettings} from "./components/validate";
import {createCard} from "./components/card";
import {closePopup, openModal} from "./components/modal";

enableValidation(ValidateSettings);
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


const handleCardImageClick = (card) =>  {
  viewCardCaption.textContent = card.name;
  viewCardImage.src = card.link;
  openModal(Popups.imagePopup);
}

//  Попап редактирования профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitleElement.textContent = profileFormTitle.value;
  profileDescriptionElement.textContent = profileFormDescription.value;

  closePopup(Popups.profilePopup);
}

const handleEditButtonClick = (title, description) => {
  profileFormTitle.value = title;
  profileFormDescription.value = description;
  openModal(Popups.profilePopup);
}

editButtonElement.addEventListener('click', (e) => handleEditButtonClick(profileTitleElement.textContent, profileDescriptionElement.textContent));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);




// Создание карточки

const handleCreateCardSubmit = (e) => {
  e.preventDefault();
  const card = createCard({name: createCardFormName.value, link: createCardFormLink.value}, cardTemplate, handleCardImageClick, container);
  container.prepend(card);
  closePopup(Popups.cardPopup);
}

createCardFormElement.addEventListener('submit', (e) => {handleCreateCardSubmit(e)})

// Кнопка создания карточки

const handleCreateButtonClick = () =>{
  createCardFormName.value = '';
  createCardFormLink.value = '';
  openModal(Popups.cardPopup);
}

createCardButton.addEventListener('click', (e) => handleCreateButtonClick())

// Инициация попапов

Object.values(Popups).forEach((popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');
  popup.classList.add('popup_is-animated');
  closeButtonElement.addEventListener('click' ,() => closePopup(popup));
})

// init cards

initialCards.forEach((card) => {
  const newCard = createCard(card, cardTemplate, handleCardImageClick, container);
  container.appendChild(newCard);
});

