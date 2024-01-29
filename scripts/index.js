// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.getElementById("card-template");
const placesList = document.querySelector(".places__list");

// ф-ия поиска шаблона карточки
function getTemplate() {
  const cardTemplate = document.getElementById("card-template").content;
  return cardTemplate.querySelector(".places__item");
} 

function createCard(cardData, deleteCard) {
  const card = getTemplate().cloneNode(true);
  // заполняем данные из массива
  card.querySelector(".card__title").textContent = cardData.name;
  card.querySelector(".card__image").src = cardData.link;
  card.querySelector(".card__image").alt = cardData.name;
  // выберем кнопку удаления
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(card); // Вызываем обработчик удаления карточки
  });
  return card;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

function addCardsToPage(initialCards) {
  // Для каждой карточки в массиве
  initialCards.forEach(function (cardData) {
    // Создаем карточку
    const card = createCard(cardData, deleteCard);
    // Добавляем карточку в список мест
    placesList.append(card);
  });
}

// вызываем функцию для добавления карточек на страницу при загрузке
document.addEventListener("DOMContentLoaded", () => {
    addCardsToPage(initialCards);
  });