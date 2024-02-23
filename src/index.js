import { initialCards } from "./components/cards.js";
import "../pages/index.css";
import {
  openPopup,
  closePopup,
  closeOnEscKey,
  setupCloseOnOverlayClick,
} from "./components/modal.js";
import { deleteCard, createCard, likeCard } from "./components/card.js";

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addButton = document.querySelector(".profile__add-button");

const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

const editCloseButton = editPopup.querySelector(".popup__close");
const addCloseButton = addPopup.querySelector(".popup__close");
const imageCloseButton = imagePopup.querySelector(".popup__close");

// функция добавления карточек на страницу
function addCardsToPage(initialCards) {
  // для каждой карточки в массиве
  initialCards.forEach(function (cardData) {
    // создаем карточку
    const card = createCard(cardData, deleteCard, openImage, likeCard);
    // добавляем карточку в список мест
    placesList.append(card);
  });
}

// вызываем функцию для добавления карточек на страницу при загрузке
document.addEventListener("DOMContentLoaded", () => {
  addCardsToPage(initialCards);
});

// попап редактирование профиля
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(editPopup);
  closeOnEscKey(editPopup);
  setupCloseOnOverlayClick(editPopup, editPopup);
});

editCloseButton.addEventListener("click", function () {
  closePopup(editPopup);
});

// попап добавление новых карточек
addButton.addEventListener("click", function () {
  openPopup(addPopup);
  closeOnEscKey(addPopup);
  setupCloseOnOverlayClick(addPopup, addPopup);
});

addCloseButton.addEventListener("click", function () {
  closePopup(addPopup);
});

// открытие изображения карточки
function openImage(cardData) {
  // заполняем изображение и описание в модальном окне данными из карточки
  image.src = cardData.link;
  image.alt = cardData.name;
  caption.textContent = cardData.name;

  openPopup(imagePopup);
  closeOnEscKey(imagePopup);
  setupCloseOnOverlayClick(imagePopup, imagePopup);

  imageCloseButton.addEventListener("click", function () {
    closePopup(imagePopup);
  });
}

// Редактирование имени и информации о себе
// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // обновляем текстовые элементы
  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

// добавление новой карточки
// находим поля формы в DOM
const placeNameInput = addPopup.querySelector(".popup__input_type_card-name");
const linkInput = addPopup.querySelector(".popup__input_type_url");

// обработчик отправки формы для добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;

  // создание нового объекта карточки
  const initialCards = {
    name: placeNameValue,
    link: linkValue,
  };

  // создание новуй карточки и добавление её в начало
  const newCard = createCard(initialCards, deleteCard, openImage, likeCard);
  placesList.prepend(newCard);

  // очищаем форму
  placeNameInput.value = "";
  linkInput.value = "";

  // закрываем диалоговое окно
  closePopup(addPopup);
}

// прикрепляем обработчик к форме добавления карточки
addPopup.addEventListener("submit", handleAddFormSubmit);
