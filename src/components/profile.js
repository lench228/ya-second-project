import {getUser, patchUser} from "../api/api";
import {closePopup, openModal} from "./modal";

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileImageElement = document.querySelector('.profile__image');

const editButtonElement = document.querySelector('.profile__edit-button');

export const profilePopup =  document.querySelector('.popup_type_edit');

const profileFormElement = profilePopup.querySelector('.popup__form');

const profileFormTitle = profileFormElement.elements['name'];
const profileFormDescription = profileFormElement.elements['description'];

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const submitButton = form.querySelector('.button');

  submitButton.textContent = 'Сохранение...'
  submitButton.disabled = true;

  patchUser(profileFormTitle.value, profileFormDescription.value)
    .then((res) => {
        const {name, about, avatar} = res;
        updateUser(name, about, avatar);
    })
    .catch((err) =>{
      console.log(err)
    })
    .finally(()=>{
      submitButton.disabled = false;
      submitButton.textContent = 'Сохранить';
    })

  closePopup(profilePopup);
}

const handleEditButtonClick = (title, description) => {
  profileFormTitle.value = title;
  profileFormDescription.value = description;
  openModal(profilePopup);
}

const updateUser = (name, about, avatar) => {
  profileTitleElement.textContent = name;
  profileDescriptionElement.textContent = about;
  profileImageElement.style.backgroundImage = `url(${avatar})`;
}


export const setUpUser =
  getUser()
    .then((user) => {
      updateUser(user.name, user.about, user.avatar);
      return user;
    })
    .catch(error => {
      profileTitleElement.textContent = error;
      profileDescriptionElement.textContent = '';
      profileImageElement.style.backgroundImage = '';
    })


editButtonElement.addEventListener('click', () => handleEditButtonClick(profileTitleElement.textContent, profileDescriptionElement.textContent));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
