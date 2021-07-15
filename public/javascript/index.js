let photographers = [
  {
    name: "Mimi Keel",
    id: 243,
    city: "London",
    country: "UK",
    tags: ["portrait", "events", "travel", "animals"],
    tagline: "Voir le beau dans le quotidien",
    price: 400,
    portrait: "MimiKeel.jpg",
  },
  {
    name: "Ellie-Rose Wilkens",
    id: 930,
    city: "Paris",
    country: "France",
    tags: ["sports", "architecture"],
    tagline: "Capturer des compositions complexes",
    price: 250,
    portrait: "EllieRoseWilkens.jpg",
  },
  {
    name: "Tracy Galindo",
    id: 82,
    city: "Montreal",
    country: "Canada",
    tags: ["art", "fashion", "events"],
    tagline: "Photographe freelance",
    price: 500,
    portrait: "TracyGalindo.jpg",
  },
  {
    name: "Nabeel Bradford",
    id: 527,
    city: "Mexico City",
    country: "Mexico",
    tags: ["travel", "portrait"],
    tagline: "Toujours aller de l'avant",
    price: 350,
    portrait: "NabeelBradford.jpg",
  },
  {
    name: "Rhode Dubois",
    id: 925,
    city: "Barcelona",
    country: "Spain",
    tags: ["sport", "fashion", "events", "animals"],
    tagline: "Je crée des souvenirs",
    price: 275,
    portrait: "RhodeDubois.jpg",
  },
  {
    name: "Marcel Nikolic",
    id: 195,
    city: "Berlin",
    country: "Germany",
    tags: ["travel", "architecture"],
    tagline: "Toujours à la recherche de LA photo",
    price: 300,
    portrait: "MarcelNikolic.jpg",
  },
];

let app = new (function () {
  // Récupération des données
  this.photographers = photographers;

  // Affiche les photographes (tous par défaut)
  this.FetchAll = function (data) {
    // Selection de l'élément
    let elPhotographers = document.getElementById("photographers");

    let htmlPhotographers = "";

    for (let i in data) {
      htmlPhotographers +=
        '<article class="card"><img class="card__portrait" src="photos/PhotographersIDPhotos/' +
        data[i].portrait +
        '" alt="' +
        data[i].name +
        '" />';

      htmlPhotographers +=
        '<div class="card__name"><h2>' + data[i].name + "</h2></div>";

      htmlPhotographers +=
        '<div class="card__country"><h3>' +
        data[i].country +
        ", " +
        data[i].city +
        "</h3></div>";

      htmlPhotographers +=
        '<div class="card__tagline"><h4>' + data[i].tagline + "</h4></div>";

      htmlPhotographers +=
        '<div class="card__price"><h5>' + data[i].price + "€/jour</h5></div>";

      htmlPhotographers += '<div class="card__tags ">';
      for (let j in data[i].tags) {
        htmlPhotographers +=
          '<h6 class="labeltags">#' + data[i].tags[j] + "</h6>";
      }
      htmlPhotographers += "</div>";

      htmlPhotographers += "</article>";
    }

    // Affichage de l'ensemble des lignes en HTML
    elPhotographers.innerHTML = htmlPhotographers;
  };

  // Retourne la liste des checkboxes
  this.DisplayFilters = function () {
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
  };

  // Retourne les photographes filtrés
  this.FilterByType = function () {
    // Affiche les checkboxes
    this.DisplayFilters();

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

// Affichage de tous les films
app.FetchAll(photographers);
// Filtrage
app.FilterByType();
