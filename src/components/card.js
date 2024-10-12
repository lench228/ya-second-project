//  Функция создания карточки
const CardSettings= {
  titleSelector: '.card__title',
  imageSelector: '.card__image',
  likeSelector: '.card__like-button',
  deleteSelector: '.card__delete-button',
  likeClass: 'card__like-button_is-active',
  cardSelector: '.card',
}


export const createCard = (card, cardTemplate, handleCardImageClick, container) => {

  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(CardSettings.imageSelector);
  const cardTitle = cardElement.querySelector(CardSettings.titleSelector);
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.addEventListener('click', (e) => handleCardImageClick(card));

  const likeCardButton = cardElement.querySelector(CardSettings.likeSelector);
  const deleteCardButton = cardElement.querySelector(CardSettings.deleteSelector);

  likeCardButton.addEventListener('click' ,() => likeCardButton.classList.toggle(CardSettings.likeClass));
  deleteCardButton.addEventListener('click', (e) => container.removeChild(e.currentTarget.closest(CardSettings.cardSelector)));
  return cardElement;
}

