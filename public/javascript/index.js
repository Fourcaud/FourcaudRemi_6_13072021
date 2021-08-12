function fetchData(callback) {
  fetch("./FishEyeData.json")
    .then((res) => res.json())
    .then((data) => {
      callback(data.photographers);
    });
} // Retourne la liste des checkboxes
function DisplayFilters(photographers) {
  // Selection de l'élément
  let elTypes = document.getElementById("header__tags");
  let types = [];

  // Chaque ligne (photographe)
  for (let i in photographers) {
    // Chaque "type" dans chaque ligne (photographe)
    for (let j in photographers[i].tags) {
      types.push(photographers[i].tags[j]);
    }
  }

  let uniqueTypes = types.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  let htmlTypes = "";

  for (let i in uniqueTypes) {
    htmlTypes +=
      '<li><input  type="checkbox" class="check" id="' +
      uniqueTypes[i] +
      '" name="header__tags" value="' +
      uniqueTypes[i] +
      '"> <label class="labeltags ' +
      uniqueTypes[i] +
      '" for="' +
      uniqueTypes[i] +
      '"> #' +
      uniqueTypes[i] +
      "</label></li>";
  }
  elTypes.innerHTML = htmlTypes;
}
function FetchAll(photographers) {
  // Selection de l'élément

  let elPhotographers = document.getElementById("photographers");

  let htmlPhotographers = "";

  for (let i in photographers) {
    htmlPhotographers +=
      '<a class="lien" href="pages/photographerPage.html?id=' +
      photographers[i].id +
      '"><article class="card" role="image"><img class="card__portrait" src="photos/PhotographersIDPhotos/' +
      photographers[i].portrait +
      '" alt="' +
      photographers[i].name +
      '" />';

    htmlPhotographers +=
      '<div class="card__name" role="link"><h2>' +
      photographers[i].name +
      "</h2></div>";

    htmlPhotographers +=
      '<div class="card__country" role="text paragraph"><h3>' +
      photographers[i].country +
      ", " +
      photographers[i].city +
      "</h3></div>";

    htmlPhotographers +=
      '<div class="card__tagline" role="text paragraph"><h4>' +
      photographers[i].tagline +
      "</h4></div>";

    htmlPhotographers +=
      '<div class="card__price" role="text paragraph"><h5>' +
      photographers[i].price +
      "€/jour</h5></div>";

    htmlPhotographers += '<div class="card__tags" role="link">';
    for (let j in photographers[i].tags) {
      htmlPhotographers +=
        '<h6 class="labeltags">#' + photographers[i].tags[j] + "</h6>";
    }
    htmlPhotographers += "</div>";

    htmlPhotographers += "</article></a>";
  }

  // Affichage de l'ensemble des lignes en HTML
  elPhotographers.innerHTML = htmlPhotographers;
}
// Retourne les photographes filtrés
function FilterByType(photographers) {
  // Affiche les checkboxes

  let checkboxes = document.querySelectorAll("input");
  let arrType = [];
  let filteredTags;
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
          filteredTags = photographers.filter(
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

        FetchAll(filteredTags);
      } else {
        // Reset (aucune case cochée)
        FetchAll(photographers);
      }
    });
  }
}
fetchData((photographers) => {
  DisplayFilters(photographers);
  FetchAll(photographers);
  FilterByType(photographers);
});
