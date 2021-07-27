/* (() => {
  "use strict";
  let t = 0,
    e = 0,
    i = [];
  function a(e) {
    const a = parseInt(new URLSearchParams(window.location.search).get("id"));
    let n = document.getElementById("media"),
      o = "",
      s = e.filter((t) => t.photographerId === a);
    i = s;
    for (let e in s) {
      s[e].image
        ? (o +=
            '<article class="item"><img class="item__photo" src="../photos/' +
            s[e].photographerId +
            "/" +
            s[e].image +
            '" alt="' +
            s[e].title +
            '" />')
        : (o +=
            '<article class="item"><video autoplay class="item__video"> <source src="../photos/' +
            s[e].photographerId +
            "/" +
            s[e].video +
            '"  type="video/mp4"  ></video>'),
        (o +=
          '<div class="item__flex"><div class="item__name"><h2>' +
          s[e].title +
          "</h2></div>");
      const i = parseInt(s[e].likes, 16);
      (o += `<div class="item__tagline"><h3>${i}</h3> <i onclick="myFunction(this)" class="far fa-heart"></i></div>`),
        (t += i),
        (o += "</div></div>"),
        (o += "</article>"),
        (n.innerHTML = o);
    }
  }
  var n;
  (n = (i, n) => {
    a(n),
      (function (t) {
        const i = parseInt(
          new URLSearchParams(window.location.search).get("id")
        );
        let a = document.getElementById("photographers"),
          n = "";
        const o = t.find((t) => t.id === i);
        (n += `<article class="card"><img class="card__portrait" src="../photos/PhotographersIDPhotos/${o.portrait}" alt="${o.name}" />`),
          (n += '<div class="card__name"><h2>' + o.name + "</h2></div>"),
          (n +=
            '<div class="card__country"><h3>' +
            o.country +
            ", " +
            o.city +
            "</h3></div>"),
          (n += '<div class="card__tagline"><h4>' + o.tagline + "</h4></div>"),
          (n +=
            '<div class="card__price"><h5>' + o.price + "€/jour</h5></div>"),
          (e = o.price),
          (n += '<div class="card__tags ">');
        for (let t in o.tags)
          n += '<h6 class="labeltags">#' + o.tags[t] + "</h6>";
        (n += "</div>"), (n += "</article>"), (a.innerHTML = n);
      })(i),
      (function () {
        let i = document.getElementById("like-prix"),
          a = "";
        (a += `<div>${t}<i class="fas fa-heart"></i></div>`),
          (a += `<div>${e}€/jour</div>`),
          (i.innerHTML = a);
      })();
  }),
    fetch("http://127.0.0.1:5500/public/FishEyeData.json")
      .then((t) => t.json())
      .then((t) => {
        n(t.photographers, t.media);
      }),
    document
      .getElementById("populariteTrie")
      .addEventListener("click", function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          (function () {
            let t = [];
            (t = i), t.sort((t, e) => e.likes - t.likes), a(t);
          })();
      }),
    document.getElementById("dateTrie").addEventListener("click", function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        (function () {
          let t = [];
          (t = i), t.sort((t, e) => new Date(e.date) - new Date(t.date)), a(t);
        })();
    }),
    document
      .getElementById("titreTrie")
      .addEventListener("click", function (t) {
        t.preventDefault(),
          t.stopPropagation(),
          (function (t) {
            let e = [];
            (e = t),
              e.sort((t, e) => t.title.localeCompare(e.title)),
              fetchAllMedia(e);
          })(i);
      });
})();
 */
