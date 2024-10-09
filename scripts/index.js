import {initialCards} from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const container = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(card) {

    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
    const newCard = createCard(card);
    container.appendChild(newCard);
});

