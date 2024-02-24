// поиск шаблона карточки
function getTemplate() {
  const cardTemplate = document.getElementById("card-template").content;
  return cardTemplate.querySelector(".places__item");
}

export function createCard(cardData, deleteCard, openImage, likeCard) {
  const card = getTemplate().cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  // заполняем данные из массива
  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // обработчик для удаления
  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(card);
  });

  // обработчик для лайка
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  // обработчик для открытия изображения
  cardImage.addEventListener("click", () => {
    openImage(cardData);
  });

  return card;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}