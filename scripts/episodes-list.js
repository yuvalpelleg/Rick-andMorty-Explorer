/**
 * Episodes Page Script
 * Handles the display and interaction of the episodes list page
 */

// State management for the episodes page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 
 */
function updateUI(episodeArr) {
  const grid = document.getElementById("episodes-grid");
  grid.innerHTML = "";
  episodeArr.forEach((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("card", "episode-card");
    grid.appendChild(episodeCard);

    const nameElem = document.createElement("h3");
    nameElem.textContent = episode.name;
    episodeCard.appendChild(nameElem);

    const codeElem = document.createElement("p");
    codeElem.textContent = `Episode Code: ${episode.episode}`;
    episodeCard.appendChild(codeElem);

    const airDateElem = document.createElement("p");
    airDateElem.textContent = `Air Date: ${episode.air_date}`;
    episodeCard.appendChild(airDateElem);

    const charCountElem = document.createElement("p");
    charCountElem.textContent = `Character Count: ${episode.characters.length}`;
    episodeCard.appendChild(charCountElem);

    // Make the card clickable (link to episode-detail.html)
    episodeCard.style.cursor = "pointer";
    episodeCard.addEventListener("click", () => {
      window.location.href = `episode-detail.html?id=${episode.id}`;
    });
  });

  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each episode in data.results:
  //    - Create a card element
  //    - Add episode name, air date, episode code, and character count
  //    - Make the card clickable (link to episode-detail.html)
  // 4. Update pagination UI
  //   throw new Error("updateUI not implemented");
}

function updatePagination(info) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= info.pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === state.page) {
      btn.disabled = true;
      btn.classList.add("active-page");
    }
    btn.addEventListener("click", () => {
      state.page = i;
      loadEpisodes();
    });
    pagination.appendChild(btn);
  }
}

/**
 * Loads episode data from the API
 */
function loadEpisodes() {
  const grid = document.getElementById("episodes-grid");
  grid.innerHTML = "<p>Loading...</p>";

  let url = `https://rickandmortyapi.com/api/episode?page=${state.page}`;
  if (state.search) {
    url += `&name=${encodeURIComponent(state.search)}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.data = data;
      updateUI(data.results);
      updatePagination(data.info);
    });
}

// // Event Listeners
// document.querySelector("#prev-page").addEventListener("click", () => {
//   if (state.page > 1) {
//     state.page--;
//     loadEpisodes();
//   }
// });

// document.querySelector("#next-page").addEventListener("click", () => {
//   state.page++;
//   loadEpisodes();
// });

// document.querySelector("#search").addEventListener(
//   "input",
//   debounce((e) => {
//     state.search = e.target.value.trim();
//     state.page = 1;
//     loadEpisodes();
//   }, 500)
// );

// Initial Load
loadEpisodes();

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
