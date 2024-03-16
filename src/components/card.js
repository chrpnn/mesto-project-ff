import { deleteCardFromServer, toggleLike } from "./api";

// поиск шаблона карточки
function getTemplate() {
  const cardTemplate = document.getElementById("card-template").content;
  return cardTemplate.querySelector(".places__item");
}

export function createCard(cardData, deleteCard, openImage, likeCard, isOwner) {
  const card = getTemplate().cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  // заполняем данные из массива
  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  ///////////////////////////////////////////////////////////
  // устанавливаем количество лайков
  const likeCount = cardData.likes.length;
  const likeCountElement = card.querySelector(".card__like-count");
  likeCountElement.textContent = likeCount;
  // console.log(likeCount)
  //////////////////////////////////////////////////////////
  // если пользователь является владельцем карточки, добавляем иконку удаления
  if (isOwner) {
    const deleteButton = card.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      deleteCardFromServer(cardData._id)
        .then(() => {
          deleteCard(card);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    // если пользователь не является владельцем карточки, скрываем иконку удаления
    const deleteButton = card.querySelector(".card__delete-button");
    deleteButton.style.display = "none";
  }
  ///////////////////////////////////////////////////////
  // обработчик для лайка
  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    // likeCard(likeButton);
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    toggleLike(cardData._id, isLiked)
      .then((updatedCardData) => {
        // console.log(cardData)
        console.log(updatedCardData.likes);
        // обновляем количество лайков и состояние кнопки лайка
        updateLikeCount(card, updatedCardData.likes.length);
        updateLikeButtonState(likeButton, isLiked);
      })
      .catch((error) => {
        console.log("Ошибка при изменении состояния лайка:", error);
      });
  });
  // обработчик для открытия изображения
  cardImage.addEventListener("click", () => {
    openImage(cardData);
  });

  return card;
}

// функция для обновления количества лайков на карточке
function updateLikeCount(card, likeCount) {
  const likeCountElement = card.querySelector(".card__like-count");
  likeCountElement.textContent = likeCount;
}
// функция для обновления состояния кнопки лайка (активный/неактивный)
function updateLikeButtonState(button, isLiked) {
  if (!isLiked) {
    button.classList.add("card__like-button_is-active");
  } else {
    button.classList.remove("card__like-button_is-active");
  }
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
