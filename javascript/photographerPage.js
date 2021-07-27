function fetchData(callback) {
  fetch("http://127.0.0.1:5500/public/FishEyeData.json")
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

  htmlPhotographers += `<article class="card-photographer"><img class="card-photographer__portrait" src="../photos/PhotographersIDPhotos/${resultat.portrait}" alt="${resultat.name}" />`;

  htmlPhotographers +=
    '<div class="card-photographer__name"><h2>' + resultat.name + "</h2></div>";

  htmlPhotographers +=
    '<div class="card-photographer__country"><h3>' +
    resultat.country +
    ", " +
    resultat.city +
    "</h3><h4>" +
    resultat.tagline +
    "</h4></div>";

  prixParJour = resultat.price;
  htmlPhotographers += `<button class="card-photographer__btn">Contactez-moi</button>`;

  htmlPhotographers += '<div class="card-photographer__tags ">';
  for (let j in resultat.tags) {
    htmlPhotographers += '<h6 class="labeltags">#' + resultat.tags[j] + "</h6>";
  }
  htmlPhotographers += "</div>";

  htmlPhotographers += "</article>";

  // Affichage de l'ensemble des lignes en HTML
  elPhotographers.innerHTML = htmlPhotographers;
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
      htmlMedia +=
        '<article class="item"><img class="item__photo" src="../photos/' +
        resultat[y].photographerId +
        "/" +
        resultat[y].image +
        '" alt="' +
        resultat[y].title +
        '" />';
    } else {
      htmlMedia +=
        '<article class="item"><video autoplay class="item__video"> <source src="../photos/' +
        resultat[y].photographerId +
        "/" +
        resultat[y].video +
        '"  type="video/mp4"  ></video>';
    }
    htmlMedia +=
      '<div class="item__flex"><div class="item__name"><h2>' +
      resultat[y].title +
      "</h2></div>";
    const nombreLike = parseInt(resultat[y].likes, 16);
    htmlMedia += `<div class="item__tagline"><h3>${nombreLike}</h3> <i onClick="modifyLike(${y})" class="far fa-heart"></i></div>`;
    totalDeLike += nombreLike;
    htmlMedia += "</div></div>";

    htmlMedia += "</article>";

    elMedia.innerHTML = htmlMedia;
  }
}

function modifyLike(x) {
  const item = mediaDuPhotographe[x].id;
  const coeurelem = document.getElementById(item.id);

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
/* ${resultat[y].id}"  onclick="myFunction(${y})" */

/* function myFunction(x) {
  const item = mediaDuPhotographe[x].id;
  const coeurelem = document.getElementById(item.id);
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
} */

function affichageTotalLike() {
  let affichageLikePrix = document.getElementById("like-prix");
  let htmlLikePrix = "";
  htmlLikePrix += `<div>${totalDeLike}<i class="fas fa-heart"></i></div>`;
  htmlLikePrix += `<div>${prixParJour}€/jour</div>`;
  affichageLikePrix.innerHTML = htmlLikePrix;
}
// Affichage de tous les media

fetchData((photographers, media) => {
  fetchAllMedia(media);
  fetchPhotographer(photographers);
  affichageTotalLike();
});

let selectElem = document.getElementById("tri-select");

selectElem.addEventListener("change", function () {
  let index = selectElem.selectedIndex;
  if (index == 0) {
    filterByLike();
  } else if (index == 1) {
    filterByName();
  } else {
    filterByDate();
  }
});

function filterByLike() {
  // Affiche les checkboxes
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);

  fetchAllMedia(filteredLike);
}
function filterByDate() {
  // Affiche les checkboxes
  let filteredDate = [];
  filteredDate = mediaDuPhotographe;
  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));

  fetchAllMedia(filteredDate);
}

function filterByName() {
  // Affiche les checkboxes
  let filteredTitle = [];
  filteredTitle = mediaDuPhotographe;
  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));

  fetchAllMedia(filteredTitle);
}
