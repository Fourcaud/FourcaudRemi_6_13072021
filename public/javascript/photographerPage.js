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

  htmlPhotographers += `<article class="card"><img class="card__portrait" src="../photos/PhotographersIDPhotos/${resultat.portrait}" alt="${resultat.name}" />`;

  htmlPhotographers +=
    '<div class="card__name"><h2>' + resultat.name + "</h2></div>";

  htmlPhotographers +=
    '<div class="card__country"><h3>' +
    resultat.country +
    ", " +
    resultat.city +
    "</h3></div>";

  htmlPhotographers +=
    '<div class="card__tagline"><h4>' + resultat.tagline + "</h4></div>";

  htmlPhotographers +=
    '<div class="card__price"><h5>' + resultat.price + "€/jour</h5></div>";
  prixParJour = resultat.price;
  htmlPhotographers += '<div class="card__tags ">';
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
    htmlMedia += `<div class="item__tagline"><h3>${nombreLike}</h3> <i onclick="myFunction(this)" class="far fa-heart"></i></div>`;
    totalDeLike += nombreLike;
    htmlMedia += "</div></div>";

    htmlMedia += "</article>";

    elMedia.innerHTML = htmlMedia;
  }
}

function myFunction(x) {
  x.classList.toggle("fas");
  if (x.classList.contains("fas")) {
    x.previousElementSibling.innerHTML++;
    totalDeLike++;
    affichageTotalLike();
  } else {
    x.previousElementSibling.innerHTML--;
    totalDeLike--;
    affichageTotalLike();
  }
}
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

document
  .getElementById("populariteTrie")
  .addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    FilterByLike(mediaDuPhotographe);
  });

document.getElementById("dateTrie").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  FilterByDate(mediaDuPhotographe);
});
document.getElementById("titreTrie").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  FilterByName(mediaDuPhotographe);
});

function FilterByName(mediaDuPhotographe) {
  // Affiche les checkboxes
  let filteredTitle = [];
  filteredTitle = mediaDuPhotographe;
  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));

  fetchAllMedia(filteredTitle);
}

function FilterByLike(mediaDuPhotographe) {
  // Affiche les checkboxes
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);

  fetchAllMedia(filteredLike);
}
function FilterByDate(mediaDuPhotographe) {
  // Affiche les checkboxes
  let filteredDate = [];
  filteredDate = mediaDuPhotographe;
  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));

  fetchAllMedia(filteredDate);
}
