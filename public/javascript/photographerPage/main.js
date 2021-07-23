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

/***/ "./javascript/lightboxModal.js":
/*!*************************************!*\
  !*** ./javascript/lightboxModal.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"filterByName\": () => (/* binding */ filterByName)\n/* harmony export */ });\n// -----------------------------------------------------------------------------\r\n// This file contains styles that are specific to the home page.\r\n// -----------------------------------------------------------------------------\r\nfunction filterByName(mediaDuPhotographe, fetchAllMedia) {\r\n  // Affiche les checkboxes\r\n  let filteredTitle = [];\r\n  filteredTitle = mediaDuPhotographe;\r\n  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));\r\n\r\n  fetchAllMedia(filteredTitle);\r\n}\r\n\n\n//# sourceURL=webpack://fisheye/./javascript/lightboxModal.js?");

/***/ }),

/***/ "./javascript/photographerPage.js":
/*!****************************************!*\
  !*** ./javascript/photographerPage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lightboxModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lightboxModal */ \"./javascript/lightboxModal.js\");\n\r\n\r\nfunction fetchData(callback) {\r\n  fetch(\"http://127.0.0.1:5500/public/FishEyeData.json\")\r\n    .then((res) => res.json())\r\n    .then((data) => {\r\n      callback(data.photographers, data.media);\r\n    });\r\n}\r\n\r\nlet totalDeLike = 0;\r\nlet prixParJour = 0;\r\nlet mediaDuPhotographe = [];\r\n\r\nfunction fetchPhotographer(photographers) {\r\n  // Selection de l'élément\r\n  const PhotographersID = parseInt(\r\n    new URLSearchParams(window.location.search).get(\"id\")\r\n  );\r\n  let elPhotographers = document.getElementById(\"photographers\");\r\n  let htmlPhotographers = \"\";\r\n  const resultat = photographers.find(\r\n    (photographer) => photographer.id === PhotographersID\r\n  );\r\n\r\n  htmlPhotographers += `<article class=\"card\"><img class=\"card__portrait\" src=\"../photos/PhotographersIDPhotos/${resultat.portrait}\" alt=\"${resultat.name}\" />`;\r\n\r\n  htmlPhotographers +=\r\n    '<div class=\"card__name\"><h2>' + resultat.name + \"</h2></div>\";\r\n\r\n  htmlPhotographers +=\r\n    '<div class=\"card__country\"><h3>' +\r\n    resultat.country +\r\n    \", \" +\r\n    resultat.city +\r\n    \"</h3></div>\";\r\n\r\n  htmlPhotographers +=\r\n    '<div class=\"card__tagline\"><h4>' + resultat.tagline + \"</h4></div>\";\r\n\r\n  htmlPhotographers +=\r\n    '<div class=\"card__price\"><h5>' + resultat.price + \"€/jour</h5></div>\";\r\n  prixParJour = resultat.price;\r\n  htmlPhotographers += '<div class=\"card__tags \">';\r\n  for (let j in resultat.tags) {\r\n    htmlPhotographers += '<h6 class=\"labeltags\">#' + resultat.tags[j] + \"</h6>\";\r\n  }\r\n  htmlPhotographers += \"</div>\";\r\n\r\n  htmlPhotographers += \"</article>\";\r\n\r\n  // Affichage de l'ensemble des lignes en HTML\r\n  elPhotographers.innerHTML = htmlPhotographers;\r\n}\r\n\r\nfunction fetchAllMedia(media) {\r\n  // Selection de l'élément\r\n  const PhotographersID = parseInt(\r\n    new URLSearchParams(window.location.search).get(\"id\")\r\n  );\r\n  let elMedia = document.getElementById(\"media\");\r\n\r\n  let htmlMedia = \"\";\r\n\r\n  let resultat = media.filter(\r\n    (data) => data.photographerId === PhotographersID\r\n  );\r\n  mediaDuPhotographe = resultat;\r\n  for (let y in resultat) {\r\n    if (resultat[y].image) {\r\n      htmlMedia +=\r\n        '<article class=\"item\"><img class=\"item__photo\" src=\"../photos/' +\r\n        resultat[y].photographerId +\r\n        \"/\" +\r\n        resultat[y].image +\r\n        '\" alt=\"' +\r\n        resultat[y].title +\r\n        '\" />';\r\n    } else {\r\n      htmlMedia +=\r\n        '<article class=\"item\"><video autoplay class=\"item__video\"> <source src=\"../photos/' +\r\n        resultat[y].photographerId +\r\n        \"/\" +\r\n        resultat[y].video +\r\n        '\"  type=\"video/mp4\"  ></video>';\r\n    }\r\n    htmlMedia +=\r\n      '<div class=\"item__flex\"><div class=\"item__name\"><h2>' +\r\n      resultat[y].title +\r\n      \"</h2></div>\";\r\n    const nombreLike = parseInt(resultat[y].likes, 16);\r\n    htmlMedia += `<div class=\"item__tagline\"><h3>${nombreLike}</h3> <i id=\"${resultat[y].id}\" onclick=\"myFunction(${y})\" class=\"far fa-heart\"></i></div>`;\r\n    totalDeLike += nombreLike;\r\n    htmlMedia += \"</div></div>\";\r\n\r\n    htmlMedia += \"</article>\";\r\n\r\n    elMedia.innerHTML = htmlMedia;\r\n  }\r\n}\r\n\r\nfunction myFunction(x) {\r\n  const item = mediaDuPhotographe[x].id;\r\n  const coeurelem = document.getElementById(item.id);\r\n  coeurelem.classList.toggle(\"fas\");\r\n  if (coeurelem.classList.contains(\"fas\")) {\r\n    coeurelem.previousElementSibling.innerHTML++;\r\n    totalDeLike++;\r\n    affichageTotalLike();\r\n  } else {\r\n    coeurelem.previousElementSibling.innerHTML--;\r\n    totalDeLike--;\r\n    affichageTotalLike();\r\n  }\r\n}\r\nfunction affichageTotalLike() {\r\n  let affichageLikePrix = document.getElementById(\"like-prix\");\r\n  let htmlLikePrix = \"\";\r\n  htmlLikePrix += `<div>${totalDeLike}<i class=\"fas fa-heart\"></i></div>`;\r\n  htmlLikePrix += `<div>${prixParJour}€/jour</div>`;\r\n  affichageLikePrix.innerHTML = htmlLikePrix;\r\n}\r\n// Affichage de tous les media\r\n\r\nfetchData((photographers, media) => {\r\n  fetchAllMedia(media);\r\n  fetchPhotographer(photographers);\r\n  affichageTotalLike();\r\n});\r\n\r\ndocument\r\n  .getElementById(\"populariteTrie\")\r\n  .addEventListener(\"click\", function (e) {\r\n    e.preventDefault();\r\n    e.stopPropagation();\r\n\r\n    filterByLike(mediaDuPhotographe);\r\n  });\r\n\r\ndocument.getElementById(\"dateTrie\").addEventListener(\"click\", function (e) {\r\n  e.preventDefault();\r\n  e.stopPropagation();\r\n\r\n  filterByDate(mediaDuPhotographe);\r\n});\r\ndocument.getElementById(\"titreTrie\").addEventListener(\"click\", function (e) {\r\n  e.preventDefault();\r\n  e.stopPropagation();\r\n\r\n  (0,_lightboxModal__WEBPACK_IMPORTED_MODULE_0__.filterByName)(mediaDuPhotographe, fetchAllMedia);\r\n});\r\n\r\nfunction filterByLike() {\r\n  // Affiche les checkboxes\r\n  let filteredLike = [];\r\n  filteredLike = mediaDuPhotographe;\r\n  filteredLike.sort((a, b) => b.likes - a.likes);\r\n\r\n  fetchAllMedia(filteredLike);\r\n}\r\nfunction filterByDate() {\r\n  // Affiche les checkboxes\r\n  let filteredDate = [];\r\n  filteredDate = mediaDuPhotographe;\r\n  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));\r\n\r\n  fetchAllMedia(filteredDate);\r\n}\r\n\n\n//# sourceURL=webpack://fisheye/./javascript/photographerPage.js?");

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