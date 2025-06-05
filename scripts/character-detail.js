/**
 * Character Detail Page Script
 * Handles the display of detailed information for a single character
 */

/**
 * Loads and displays details for a specific character
 * @param {string} id - The character ID to load
 */
const searchHolder = new URLSearchParams(window.location.search);
const characterID = searchHolder.get("id");
const loadAPI = `https://rickandmortyapi.com/api/character/${characterID}`;
fetch(loadAPI)
  .then((response) => response.json())
  .then((data) => updateUI(data));

function loadCharacterDetails(id) {
  const container = document.querySelector("#episode-detail");
  const loader = createLoader(); // assumes createLoader() is defined in utils.js
  container.appendChild(loader);
  // TODO: Implement character detail loading
  // 1. Show loading state
  // 2. Fetch character data using the API module
  // 3. Extract episode IDs from character.episode URLs
  // 4. Fetch all episodes this character appears in
  // 5. Update UI with character and episode data
  // 6. Handle any errors
  // 7. Hide loading state
  throw new Error("loadCharacterDetails not implemented");
}
function getLocationId(url) {
  if (!url) return null;
  const splitArr = url.split("/");
  return splitArr.pop();
}

function updateUI(character, episodes) {
  const grid = document.getElementById("details-grid");

  // Origin
  let originLink;
  if (character.origin.url && character.origin.name !== "unknown") {
    const originId = getLocationId(character.origin.url);
    originLink = `<a href="location-detail.html?id=${originId}">${character.origin.name}</a>`;
  } else {
    originLink = character.origin.name;
  }

  // Location
  let locationLink;
  if (character.location.url && character.location.name !== "unknown") {
    const locationId = getLocationId(character.location.url);
    locationLink = `<a href="location-detail.html?id=${locationId}">${character.location.name}</a>`;
  } else {
    locationLink = character.location.name;
  }

  grid.innerHTML = `
    <div class="card character-card">
      <div class="img character-img">
        <img src="${character.image}" alt="${character.name}">
      </div>
      <div class="info character-info">
        <h2>${character.name}</h2>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Gender: ${character.gender}</p>
        <p>Origin: ${originLink}</p>
        <p>Location: ${locationLink}</p>
      </div>
    </div>
  `;
  // 4. Create episodes section with all episodes the character appears in
  // 5. Handle empty states and errors
  // throw new Error("updateUI not implemented");
}

// TODO: Initialize the page
// 1. Get character ID from URL parameters
// 2. Validate the ID
// 3. Load character details if ID is valid
// 4. Show error if ID is invalid or missing
