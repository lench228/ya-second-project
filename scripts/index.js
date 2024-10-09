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


// @todo: Функция создания карточки
function createCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  return cardElement;
}

// Обработчики событий на попапы

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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
  closeButtonElement.addEventListener('click' ,() => closePopup(popup));
})


// Попап добавления карточки

editButtonElement.addEventListener('click', (e) => handleEditButtonClick(profileTitleElement.textContent, profileDescriptionElement.textContent, e.currentTarget));

createCardFormElement.addEventListener('submit', (e) => {handleCreateCardSubmit(e)})

function handleCreateCardSubmit(e) {
  e.preventDefault();
  const card = createCard({name: createCardFormName.value, link: createCardFormLink.value});
  container.appendChild(card);
  closePopup(Popups.cardPopup);
}

function handleCreateButtonClick(){
  createCardFormName.value = '';
  createCardFormLink.value = '';
  openModal(Popups.cardPopup);
}

createCardButton.addEventListener('click', (e) => handleCreateButtonClick())


// @todo: Функция удаления карточки

// Вывести карточки на страниц

initialCards.forEach((card) => {
  const newCard = createCard(card);
  container.appendChild(newCard);
});

