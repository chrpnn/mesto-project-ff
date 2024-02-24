// открытие попапа
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeByClickOverlay);
}

// закрытие попапа
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", closeByClickOverlay);
}

// закрытие попапа по esc
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
    }
};

// закрытие попапа по оверлею
const closeByClickOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};