import './pages/index.css';

import { enableValidation, ValidateSettings } from "./components/validate";
import { createCard } from "./components/card";
import { closePopup, openModal } from "./components/modal";
import { profilePopup, setUpUser } from "./components/profile";
import { getCards, postCard } from "./api/api";
import { avatarPopup, initAddAvatar } from "./components/add-avatar";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// Общие DOM узлы
const container = document.querySelector('.places__list');

const Popups = {
  profilePopup: profilePopup,
  cardPopup: document.querySelector('.popup_type_new-card'),
  imagePopup: document.querySelector('.popup_type_image'),
  avatarPopup: avatarPopup,
}

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

// Обработчик отправки карточки
const handleCreateCardSubmit = (e, userId) => {
  e.preventDefault();
  const form = e.currentTarget;
  const submitButton = form.querySelector('.button');

  toggleButtonState(submitButton, 'Сохранение...', true);

  postCard(form.elements['name'], form.elements['link'])
    .then((card) => {
      const cardElement = createCard(card, cardTemplate, handleCardImageClick, container, userId);
      container.prepend(cardElement);
      closePopup(Popups.cardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      toggleButtonState(submitButton, 'Сохранить', false);
    });
}

// Функция для управления состоянием кнопки
const toggleButtonState = (button, text, isDisabled) => {
  button.textContent = text;
  button.disabled = isDisabled;
}

// Кнопка создания карточки
const handleCreateButtonClick = () => {
  createCardFormName.value = '';
  createCardFormLink.value = '';
  openModal(Popups.cardPopup);
}

const initPopup = (popup) => {
  const closeButtonElement = popup.querySelector('.popup__close');
  popup.classList.add('popup_is-animated');
  closeButtonElement.addEventListener('click', () => closePopup(popup));
}

const createDomCard = (card, userId) => {
  const newCard = createCard(card, cardTemplate, handleCardImageClick, container, userId);
  container.appendChild(newCard);
}

// Инициализация
const init = () => {
  let userId = '';

  // Инициализация попапов
  Object.values(Popups).forEach(initPopup);

  // Получение данных пользователя и карточек
  Promise.all([setUpUser(), getCards()])
    .then(([user, cards]) => {
      userId = user._id;
      cards.forEach(card => createDomCard(card, userId));
    })
    .catch(err => console.error(err));

  enableValidation(ValidateSettings);
  initAddAvatar();

  createCardFormElement.addEventListener('submit', (e) => handleCreateCardSubmit(e, userId));
  createCardButton.addEventListener('click', handleCreateButtonClick);
}

// Запуск инициализации
init();
