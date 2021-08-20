function formModal() {
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn")[0];
  const formData = document.querySelectorAll(".formData");
  const closeBtn = document.querySelectorAll(".close");

  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const errorMessages = {
    firstName: "Veuillez entrer un prénom comportant 2 caractères ou plus.",
    lastName: "Veuillez entrer un nom comportant 2 caractères ou plus.",
    email: "Veuillez entrer une adresse email valide.",
  };

  document.getElementById("reserve-form").addEventListener("submit", validate);

  modalBtn.addEventListener("click", launchModal);

  function launchModal() {
    modalbg.style.display = "block";
  }

  closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

  function closeModal() {
    modalbg.style.display = "none";
  }

  document.addEventListener("keydown", touchedown);
  function touchedown(event) {
    if (closeBtn) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
  }

  function isInvalid(element, message) {
    let target;
    if (NodeList.prototype.isPrototypeOf(element))
      target = element[0].parentNode;
    else target = element.parentNode;
    target.setAttribute("data-error-visible", true);
    target.setAttribute("data-error", message);
  }

  function removeAlerts() {
    let invalidFields = document.querySelectorAll(
      '.formData[data-error-visible="true"]'
    );
    for (let field of invalidFields) {
      field.setAttribute("data-error-visible", false);
      field.setAttribute("data-error", "");
    }
  }
  function firstValidation() {
    let inputValue = firstNameInput.value;
    if (inputValue !== null && inputValue.length >= 2) return true;
    else return false;
  }
  function lastValidation() {
    let inputValue = lastNameInput.value;
    if (inputValue !== null && inputValue.length >= 2) return true;
    else return false;
  }
  function emailValidation() {
    let regex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
    return regex.test(emailInput.value);
  }

  function validate(ev) {
    ev.preventDefault();

    let isValidInput = true;
    removeAlerts();
    if (!firstValidation()) {
      isValidInput = false;
      isInvalid(firstNameInput, errorMessages.firstName);
    }
    if (!lastValidation()) {
      isValidInput = false;
      isInvalid(lastNameInput, errorMessages.lastName);
    }
    if (!emailValidation()) {
      isValidInput = false;
      isInvalid(emailInput, errorMessages.email);
    }
    if (isValidInput) {
      validateModal();
    }
  }
}

export default formModal;
