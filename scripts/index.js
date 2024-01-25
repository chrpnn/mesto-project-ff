// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.getElementById("card-template");
const placesList = document.querySelector(".places__list");

function createCard(initialCards) {
  // клонируем шаблон
  const card = cardTemplate.content.cloneNode(true);

  // заполняем данные из массива
  card.querySelector(".card__title").textContent = initialCards.name;
  card.querySelector(".card__image").src = initialCards.link;

  // выберем кнопку удаления
  const deleteButton = card.querySelector(".card__delete-button");

  // Добавляем обработчик события для кнопки удаления
  deleteButton.addEventListener("click", function () {
    const cardItems = deleteButton.closest(".places__item");
    cardItems.remove();
  });

  return card;
}

function addCardsToPage(initialCards) {
  // Для каждой карточки в массиве
  initialCards.forEach(function (cardData) {
    // Создаем карточку
    const card = createCard(cardData);
    // Добавляем карточку в список мест
    placesList.append(card);
  });
}

// вызываем функцию для добавления карточек на страницу при загрузке
document.addEventListener("DOMContentLoaded", function () {
  addCardsToPage(initialCards);
});
