/**
 * Characters Page Script
 * Handles the display and interaction of the characters list page
 */

// State management for the characters page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with character data
 * @param {Object} data - The character data from the API
 * @param {Array} data.results - Array of character objects
 * @param {Object} data.info - Pagination information
 */

function updateUI(characterArr) {
  // TODO: Implement the UI update
  // 1. Get the grid element
  const grid = document.getElementById("character-grid");
  // 2. Clear existing content
  grid.innerHTML = "";
  // 3. For each character in data.results:
  //    - Create a card element
  characterArr.forEach((character) => {
    //    - Add character image, name, status, species, location
    const characterCard = document.createElement("div");
    characterCard.classList.add("card");
    characterCard.classList.add("character-card");
    grid.appendChild(characterCard);

    //image- creating the div, adding the classes and appending.
    const characterIMG = document.createElement("div");
    characterIMG.classList.add("img");
    characterIMG.classList.add("character-img");
    characterCard.appendChild(characterIMG);
    // creating an image itself and appending it into the image holder.
    const profileImage = document.createElement("img");
    profileImage.src = character.image;
    characterIMG.appendChild(profileImage);

    // info- name, status, species, location
    // first creating the div for the information
    const characterInfo = document.createElement("div");
    characterInfo.classList.add("info");
    characterInfo.classList.add("character-info");
    characterCard.appendChild(characterInfo);
    // now filling in the information
    // Character Name
    const nameElem = document.createElement("h2");
    nameElem.textContent = character.name;
    characterInfo.appendChild(nameElem);
    // Status and Species
    const statusSpeciesElem = document.createElement("p");
    statusSpeciesElem.textContent = `${character.status} - ${character.species}`;
    characterInfo.appendChild(statusSpeciesElem);
    // Location
    const locationElem = document.createElement("p");
    locationElem.textContent = `Location: ${character.location.name}`;
    characterInfo.appendChild(locationElem);

    //    - Make the card clickable (link to character-detail.html)
    characterCard.style.cursor = "pointer";
    characterCard.addEventListener("click", () => {
      window.location.href = `character-detail.html?id=${character.id}`;
    });
  });

  // 4. Update pagination UI
  // throw new Error("updateUI not implemented");
}
function updatePagination(info) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Create a button for each page
  for (let i = 1; i <= info.pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    // Highlight current page
    if (i === state.page) {
      btn.disabled = true;
      btn.classList.toggle("active-page");
    }

    // Update state and reload on click
    btn.addEventListener("click", () => {
      state.page = i;
      loadCharacters();
    });

    pagination.appendChild(btn);
  }
}
/**
 * Loads character data from the API
 */
function loadCharacters() {
  // TODO: Implement character loading
  // 1. Show loading state
  // 2. Fetch character data using the API module
  // 3. Update UI with the results
  // 4. Handle any errors
  // 5. Hide loading state

  const url = `https://rickandmortyapi.com/api/character?page=${state.page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.data = data;
      updateUI(data.results);
      updatePagination(data.info);
    });
  // throw new Error("loadCharacters not implemented");
}
loadCharacters();
// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadCharacters() on page load
