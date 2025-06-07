// /**
//  * Episode Detail Page Script
//  * Handles the display of detailed information for a single episode
//  */

// import { getIdFromUrl } from "./modules/utils";

// /**
//  * Loads and displays details for a specific episode
//  * @param {string} id - The episode ID to load
//  */
// function loadEpisodeDetails(id) {
//   // TODO: Implement episode detail loading
//   // 1. Show loading state
//   const container = document.querySelector("#episode-detail");
//   const loader = createLoader();
//   container.appendChild(loader);
//   // 2. Fetch episode data using the API module

//   fetch(`https://rickandmortyapi.com/api/episode/${id}`)
//     .then((res) => {
//       if (!res.ok) throw new error("Failed to fetch episode");
//       return res.json();
//     })
//     .then((episode) => {
//       const characterIds = episode.characters.map((url) => getIdFromUrl(url));
//       const idString = characterIds.join(", ");
//     });
//   // 3. Extract character IDs from episode.characters URLs
//   // 4. Fetch all characters that appear in this episode
//   // 5. Update UI with episode and character data
//   // 6. Handle any errors
//   // 7. Hide loading state

//   throw new Error("loadEpisodeDetails not implemented");
// }

// /**
//  * Updates the UI with episode and character data
//  * @param {Object} episode - The episode data
//  * @param {Array} characters - Array of character data
//  */
// function updateUI(episode, characters) {
//   // TODO: Implement the UI update
//   // 1. Get the detail container element
//   // 2. Create episode header with basic info
//   // 3. Create characters section
//   // 4. For each character:
//   //    - Create a card with image and basic info
//   //    - Make the card link to the character detail page
//   // 5. Handle empty states (no characters)
//   throw new Error("updateUI not implemented");
// }

// // TODO: Initialize the page
// // 1. Get episode ID from URL parameters
// // 2. Validate the ID
// // 3. Load episode details if ID is valid
// // 4. Show error if ID is invalid or missing

/**
 * Episode Detail Page Script
 * Handles the display of detailed information for a single episode
 */

// Importing a helper function to get the ID from a URL
import { getIdFromUrl, createLoader } from "./modules/utils.js";

/**
 * Loads and displays details for a specific episode
 * @param {string} id - The episode ID to load
 */
async function loadEpisodeDetails(id) {
  // Get the container where we want to show the episode
  const container = document.querySelector("#episode-detail");

  // Show a loading spinner while we wait for data
  const loader = createLoader();
  container.appendChild(loader);

  try {
    // Fetch the episode data from the API
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch episode data");
    }
    const episode = await response.json(); // Parse the response into JSON

    // Get character IDs from episode.characters array (they are URLs)
    const characterIds = episode.characters.map((url) => getIdFromUrl(url));
    const idString = characterIds.join(",");

    // Now fetch the characters that appear in this episode
    const charResponse = await fetch(
      `https://rickandmortyapi.com/api/character/${idString}`
    );
    if (!charResponse.ok) {
      throw new Error("Failed to fetch characters for this episode");
    }

    // If only one character, the API returns an object, not an array
    let characters = await charResponse.json();
    if (!Array.isArray(characters)) {
      characters = [characters];
    }

    // Everything is ready, so update the UI
    updateUI(episode, characters);
  } catch (error) {
    // If there's an error, show it on the page
    container.innerHTML = `<p class="error">Error loading episode details. Please try again later.</p>`;
    console.error(error); // Also log it for debugging
  } finally {
    // Remove the loading spinner no matter what happens
    loader.remove();
  }
}

/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {
  // Get the container where we want to show the episode info
  const container = document.querySelector("#episode-detail");
  container.innerHTML = ""; // Clear any old content

  // Create a header element for episode information
  const header = document.createElement("div");
  header.className = "episode-header";

  // Add episode name, air date, and code
  const title = document.createElement("h2");
  title.textContent = episode.name;

  const airDate = document.createElement("p");
  airDate.textContent = `Air Date: ${episode.air_date}`;

  const code = document.createElement("p");
  code.textContent = `Episode Code: ${episode.episode}`;

  // Append all to the header
  header.append(title, airDate, code);

  // Create a grid for the characters
  const grid = document.createElement("div");
  grid.className = "character-grid";

  // If there are characters, create cards for them
  if (characters.length > 0) {
    characters.forEach((char) => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = `character-detail.html?id=${char.id}`;

      const img = document.createElement("img");
      img.src = char.image;
      img.alt = `${char.name} image`;

      const name = document.createElement("h3");
      name.textContent = char.name;

      const species = document.createElement("p");
      species.textContent = `Species: ${char.species}`;

      const status = document.createElement("p");
      status.textContent = `Status: ${char.status}`;

      card.append(img, name, species, status);
      grid.appendChild(card);
    });
  } else {
    // If no characters found, show a message
    const empty = document.createElement("p");
    empty.textContent = "No characters found in this episode.";
    grid.appendChild(empty);
  }

  // Add the header and the grid to the page
  container.append(header, grid);
}

// Initialize the page
const params = new URLSearchParams(window.location.search);
const episodeId = params.get("id");

// Check if we have an ID in the URL
if (episodeId && !isNaN(episodeId)) {
  loadEpisodeDetails(episodeId); // If valid, load the episode
} else {
  // If not valid, show an error
  const container = document.querySelector("#episode-detail");
  container.innerHTML = `<p class="error">Invalid episode ID.</p>`;
}
