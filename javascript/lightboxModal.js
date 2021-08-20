function lightbox(mediaDuPhotographe) {
  const modalbg = document.querySelector(".bground-lightbox");
  const closeBtn = document.querySelectorAll(".close-lightbox");
  let mediaModif = 0;
  closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

  function closeModal() {
    modalbg.style.display = "none";
  }
  function lightboxModalEnter(x) {
    document.addEventListener("keydown", function (event) {
      if (
        event.target.localName == "img" ||
        event.target.localName == "video"
      ) {
        if (event.key === "Enter") {
          lightboxModal(x);
        }
      }
    });
  }
  window.lightboxModalEnter = lightboxModalEnter;
  function lightboxModal(x) {
    const selectMedia = document.getElementById("modal-body-lightbox");
    const modalbg = document.querySelector(".bground-lightbox");
    modalbg.style.display = "block";

    let lightboxMedia = "";

    if (mediaDuPhotographe[x].image) {
      lightboxMedia += `<article class="item-lightbox" id="item-lightbox" data-id="${x}"><div class="item-lightbox__flex"><i class="fas fa-chevron-left" onclick="changeMediaLeft(${x})" ></i><img id="${mediaDuPhotographe[x].id}" class="item-lightbox__photo" src="../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].image}" alt="${mediaDuPhotographe[x].title}" /><i class="fas fa-chevron-right" onclick="changeMediaRight(${x})" ></i></div>`;
    } else {
      lightboxMedia += `<article class="item-lightbox" id="item-lightbox" data-id="${x}"><div class="item-lightbox__flex"><i class="fas fa-chevron-left" onclick="changeMediaLeft(${x})" ></i><video id="${mediaDuPhotographe[x].id}" autoplay class="item-lightbox__video"><source src="../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].video}" alt="${mediaDuPhotographe[x].title}"  type="video/mp4" ></video><i class="fas fa-chevron-right" onclick="changeMediaRight(${x})" ></i></div>`;
    }

    lightboxMedia += `<div class="item-lightbox__titreMedia">${mediaDuPhotographe[x].title}</div>`;
    lightboxMedia += "</article>";

    selectMedia.innerHTML = lightboxMedia;
  }
  window.lightboxModal = lightboxModal;

  document.addEventListener("keydown", touchedown);
  function touchedown(event) {
    let mediaLive = document.getElementById("item-lightbox");

    if (mediaLive) {
      let x = mediaLive.getAttribute("data-id");
      if (event.key === "ArrowLeft") {
        changeMediaLeft(x);
      } else if (event.key === "ArrowRight") {
        changeMediaRight(x);
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  }

  window.touchedown = touchedown;
  function changeMediaLeft(y) {
    y--;
    lightboxModal(y);
  }
  function changeMediaRight(y) {
    y++;
    lightboxModal(y);
  }
  window.changeMediaLeft = changeMediaLeft;
  window.changeMediaRight = changeMediaRight;
}

export default lightbox;
