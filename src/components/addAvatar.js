import {patchAvatar} from "../../api";
import {openModal} from "./modal";

export const avatarPopup = document.querySelector('.popup_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const addAvatarFormElement = avatarPopup.querySelector('.popup__form');


const handleAddImageSubmit = (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const submitButton = form.querySelector('.button');

  submitButton.textContent = 'Сохранение...'
  submitButton.disabled = true;


  patchAvatar(form.elements['avatar-link'].value)
    .then((card) => {
      profileAvatar.style.backgroundImage = 'url(' + card.avatar + ')';
    })
    .catch((err) =>{
      console.log(err)
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    })
}

const handleProfileAvatarClick = () => {
  openModal(avatarPopup);
};

export const initAddAvatar = () => {
  profileAvatar.addEventListener('click', (e) => handleProfileAvatarClick(e))
  addAvatarFormElement.addEventListener('submit', (e) => {handleAddImageSubmit(e)});

}
