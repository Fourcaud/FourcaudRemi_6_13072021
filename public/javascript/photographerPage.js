function fetchData(callback) {
  fetch("http://127.0.0.1:5500/public/FishEyeData.json")
    .then((res) => res.json())
    .then((data) => {
      callback(data.photographers, data.media);
    });
}
let totalDeLike = 0;
let prixParJour = 0;
let app = new (function () {
  // Récupération des données

  this.FetchAll = function (photographers) {
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
      htmlPhotographers +=
        '<h6 class="labeltags">#' + resultat.tags[j] + "</h6>";
    }
    htmlPhotographers += "</div>";

    htmlPhotographers += "</article>";

    // Affichage de l'ensemble des lignes en HTML
    elPhotographers.innerHTML = htmlPhotographers;
  };

  this.FilterByType = function () {
    let checkboxes = document.querySelectorAll("input");
    let arrType = [];
    let self = this;

    for (let checkbox of checkboxes) {
      checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
          // Ajout dans le tableau de la valeur cochée

          arrType.push(checkbox.value);
        } else {
          // Suppression dans le tableau
          let removeItem = arrType.filter((e) => e !== checkbox.value);
          arrType = removeItem;
        }

        if (arrType.length > 0) {
          let i = arrType.length - 1;
          // 1er choix
          if (arrType.length == 1) {
            filteredTags = self.photographers.filter(
              (e) => e.tags.indexOf(arrType[0]) !== -1
            );
            // Autre(s) choix
          } else {
            filteredTags = filteredTags.filter(function (e) {
              for (let j = 0; j < i; j++) {
                return e.tags.indexOf(arrType[i]) !== -1;
              }
            });
          }

          self.FetchAll(filteredTags);
        } else {
          // Reset (aucune case cochée)
          app.FetchAll(photographers);
        }
      });
    }
  };
})();

let appMedia = new (function () {
  this.FetchAll = function (media) {
    // Selection de l'élément
    const PhotographersID = parseInt(
      new URLSearchParams(window.location.search).get("id")
    );
    let elMedia = document.getElementById("media");

    let htmlMedia = "";

    let resultat = media.filter(
      (data) => data.photographerId === PhotographersID
    );

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
  };
})();
function trieItemName() {
  document.getElementsByClassName(".item").sort();
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
  appMedia.FetchAll(media);
  app.FetchAll(photographers);
  // Filtrage
  app.FilterByType();
  affichageTotalLike();
});
