export { enableValidation, clearValidation };

const hideInputError = (
  errorElement,
  inputElement,
  errorActiveClass,
  inputErrorClass
) => {
  errorElement.textContent = "";
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorActiveClass);
};

// 4
const showInputError = (
  errorElement,
  inputElement,
  errorActiveClass,
  inputErrorClass
) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorActiveClass);
};

// 3
const checkInputValidity = (
  formElement,
  inputElement,
  errorActiveClass,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    //функция отображения сообщения об ошибке
    showInputError(
      errorElement,
      inputElement,
      errorActiveClass,
      inputErrorClass
    );
  } else {
    hideInputError(
      errorElement,
      inputElement,
      errorActiveClass,
      inputErrorClass
    );
  }
};

// 2
const setEvtListeners = (formElement, settingObj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settingObj.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        settingObj.errorActiveClass,
        settingObj.inputErrorClass
      );

      const submitButton = formElement.querySelector(
        settingObj.submitButtonSelector
      );
      toggleButtonState(
        inputList,
        submitButton,
        settingObj.inactiveButtonClass
      );
    });
  });
};

// 1
const enableValidation = (settingObj) => {
  const formList = Array.from(
    document.querySelectorAll(settingObj.formSelector)
  );
  formList.forEach((formElement) => {
    setEvtListeners(formElement, settingObj);
  });
};

// 1-1
const clearValidation = (formElement, settingObj) => {
  // Находим все элементы с классом, указанным в настройках валидации
  const inputList = Array.from(
    formElement.querySelectorAll(settingObj.inputSelector)
  );
  // Удаляем сообщения об ошибках и убираем классы ошибок у всех соответствующих элементов
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(
      errorElement,
      inputElement,
      settingObj.errorActiveClass,
      settingObj.inputErrorClass
    );
  });

  // Находим кнопку отправки формы и делаем её неактивной
  const submitButton = formElement.querySelector(
    settingObj.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, settingObj.inactiveButtonClass);
};

// togglebutton
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function hasInvalidInput(inputList) {
  return (
    inputList.some((inputElement) => !inputElement.validity.valid) ||
    inputList.some((inputElement) => inputElement.value === "")
  );
}
