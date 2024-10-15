//  Функция создания карточки
import {deleteCard, deleteLike, putLike} from "../../api";

const CardSettings= {
  titleSelector: '.card__title',
  imageSelector: '.card__image',
  likeSelector: '.card__like_button',
  deleteSelector: '.card__delete-button',
  likeClass: 'card__like_button_is-active',
  cardSelector: '.card',
  counterSelector: '.card__like_counter'
}

const handleDeleteButtonClick = (e) => {
  deleteCard(e.currentTarget.closest(CardSettings.cardSelector).id)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })
}


const handleLikCardClick = (e, cardId, userId) => {
  const likeCardButton = e.currentTarget;
  const cardElement = document.getElementById(likeCardButton.closest(CardSettings.cardSelector).id);

  if(likeCardButton.classList.contains(CardSettings.likeClass)) {
    deleteLike(cardId)
      .then((res) => {
        updateLikes(cardElement, res, userId);
      })
      .catch((err) => {
        console.log(err)
      })
  }else{
    putLike(cardId)
      .then((res) => {
        updateLikes(cardElement, res, userId);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


const updateLikes = (cardElement, card, userId) =>  {

  const likeCardButton = cardElement.querySelector(CardSettings.likeSelector);
  const cardLikeCounter = cardElement.querySelector(CardSettings.counterSelector);

  cardLikeCounter.textContent = card.likes.length;
  const isLiked = card.likes.some((user) => {
    return user._id === userId;
  })
  isLiked ? likeCardButton.classList.add(CardSettings.likeClass): likeCardButton.classList.remove(CardSettings.likeClass);
}

function createLikes(cardElement, card, userId) {
  updateLikes(cardElement, card, userId);

  const likeCardButton = cardElement.querySelector(CardSettings.likeSelector);

  likeCardButton.addEventListener('click' ,(e) => handleLikCardClick(e, card._id, userId));
}

export const  createCard = (card, cardTemplate, handleCardImageClick, container, userId) => {

  const cardElement = cardTemplate.content.cloneNode(true);

  const cardRootElement = cardElement.firstElementChild;

  const cardImage = cardElement.querySelector(CardSettings.imageSelector);
  const cardTitle = cardElement.querySelector(CardSettings.titleSelector);

  cardImage.src = card.link;
  cardTitle.textContent = card.name;

  cardRootElement.setAttribute('id', card._id);

  cardImage.addEventListener('click', (e) => handleCardImageClick(card));


  const deleteCardButton = cardElement.querySelector(CardSettings.deleteSelector);

  if(card.owner._id !== userId){
    deleteCardButton.style.display = 'none';
  }else {
    deleteCardButton.addEventListener('click', (e) => handleDeleteButtonClick(e));
  }

  createLikes(cardElement, card, userId);

  return cardElement;
}

