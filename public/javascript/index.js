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

  // Affiche les films (tous par défaut)
  this.FetchAll = function (data) {
    // Selection de l'élément
    let elPhotographers = document.getElementById("photographers");

    let htmlPhotographers = "";

    for (let i in data) {
      htmlPhotographers +=
        '<article class="card mb-3"><div class="card-header">';
      for (let j in data[i].tags) {
        htmlPhotographers +=
          '<i class="fa fa-tag" aria-hidden="true"></i> ' +
          data[i].tags[j] +
          " ";
      }
      htmlPhotographers += "</div>";
      htmlPhotographers +=
        '<div class="card-block"><h2>' + data[i].name + "</h2></div>";
      htmlPhotographers +=
        '<div class="card-footer text-muted text-center"> <i class="fa fa-calendar" aria-hidden="true"></i> ' +
        data[i].price +
        "</div>";
      htmlPhotographers += "</article>";
    }

    // Affichage de l'ensemble des lignes en HTML
    elPhotographers.innerHTML = htmlPhotographers;

    // Affiche le nombre de films
    this.Count(data);
  };

  // Retourne le nombre de films
  this.Count = (data) =>
    (document.getElementById("count").innerHTML =
      data.length + " photographers");

  // Retourne la liste des checkboxes
  this.DisplayFilters = function () {
    // Selection de l'élément
    let elTypes = document.getElementById("header__tags");
    let types = [];

    // Chaque ligne (film)
    for (let i in photographers) {
      // Chaque "type" dans chaque ligne (film)
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
        '" name="header__tags[]" value="' +
        uniqueTypes[i] +
        '"> <label for="' +
        uniqueTypes[i] +
        '">' +
        uniqueTypes[i] +
        "</label></li>";
    }

    elTypes.innerHTML = htmlTypes;
  };

  // Retourne les films filtrés
  this.FilterByType = function () {
    // Afiche les checkboxes
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
