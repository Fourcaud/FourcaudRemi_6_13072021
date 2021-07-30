export function filterByLike(mediaDuPhotographe, fetchAllMedia) {
  // Affiche les checkboxes
  let filteredLike = [];
  filteredLike = mediaDuPhotographe;
  filteredLike.sort((a, b) => b.likes - a.likes);

  fetchAllMedia(filteredLike);
}
export function filterByDate(mediaDuPhotographe, fetchAllMedia) {
  // Affiche les checkboxes
  let filteredDate = [];
  filteredDate = mediaDuPhotographe;
  filteredDate.sort((a, b) => new Date(b.date) - new Date(a.date));

  fetchAllMedia(filteredDate);
}
export function filterByName(mediaDuPhotographe, fetchAllMedia) {
  // Affiche les checkboxes
  let filteredTitle = [];
  filteredTitle = mediaDuPhotographe;
  filteredTitle.sort((a, b) => a.title.localeCompare(b.title));

  fetchAllMedia(filteredTitle);
}
