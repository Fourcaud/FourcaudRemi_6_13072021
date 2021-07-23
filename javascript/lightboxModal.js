// -----------------------------------------------------------------------------
// This file contains styles that are specific to the home page.
// -----------------------------------------------------------------------------
export function filterByName(mediaDuPhotographe, fetchAllMedia) {
  // Affiche les checkboxes
  let filteredTitle = [];
  filteredTitle = mediaDuPhotographe;
  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));

  fetchAllMedia(filteredTitle);
}
