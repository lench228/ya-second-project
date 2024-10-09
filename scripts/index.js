import {initialCards} from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const container = document.querySelector('.places__list');


const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');


const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupEditCloseButtonElement = document.querySelector('.popup__close');


const Popups = {
     profilePopup: document.querySelector('.popup_type_edit'),
     cardPopup: document.querySelector('.popup_type_new-card'),
     imagePopup: document.querySelector('.popup_type_image'),
}

const profileFormElement = Popups.profilePopup.querySelector('.popup__form');

const profileFormTitle = profileFormElement.elements.name;
const profileFormDescription = profileFormElement.elements.description;


// @todo: Функция создания карточки
function createCard(card) {

    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    return cardElement;
}
// @todo: Обработчики событий на попапы

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// @todo: Попап редактирования профиля


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitleElement.textContent = profileFormTitle.value;
    profileDescriptionElement.textContent = profileFormDescription.value;

    closePopup(Popups.profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

function handleEditButtonClick(title, description, popup) {

    profileFormTitle.value = title;
    profileFormDescription.value = description;

    openModal(Popups.profilePopup);
}


popupEditButtonElement.addEventListener('click', (e) => handleEditButtonClick(profileTitleElement.textContent, profileDescriptionElement.textContent, e.currentTarget));
popupEditCloseButtonElement.addEventListener('click', () => closePopup(Popups.profilePopup));

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const newCard = createCard(card);
    container.appendChild(newCard);
});

