/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./javascript/formModal.js":
/*!*********************************!*\
  !*** ./javascript/formModal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction formModal() {\r\n  const modalbg = document.querySelector(\".bground\");\r\n  const modalBtn = document.querySelectorAll(\".modal-btn\")[0];\r\n  const formData = document.querySelectorAll(\".formData\");\r\n  const closeBtn = document.querySelectorAll(\".close\");\r\n\r\n  const firstNameInput = document.getElementById(\"first\");\r\n  const lastNameInput = document.getElementById(\"last\");\r\n  const emailInput = document.getElementById(\"email\");\r\n  const errorMessages = {\r\n    firstName: \"Veuillez entrer un prénom comportant 2 caractères ou plus.\",\r\n    lastName: \"Veuillez entrer un nom comportant 2 caractères ou plus.\",\r\n    email: \"Veuillez entrer une adresse email valide.\",\r\n  };\r\n\r\n  document.getElementById(\"reserve-form\").addEventListener(\"submit\", validate);\r\n\r\n  modalBtn.addEventListener(\"click\", launchModal);\r\n\r\n  function launchModal() {\r\n    modalbg.style.display = \"block\";\r\n  }\r\n\r\n  closeBtn.forEach((btn) => btn.addEventListener(\"click\", closeModal));\r\n\r\n  function closeModal() {\r\n    modalbg.style.display = \"none\";\r\n  }\r\n\r\n  function isInvalid(element, message) {\r\n    let target;\r\n    if (NodeList.prototype.isPrototypeOf(element))\r\n      target = element[0].parentNode;\r\n    else target = element.parentNode;\r\n    target.setAttribute(\"data-error-visible\", true);\r\n    target.setAttribute(\"data-error\", message);\r\n  }\r\n  //delete previous alerts\r\n  function removeAlerts() {\r\n    let invalidFields = document.querySelectorAll(\r\n      '.formData[data-error-visible=\"true\"]'\r\n    );\r\n    for (let field of invalidFields) {\r\n      field.setAttribute(\"data-error-visible\", false);\r\n      field.setAttribute(\"data-error\", \"\");\r\n    }\r\n  }\r\n  function firstValidation() {\r\n    let inputValue = firstNameInput.value;\r\n    if (inputValue !== null && inputValue.length >= 2) return true;\r\n    else return false;\r\n  }\r\n  function lastValidation() {\r\n    let inputValue = lastNameInput.value;\r\n    if (inputValue !== null && inputValue.length >= 2) return true;\r\n    else return false;\r\n  }\r\n  function emailValidation() {\r\n    let regex = /^([a-z0-9_\\.-]+\\@[\\da-z\\.-]+\\.[a-z\\.]{2,6})$/;\r\n    return regex.test(emailInput.value);\r\n  }\r\n\r\n  function validate(ev) {\r\n    ev.preventDefault();\r\n\r\n    let isValidInput = true;\r\n    removeAlerts();\r\n    if (!firstValidation()) {\r\n      isValidInput = false;\r\n      isInvalid(firstNameInput, errorMessages.firstName);\r\n    }\r\n    if (!lastValidation()) {\r\n      isValidInput = false;\r\n      isInvalid(lastNameInput, errorMessages.lastName);\r\n    }\r\n    if (!emailValidation()) {\r\n      isValidInput = false;\r\n      isInvalid(emailInput, errorMessages.email);\r\n    }\r\n    if (isValidInput) {\r\n      validateModal();\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formModal);\r\n\n\n//# sourceURL=webpack://fisheye/./javascript/formModal.js?");

/***/ }),

/***/ "./javascript/lightboxModal.js":
/*!*************************************!*\
  !*** ./javascript/lightboxModal.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction lightbox(mediaDuPhotographe) {\r\n  const modalbg = document.querySelector(\".bground-lightbox\");\r\n  const closeBtn = document.querySelectorAll(\".close-lightbox\");\r\n  let mediaModif = 0;\r\n  closeBtn.forEach((btn) => btn.addEventListener(\"click\", closeModal));\r\n\r\n  function closeModal() {\r\n    modalbg.style.display = \"none\";\r\n  }\r\n\r\n  function lightboxModal(x) {\r\n    const selectMedia = document.getElementById(\"modal-body-lightbox\");\r\n    const modalbg = document.querySelector(\".bground-lightbox\");\r\n    modalbg.style.display = \"block\";\r\n\r\n    let lightboxMedia = \"\";\r\n\r\n    if (mediaDuPhotographe[x].image) {\r\n      lightboxMedia += `<article class=\"item-lightbox\"><div class=\"item-lightbox__flex\"><i class=\"fas fa-chevron-left\" onclick=\"changeMediaLeft(${x})\" ></i><img id=\"${mediaDuPhotographe[x].id}\" class=\"item-lightbox__photo\" src=\"../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].image}\" alt=\"${mediaDuPhotographe[x].title}\" /><i class=\"fas fa-chevron-right\" onclick=\"changeMediaRight(${x})\"></i></div>`;\r\n    } else {\r\n      lightboxMedia += `<article class=\"item-lightbox\"><div class=\"item-lightbox__flex\"><i class=\"fas fa-chevron-left\" onclick=\"changeMediaLeft(${x})\"></i><video id=\"${mediaDuPhotographe[x].id}\" autoplay class=\"item-lightbox__video\"><source src=\"../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].video}\" alt=\"${mediaDuPhotographe[x].title}\"  type=\"video/mp4\" ></video><i class=\"fas fa-chevron-right\" onclick=\"changeMediaRight(${x})\"></i></div>`;\r\n    }\r\n\r\n    lightboxMedia += `<div class=\"item-lightbox__titreMedia\">${mediaDuPhotographe[x].title}</div>`;\r\n    lightboxMedia += \"</article>\";\r\n\r\n    selectMedia.innerHTML = lightboxMedia;\r\n  }\r\n  window.lightboxModal = lightboxModal;\r\n\r\n  function changeMediaLeft(y) {\r\n    y--;\r\n    lightboxModal(y);\r\n  }\r\n  function changeMediaRight(y) {\r\n    y++;\r\n    lightboxModal(y);\r\n  }\r\n  window.changeMediaLeft = changeMediaLeft;\r\n  window.changeMediaRight = changeMediaRight;\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lightbox);\r\n\n\n//# sourceURL=webpack://fisheye/./javascript/lightboxModal.js?");

/***/ }),

/***/ "./javascript/photographerPage.js":
/*!****************************************!*\
  !*** ./javascript/photographerPage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formModal.js */ \"./javascript/formModal.js\");\n/* harmony import */ var _lightboxModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lightboxModal.js */ \"./javascript/lightboxModal.js\");\n\r\n\r\n\r\nfunction fetchData(callback) {\r\n  fetch(\"../FishEyeData.json\")\r\n    .then((res) => res.json())\r\n    .then((data) => {\r\n      callback(data.photographers, data.media);\r\n    });\r\n}\r\n\r\nlet totalDeLike = 0;\r\nlet prixParJour = 0;\r\nlet mediaDuPhotographe = [];\r\nlet modifyNameFiltre = \"Popularité\";\r\nfunction fetchPhotographer(photographers) {\r\n  // Selection de l'élément\r\n  const PhotographersID = parseInt(\r\n    new URLSearchParams(window.location.search).get(\"id\")\r\n  );\r\n  let elPhotographers = document.getElementById(\"photographers\");\r\n  let htmlPhotographers = \"\";\r\n  const resultat = photographers.find(\r\n    (photographer) => photographer.id === PhotographersID\r\n  );\r\n  htmlPhotographers += `<div class=\"bloc-1\"><div class=\"bloc-1__flex\">`;\r\n  htmlPhotographers +=\r\n    '<div class=\"bloc-1__name\"  role=\"header\"><h2>' +\r\n    resultat.name +\r\n    \"</h2></div>\";\r\n\r\n  htmlPhotographers +=\r\n    '<div class=\"bloc-1__country\" role=\"text\"><h3>' +\r\n    resultat.country +\r\n    \", \" +\r\n    resultat.city +\r\n    \"</h3><h4>\" +\r\n    resultat.tagline +\r\n    \"</h4></div>\";\r\n\r\n  prixParJour = resultat.price;\r\n\r\n  htmlPhotographers += '<div class=\"bloc-1__tags \" role=\"links\">';\r\n  for (let j in resultat.tags) {\r\n    htmlPhotographers += '<h6 class=\"labeltags\">#' + resultat.tags[j] + \"</h6>\";\r\n  }\r\n  htmlPhotographers += \"</div></div>\";\r\n  htmlPhotographers += `<button class=\"bloc-1__btn btn-signup modal-btn\" role=\"buttons\">Contactez-moi</button></div>`;\r\n  htmlPhotographers += `<img class=\"bloc-1__portrait\" src=\"../photos/PhotographersIDPhotos/${resultat.portrait}\" alt=\"${resultat.name}\" role=\"image\"/>`;\r\n\r\n  // Affichage de l'ensemble des lignes en HTML\r\n  elPhotographers.innerHTML = htmlPhotographers;\r\n\r\n  let nomPourForm = document.getElementById(\"nameHeader\");\r\n  let htmlPourForm = \"\";\r\n  htmlPourForm += `<p> Contactez-Moi <br>${resultat.name} </p>`;\r\n  nomPourForm.innerHTML = htmlPourForm;\r\n}\r\n\r\nfunction fetchAllMedia(media) {\r\n  // Selection de l'élément\r\n  const PhotographersID = parseInt(\r\n    new URLSearchParams(window.location.search).get(\"id\")\r\n  );\r\n  let elMedia = document.getElementById(\"media\");\r\n\r\n  let htmlMedia = \"\";\r\n\r\n  let resultat = media.filter(\r\n    (data) => data.photographerId === PhotographersID\r\n  );\r\n  mediaDuPhotographe = resultat;\r\n  for (let y in resultat) {\r\n    if (resultat[y].image) {\r\n      htmlMedia += `<article class=\"item\"><img onclick=\"lightboxModal(${y})\" class=\"item__photo\"  \r\n      src=\"../photos/${resultat[y].photographerId}/${resultat[y].image}\" alt=\"${resultat[y].title}\" role=\"image link\"/>`;\r\n    } else {\r\n      htmlMedia += `<article class=\"item\"><video onclick=\"lightboxModal(${y})\" autoplay class=\"item__video modal-btn-lightbox \" role=\"video link\"> \r\n      <source src=\"../photos/${resultat[y].photographerId}/${resultat[y].video}\"  type=\"video/mp4\" ></video>`;\r\n    }\r\n    htmlMedia +=\r\n      '<div class=\"item__flex\"><div class=\"item__name\" role=\"text\"><h2>' +\r\n      resultat[y].title +\r\n      \"</h2></div>\";\r\n    const nombreLike = parseInt(resultat[y].likes);\r\n    htmlMedia += `<div class=\"item__tagline\" id=\"item__tagline\" role=\"image\" aria-hidden=\"true\" title=\"Nombre de Like\"><h3>${nombreLike}</h3><i id=\"${resultat[y].id}\" onclick=\"modifyLike(${y})\" class=\"far fa-heart\"></i></div>`;\r\n    totalDeLike += nombreLike;\r\n    htmlMedia += \"</div></div>\";\r\n\r\n    htmlMedia += \"</article>\";\r\n\r\n    elMedia.innerHTML = htmlMedia;\r\n  }\r\n}\r\n\r\nfunction modifyLike(x) {\r\n  const { id } = mediaDuPhotographe[x];\r\n  const coeurelem = document.getElementById(id);\r\n  coeurelem.classList.toggle(\"fas\");\r\n\r\n  if (coeurelem.classList.contains(\"fas\")) {\r\n    coeurelem.previousElementSibling.innerHTML++;\r\n    totalDeLike++;\r\n    affichageTotalLike();\r\n  } else {\r\n    coeurelem.previousElementSibling.innerHTML--;\r\n\r\n    totalDeLike--;\r\n    affichageTotalLike();\r\n  }\r\n}\r\n\r\nwindow.modifyLike = modifyLike;\r\n\r\nfunction affichageTotalLike() {\r\n  let affichageLikePrix = document.getElementById(\"like-prix\");\r\n  let htmlLikePrix = \"\";\r\n  htmlLikePrix += `<div>${totalDeLike}<i class=\"fas fa-heart\"></i></div>`;\r\n  htmlLikePrix += `<div>${prixParJour}€/jour</div>`;\r\n  affichageLikePrix.innerHTML = htmlLikePrix;\r\n}\r\nfunction affichageTri() {\r\n  let navFiltre = document.getElementById(\"dropdown-id\");\r\n  let htmlnavFiltre = \"\";\r\n  htmlnavFiltre += `<button onclick=\"myFunctionTri();\" class=\"dropbtn\">${modifyNameFiltre}<i class=\"fas fa-chevron-down\"></i></button>`;\r\n  htmlnavFiltre += `<div id=\"myDropdown\" class=\"dropdown-content\">`;\r\n  htmlnavFiltre += `<a onclick=\"filterByLike()\">Popularité<i class=\"fas fa-chevron-up\"></i></a>`;\r\n  htmlnavFiltre += `<div class=\"barFiltre\"></div><a onclick=\"filterByName()\">Titre</a><div class=\"barFiltre\"></div>`;\r\n  htmlnavFiltre += `<a onclick=\"filterByDate()\">Date</a>`;\r\n  htmlnavFiltre += `</div>`;\r\n  navFiltre.innerHTML = htmlnavFiltre;\r\n}\r\n\r\nfunction myFunctionTri() {\r\n  document.getElementById(\"myDropdown\").classList.toggle(\"show\");\r\n}\r\nwindow.myFunctionTri = myFunctionTri;\r\n\r\nwindow.onclick = function (event) {\r\n  if (!event.target.matches(\".dropbtn\")) {\r\n    let dropdowns = document.getElementsByClassName(\"dropdown-content\");\r\n    let i;\r\n    for (i = 0; i < dropdowns.length; i++) {\r\n      let openDropdown = dropdowns[i];\r\n      if (openDropdown.classList.contains(\"show\")) {\r\n        openDropdown.classList.remove(\"show\");\r\n      }\r\n    }\r\n  }\r\n};\r\nfunction filterByLike() {\r\n  let filteredLike = [];\r\n  filteredLike = mediaDuPhotographe;\r\n  filteredLike.sort((a, b) => b.likes - a.likes);\r\n  modifyNameFiltre = \"Popularité\";\r\n  affichageTri();\r\n  fetchAllMedia(filteredLike);\r\n}\r\nwindow.filterByLike = filterByLike;\r\n\r\nfunction filterByDate() {\r\n  let filteredDate = [];\r\n  filteredDate = mediaDuPhotographe;\r\n  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));\r\n  modifyNameFiltre = \"Date\";\r\n  affichageTri();\r\n  fetchAllMedia(filteredDate);\r\n}\r\nwindow.filterByDate = filterByDate;\r\n\r\nfunction filterByName() {\r\n  let filteredTitle = [];\r\n  filteredTitle = mediaDuPhotographe;\r\n  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));\r\n  modifyNameFiltre = \"Titre\";\r\n  affichageTri();\r\n  fetchAllMedia(filteredTitle);\r\n}\r\nwindow.filterByName = filterByName;\r\n\r\nfetchData((photographers, media) => {\r\n  fetchAllMedia(media);\r\n  fetchPhotographer(photographers);\r\n  affichageTotalLike();\r\n  (0,_formModal_js__WEBPACK_IMPORTED_MODULE_0__.default)();\r\n  (0,_lightboxModal_js__WEBPACK_IMPORTED_MODULE_1__.default)(mediaDuPhotographe);\r\n  affichageTri();\r\n  filterByLike();\r\n});\r\n\n\n//# sourceURL=webpack://fisheye/./javascript/photographerPage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./javascript/photographerPage.js");
/******/ 	
/******/ })()
;