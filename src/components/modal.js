// открытие попапа
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

// закрытие попапа + плавная анимация
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  popupElement.classList.add("popup_is-animated");
}

// закрытие попапа по esc
export function closeOnEscKey(popupElement) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup(popupElement);
    }
  });
}

// закрытие попапа по клику по оверлею
export function setupCloseOnOverlayClick(popupElement, overlayElement) {
  overlayElement.addEventListener("click", function (event) {
    if (event.target === overlayElement) {
      closePopup(popupElement);
    }
  });
}
