import { filterByDate, filterByName } from "./component.js";
import formModal from "./formModal.js";
import lightbox from "./lightboxModal.js";

function fetchData(callback) {
  fetch("../FishEyeData.json")
    .then((res) => res.json())
    .then((data) => {
      callback(data.photographers, data.media);
    });
}

let totalDeLike = 0;
let prixParJour = 0;
let mediaDuPhotographe = [];

function fetchPhotographer(photographers) {
  // Selection de l'élément
  const PhotographersID = parseInt(
    new URLSearchParams(window.location.search).get("id")
  );
  let elPhotographers = document.getElementById("photographers");
  let htmlPhotographers = "";
  const resultat = photographers.find(
    (photographer) => photographer.id === PhotographersID
  );
  htmlPhotographers += `<div class="bloc-1"><div class="bloc-1__flex">`;
  htmlPhotographers +=
    '<div class="bloc-1__name"><h2>' + resultat.name + "</h2></div>";

  htmlPhotographers +=
    '<div class="bloc-1__country"><h3>' +
    resultat.country +
    ", " +
    resultat.city +
    "</h3><h4>" +
    resultat.tagline +
    "</h4></div>";

  prixParJour = resultat.price;

  htmlPhotographers += '<div class="bloc-1__tags ">';
  for (let j in resultat.tags) {
    htmlPhotographers += '<h6 class="labeltags">#' + resultat.tags[j] + "</h6>";
  }
  htmlPhotographers += "</div></div>";
  htmlPhotographers += `<button class="bloc-1__btn btn-signup modal-btn">Contactez-moi</button></div>`;
  htmlPhotographers += `<img class="bloc-1__portrait" src="../photos/PhotographersIDPhotos/${resultat.portrait}" alt="${resultat.name}" />`;

  // Affichage de l'ensemble des lignes en HTML
  elPhotographers.innerHTML = htmlPhotographers;

  let nomPourForm = document.getElementById("nameHeader");
  let htmlPourForm = "";
  htmlPourForm += `<p> Contactez-Moi <br>${resultat.name} </p>`;
  nomPourForm.innerHTML = htmlPourForm;
}

function fetchAllMedia(media) {
  // Selection de l'élément
  const PhotographersID = parseInt(
    new URLSearchParams(window.location.search).get("id")
  );
  let elMedia = document.getElementById("media");

  let htmlMedia = "";

  let resultat = media.filter(
    (data) => data.photographerId === PhotographersID
  );
  mediaDuPhotographe = resultat;
  for (let y in resultat) {
    if (resultat[y].image) {
      htmlMedia += `<article class="item"><img onclick="lightboxModal(${y})" class="item__photo"  
      src="../photos/${resultat[y].photographerId}/${resultat[y].image}" alt="${resultat[y].title}" />`;
    } else {
      htmlMedia += `<article class="item"><video onclick="lightboxModal(${y})" autoplay class="item__video modal-btn-lightbox"> 
      <source src="../photos/${resultat[y].photographerId}/${resultat[y].video}"  type="video/mp4" ></video>`;
    }
    htmlMedia +=
      '<div class="item__flex"><div class="item__name"><h2>' +
      resultat[y].title +
      "</h2></div>";
    const nombreLike = parseInt(resultat[y].likes);
    htmlMedia += `<div class="item__tagline" id="item__tagline"><h3>${nombreLike}</h3><i id="${resultat[y].id}" onclick="modifyLike(${y})" class="far fa-heart"></i></div>`;
    totalDeLike += nombreLike;
    htmlMedia += "</div></div>";

    htmlMedia += "</article>";

    elMedia.innerHTML = htmlMedia;
  }
}

function modifyLike(x) {
  const { id } = mediaDuPhotographe[x];
  const coeurelem = document.getElementById(id);
  coeurelem.classList.toggle("fas");

  if (coeurelem.classList.contains("fas")) {
    coeurelem.previousElementSibling.innerHTML++;
    totalDeLike++;
    affichageTotalLike();
  } else {
    coeurelem.previousElementSibling.innerHTML--;

    totalDeLike--;
    affichageTotalLike();
  }
}

window.modifyLike = modifyLike;

function affichageTotalLike() {
  let affichageLikePrix = document.getElementById("like-prix");
  let htmlLikePrix = "";
  htmlLikePrix += `<div>${totalDeLike}<i class="fas fa-heart"></i></div>`;
  htmlLikePrix += `<div>${prixParJour}€/jour</div>`;
  affichageLikePrix.innerHTML = htmlLikePrix;
}

function myFunctionTri() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.myFunctionTri = myFunctionTri;
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
function filterByLike() {
  // Affiche les checkboxes
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);
  fetchAllMedia(filteredLike);
}
/* 

const dropBtn = document.querySelector(".dropbtn");
const contDropBtn = document.querySelector(".contentDropBtn");
const allBtn = document.querySelector(".dropdown-content");
dropBtn.addEventListener("click", dropBtnBlock);

function dropBtnBlock() {
  contDropBtn.style.display = "none";
}

const btnPopulariteTri = document.getElementById("populariteTri");
btnPopulariteTri.addEventListener("click", filterByLike());
function filterByLike() {
  // Affiche les checkboxes
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);
  allBtn.style.display = "none";
  fetchAllMedia(filteredLike);
}
const btnTitreTri = document.getElementById("titreTri");
btnTitreTri.addEventListener(
  "click",
  filterByName(mediaDuPhotographe, fetchAllMedia)
);
const btnDateTri = document.getElementById("dateTri");
btnDateTri.addEventListener(
  "click",
  filterByDate(mediaDuPhotographe, fetchAllMedia)
); */

/* let selectElem = document.getElementById("tri-select");
selectElem.addEventListener("change", function () {
  let index = selectElem.selectedIndex;
  if (index === populariteTri) {
    filterByLike(mediaDuPhotographe, fetchAllMedia);
  } else if (index === titreTri) {
    filterByName(mediaDuPhotographe, fetchAllMedia);
  } else {
    filterByDate(mediaDuPhotographe, fetchAllMedia);
  }
});  */

fetchData((photographers, media) => {
  fetchAllMedia(media);
  fetchPhotographer(photographers);
  affichageTotalLike();
  formModal();
  lightbox(mediaDuPhotographe);
});
