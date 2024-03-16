import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { deleteCard, createCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserProfile,
  addNewCard,
  updateUserAvatar,
} from "./components/api.js";

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileAvatarPopup = document.querySelector(
  ".popup_type_avatar-edit"
);

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const editProfileAvatarButton = document.querySelector(".profile__image");

const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

const buttonClosePopupProfile = editPopup.querySelector(".popup__close");
const buttonClosePopupAdd = addPopup.querySelector(".popup__close");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const buttonClosePopupAvatar =
  editProfileAvatarPopup.querySelector(".popup__close");

// попап редактирование профиля
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
  clearValidation(editPopup, validationObj);
});
buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(editPopup);
});

// попап добавление новых карточек
addButton.addEventListener("click", function () {
  openPopup(addPopup);
  clearValidation(addPopup, validationObj);
});
buttonClosePopupAdd.addEventListener("click", function () {
  closePopup(addPopup);
});

// попап смена аватарки
editProfileAvatarButton.addEventListener("click", function () {
  openPopup(editProfileAvatarPopup);
  clearValidation(editProfileAvatarPopup, validationObj);
});
buttonClosePopupAvatar.addEventListener("click", function () {
  closePopup(editProfileAvatarPopup);
});

// открытие изображения карточки
function openImage(cardData) {
  // заполняем изображение и описание в модальном окне данными из карточки
  image.src = cardData.link;
  image.alt = cardData.name;
  caption.textContent = cardData.name;
  openPopup(imagePopup);
}
buttonClosePopupImage.addEventListener("click", function () {
  closePopup(imagePopup);
});

// Редактирование имени и информации о себе
// Находим форму в DOM
const formPopupEdit = document.querySelector(".popup_type_edit");
// Находим поля формы в DOM
const nameInput = formPopupEdit.querySelector(".popup__input_type_name");
const jobInput = formPopupEdit.querySelector(".popup__input_type_description");

// Объявляем переменную для хранения состояния загрузки
let isLoading = false;

function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  // Устанавливаем флаг isLoading в true, чтобы отобразить состояние загрузки
  isLoading = true;
  renderLoading(true);
  // отмена стандартной отправки формы
  const updatedProfileData = {
    name: nameInput.value,
    about: jobInput.value,
  };
  updateUserProfile(updatedProfileData)
    .then((updatedData) => {
      // обновляем текстовые элементы
      profileName.textContent = updatedProfileData.name;
      profileDescription.textContent = updatedProfileData.about;
      closePopup(editPopup);
      console.log("Данные профиля успешно обновлены:", updatedData);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении данных профиля:", error);
    })
    .finally(() => {
      // После завершения запроса с сервера сбрасываем флаг isLoading и обновляем состояние кнопки
      isLoading = false;
      renderLoading(false);
    });
}

// Функция для отображения состояния загрузки
function renderLoading(isLoading) {
  const saveButton = editPopup.querySelector(".popup__button");
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
    saveButton.setAttribute("disabled", true);
  } else {
    saveButton.textContent = "Сохранить";
    saveButton.removeAttribute("disabled");
  }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopupEdit.addEventListener("submit", handleSubmitProfileForm);

// добавление новой карточки
// находим поля формы в DOM
const placeNameInput = addPopup.querySelector(".popup__input_type_card-name");
const linkInput = addPopup.querySelector(".popup__input_type_url");

// обработчик отправки формы для добавления карточки
function handleSubmitAddForm(evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  addNewCard(placeNameValue, linkValue)
    .then((updatedData) => {
      // создание новуй карточки и добавление её в начало
      const newCard = createCard(
        updatedData,
        deleteCard,
        openImage,
        likeCard,
        true
      );
      placesList.prepend(newCard);

      // очищаем форму
      placeNameInput.value = "";
      linkInput.value = "";
      closePopup(addPopup);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении данных профиля:", error);
    });
}

// прикрепляем обработчик к форме добавления карточки
addPopup.addEventListener("submit", handleSubmitAddForm);

////////////// VALIDATION ////////////////////

const validationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationObj);

Promise.all([getUserInfo(), getCards()])
  .then((results) => {
    const [userData, cardsData] = results;
    // Обновляем профиль пользователя
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    editProfileAvatarButton.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      // Создание и добавление карточки на страницу
      const isOwner = cardData.owner._id === userData._id;
      const newCard = createCard(
        cardData,
        deleteCard,
        openImage,
        likeCard,
        isOwner
      );
      placesList.appendChild(newCard);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// смена аватарки профиля
function handleEditUserAvatar(evt) {
  evt.preventDefault();
  const avatarUrlInput = editProfileAvatarPopup.querySelector(
    ".popup__input_type_edit-avatar"
  );
  const avatarUrl = avatarUrlInput.form.link.value;
  updateUserAvatar(avatarUrl)
    .then((data) => {
      // В случае успешного изменения аватара, обновляем его на странице и закрываем форму
      editProfileAvatarButton.style.backgroundImage = `url(${data.avatar})`;
      console.log(editProfileAvatarButton.style.backgroundImage);
      closePopup(editProfileAvatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    });
}

editProfileAvatarPopup.addEventListener("submit", handleEditUserAvatar);