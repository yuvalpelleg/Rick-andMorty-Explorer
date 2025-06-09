import { getIdFromUrl, createLoader } from "./modules/utils.js";

/**
 * Loads and displays details for a specific episode using .then()
 * @param {string} id - The episode ID to load
 */
function loadEpisodeDetails(id) {
  const container = document.querySelector("#episode-detail");

  // Show the loader
  const loader = createLoader();
  container.appendChild(loader);

  // Step 1: Fetch episode data
  fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch episode data");
      }
      return response.json();
    })
    .then((episode) => {
      // Step 2: Get character IDs from the episode
      const characterIds = episode.characters.map((url) => getIdFromUrl(url));
      const idString = characterIds.join(",");

      // Step 3: Fetch characters using those IDs
      return fetch(`https://rickandmortyapi.com/api/character/${idString}`)
        .then((charResponse) => {
          if (!charResponse.ok) {
            throw new Error("Failed to fetch characters");
          }
          return charResponse.json();
        })
        .then((charactersData) => {
          // Normalize character data to array if it's a single object
          const characters = Array.isArray(charactersData)
            ? charactersData
            : [charactersData];

          // Step 4: Update the UI with both episode and characters
          updateUI(episode, characters);
        });
    })
    .catch((error) => {
      container.innerHTML =
        '<p class="error">Error loading episode details. Please try again later.</p>';
      console.error(error);
    })
    .finally(() => {
      loader.remove();
    });
}

/**
 * Updates the UI with episode and character data
 * @param {Object} episode - The episode data
 * @param {Array} characters - Array of character data
 */
function updateUI(episode, characters) {
  const container = document.querySelector("#episode-detail");
  container.innerHTML = "";

  const header = document.createElement("div");
  header.className = "episode-header";

  const title = document.createElement("h2");
  title.textContent = episode.name;

  const airDate = document.createElement("p");
  airDate.textContent = `Air Date: ${episode.air_date}`;

  const code = document.createElement("p");
  code.textContent = `Episode Code: ${episode.episode}`;

  header.append(title, airDate, code);
  container.append(header);

  const sectionTitle = document.createElement("h3");
  sectionTitle.textContent = "Characters in this episode";
  container.append(sectionTitle);

  const scrollBar = document.createElement("div");
  scrollBar.className = "episodes-scroll-bar";

  characters.forEach((char) => {
    const card = document.createElement("a");
    card.className = "card character-card";
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
    scrollBar.appendChild(card);
  });

  container.append(scrollBar);
}

const params = new URLSearchParams(window.location.search);
const episodeId = params.get("id");

if (episodeId && !isNaN(episodeId)) {
  loadEpisodeDetails(episodeId);
} else {
  const container = document.querySelector("#episode-detail");
  container.innerHTML = `<p class="error">Invalid episode ID.</p>`;
}
