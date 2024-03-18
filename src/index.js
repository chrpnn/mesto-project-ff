import "./pages/index.css";
import { openPopup, closePopup } from "./components/modal.js";
import { deleteCard, createCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserProfile,
  addNewCard,
  updateUserAvatar,
} from "./components/api.js";


// Получение DOM элементов
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const buttonOpenPopupAvatar = document.querySelector(".popup_type_avatar-edit");
const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__image");
const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close");
const buttonClosePopupAdd = addPopup.querySelector(".popup__close");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const buttonClosePopupAvatar = buttonOpenPopupAvatar.querySelector(".popup__close");

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
buttonEditAvatar.addEventListener("click", function () {
  openPopup(buttonOpenPopupAvatar);
  clearValidation(buttonOpenPopupAvatar, validationObj);
});
buttonClosePopupAvatar.addEventListener("click", function () {
  closePopup(buttonOpenPopupAvatar);
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

// редактирование имени и информации о себе, находим форму и поля формы для редактирования профиля
const formEditPopup = document.querySelector(".popup_type_edit");
const nameInput = formEditPopup.querySelector(".popup__input_type_name");
const jobInput = formEditPopup.querySelector(".popup__input_type_description");

// функция для отображения состояния загрузки
function renderLoading(button, buttonText) {
  button.textContent = buttonText;
  button.disabled = ( buttonText === "Сохранение..." );
}

// функция для обработки события отправки формы редактирования профиля
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  // isLoading = true;
  renderLoading(editPopup.querySelector(".popup__button"), "Сохранение...");
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
      renderLoading(editPopup.querySelector(".popup__button"), "Сохранить");
    });
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditPopup.addEventListener("submit", handleSubmitProfileForm);

// добавление новой карточки, находим поля формы в DOM
const inputPlaceName = addPopup.querySelector(".popup__input_type_card-name");
const linkInput = addPopup.querySelector(".popup__input_type_url");

// обработчик отправки формы для добавления карточки
function handleSubmitAddForm(evt) {
  evt.preventDefault();
  renderLoading(addPopup.querySelector(".popup__button"), "Сохранение...");
  const placeNameValue = inputPlaceName.value;
  const linkValue = linkInput.value;
  addNewCard(placeNameValue, linkValue)
    .then((updatedData) => {
      // создание новуй карточки и добавление её в начало
      const newCard = createCard(
        updatedData,
        deleteCard,
        openImage,
        true
      );
      placesList.prepend(newCard);
      // очищаем форму
      inputPlaceName.value = "";
      linkInput.value = "";
      closePopup(addPopup);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении данных профиля:", error);
    })
    .finally(() => {
      renderLoading(addPopup.querySelector(".popup__button"), "Сохранить");
    });
}

// прикрепляем обработчик к форме добавления карточки
addPopup.addEventListener("submit", handleSubmitAddForm);

// объект с настройками валидации форм
const validationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// включаем валидацию для всех форм
enableValidation(validationObj);

// получаем информацию о пользователе и карточках с сервера
Promise.all([getUserInfo(), getCards()])
  .then((results) => {
    const [userData, cardsData] = results;
    // обновляем профиль пользователя
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    buttonEditAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      // Создание и добавление карточки на страницу
      const isOwner = cardData.owner._id === userData._id;
      const newCard = createCard(
        cardData,
        deleteCard,
        openImage,
        isOwner,
        userData
      );
      placesList.appendChild(newCard);
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных с сервера:", error);
  });

// смена аватарки профиля
function handleEditUserAvatar(evt) {
  evt.preventDefault();
  renderLoading(buttonOpenPopupAvatar.querySelector(".popup__button"), "Сохранение...");
  const avatarUrlInput = buttonOpenPopupAvatar.querySelector(
    ".popup__input_type_edit-avatar"
  );
  const avatarUrl = avatarUrlInput.form.link.value;
  updateUserAvatar(avatarUrl)
    .then((data) => {
      // в случае успешного изменения аватара, обновляем его на странице и закрываем форму
      buttonEditAvatar.style.backgroundImage = `url(${data.avatar})`;
      closePopup(buttonOpenPopupAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(buttonOpenPopupAvatar.querySelector(".popup__button"), "Сохранить...");
    });
}

buttonOpenPopupAvatar.addEventListener("submit", handleEditUserAvatar);