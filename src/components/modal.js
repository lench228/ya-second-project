const popupOpenClass = 'popup_is-opened'

export const openModal = (popup) => {
  document.body.addEventListener('keydown', closeByEsc);
  popup.classList.add(popupOpenClass);
}

export const closePopup = (popup) =>  {
  document.body.removeEventListener('keydown', closeByEsc);
  popup.classList.remove(popupOpenClass);
}


const handleBodyClick = (e) => {
  if(e.target.classList.contains(popupOpenClass)) {
    e.target.classList.remove(popupOpenClass);
  }
}

document.body.addEventListener('click', (e) => handleBodyClick(e));

const closeByEsc = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.' + popupOpenClass);
    closePopup(openedPopup);
  }
}
