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
let modifyNameFiltre = "Popularité";
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
    '<div class="bloc-1__name"  role="header"><h2>' +
    resultat.name +
    "</h2></div>";

  htmlPhotographers +=
    '<div class="bloc-1__country" role="text"><h3>' +
    resultat.country +
    ", " +
    resultat.city +
    "</h3><h4>" +
    resultat.tagline +
    "</h4></div>";

  prixParJour = resultat.price;

  htmlPhotographers += '<div class="bloc-1__tags " role="links">';
  for (let j in resultat.tags) {
    htmlPhotographers += '<h6 class="labeltags">#' + resultat.tags[j] + "</h6>";
  }
  htmlPhotographers += "</div></div>";
  htmlPhotographers += `<button class="bloc-1__btn btn-signup modal-btn" role="buttons">Contactez-moi</button></div>`;
  htmlPhotographers += `<img class="bloc-1__portrait" src="../photos/PhotographersIDPhotos/${resultat.portrait}" alt="${resultat.name}" role="image"/>`;

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
      htmlMedia += `<article class="item"  role="image link" aria-label="media${y}" ><img tabindex="0" onclick="lightboxModal(${y})" onkeydown="lightboxModalEnter(${y})" class="item__photo"  
      src="../photos/${resultat[y].photographerId}/${resultat[y].image}" alt="${resultat[y].title}"/>`;
    } else {
      htmlMedia += `<article class="item" role="video link" aria-label="media${y}" ><video tabindex="0" onclick="lightboxModal(${y})" onkeydown="lightboxModalEnter(${y})" autoplay class="item__video modal-btn-lightbox " > 
      <source src="../photos/${resultat[y].photographerId}/${resultat[y].video}"  type="video/mp4" ></video>`;
    }
    htmlMedia +=
      '<div class="item__flex"><div class="item__name" role="text"><h2>' +
      resultat[y].title +
      "</h2></div>";
    const nombreLike = parseInt(resultat[y].likes);
    htmlMedia += `<div class="item__tagline" id="item__tagline" role="image" aria-hidden="true" title="Nombre de Like"><h3>${nombreLike}</h3><i id="${resultat[y].id}" onclick="modifyLike(${y})" class="far fa-heart"></i></div>`;
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
function affichageTri() {
  let navFiltre = document.getElementById("dropdown-id");
  let htmlnavFiltre = "";
  htmlnavFiltre += `<button onclick="myFunctionTri();" class="dropbtn" aria-expanded="true" aria-controls="id_about_menu" tabindex="0">${modifyNameFiltre}<i class="fas fa-chevron-down"></i></button>`;
  htmlnavFiltre += `<div id="myDropdown" class="dropdown-content" id="id_about_menu" >`;
  htmlnavFiltre += `<a onclick="filterByLike()" onkeydown="filterEnter()" tabindex="0">Popularité<i class="fas fa-chevron-up"></i></a>`;
  htmlnavFiltre += `<div class="barFiltre"></div><a onclick="filterByName()" onkeydown="filterEnter()" tabindex="0">Titre</a><div class="barFiltre"></div>`;
  htmlnavFiltre += `<a onclick="filterByDate()"  onkeydown="filterEnter()" tabindex="0">Date</a>`;
  htmlnavFiltre += `</div>`;
  navFiltre.innerHTML = htmlnavFiltre;
}

function myFunctionTri() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.myFunctionTri = myFunctionTri;

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function filterEnter() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // The Enter/Return key
      if (event.target.text == "Popularité") {
        filterByLike();
      } else if (event.target.text == "Date") {
        filterByDate();
      } else if (event.target.text == "Titre") {
        filterByName();
      }
    }
  });
}
window.filterEnter = filterEnter;

function filterByLike() {
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);
  modifyNameFiltre = "Popularité";
  affichageTri();
  fetchAllMedia(filteredLike);
}
window.filterByLike = filterByLike;

function filterByDate() {
  let filteredDate = [];
  filteredDate = mediaDuPhotographe;
  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));
  modifyNameFiltre = "Date";
  affichageTri();
  fetchAllMedia(filteredDate);
}
window.filterByDate = filterByDate;

function filterByName() {
  let filteredTitle = [];
  filteredTitle = mediaDuPhotographe;
  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));
  modifyNameFiltre = "Titre";
  affichageTri();
  fetchAllMedia(filteredTitle);
}
window.filterByName = filterByName;

fetchData((photographers, media) => {
  fetchAllMedia(media);
  fetchPhotographer(photographers);
  affichageTotalLike();
  formModal();
  lightbox(mediaDuPhotographe);
  affichageTri();
  filterByLike();
});
