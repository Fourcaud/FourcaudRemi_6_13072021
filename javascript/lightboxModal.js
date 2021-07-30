function lightbox(mediaDuPhotographe) {
  const modalbg = document.querySelector(".bground-lightbox");
  const closeBtn = document.querySelectorAll(".close-lightbox");

  closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

  function closeModal() {
    modalbg.style.display = "none";
  }

  function lightboxModal(x) {
    const selectMedia = document.getElementById("modal-body-lightbox");
    const modalbg = document.querySelector(".bground-lightbox");
    modalbg.style.display = "block";
    let lightboxMedia = "";

    if (mediaDuPhotographe[x].image) {
      lightboxMedia += `<article class="item-lightbox"><i class="fas fa-chevron-left"></i><img id="${mediaDuPhotographe[x].id}" class="item-lightbox__photo" src="../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].image}" alt="${mediaDuPhotographe[x].title}" /><i class="fas fa-chevron-right"></i>`;
    } else {
      lightboxMedia += `<article class="item-lightbox"><i class="fas fa-chevron-left"></i><video id="${mediaDuPhotographe[x].id}" autoplay class="item-lightbox__video"><source src="../photos/${mediaDuPhotographe[x].photographerId}/${mediaDuPhotographe[x].video}" alt="${mediaDuPhotographe[x].title}"  type="video/mp4" ></video><i class="fas fa-chevron-right"></i>`;
    }
    lightboxMedia += "</article>";
    selectMedia.innerHTML = lightboxMedia;
  }
  window.lightboxModal = lightboxModal;
}

export default lightbox;
