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

//debounce function to limit the number of API calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
/**
 * Updates the UI with episode data
 * @param {Object} data - The episode data from the API
 * @param {Array} data.results - Array of episode objects
 * @param {Object} data.info - Pagination information
 
 */
function updateUI(episodeArr) {
  const grid = document.getElementById("episodes-grid");
  grid.innerHTML = "";
  if (!Array.isArray(episodeArr) || episodeArr.length === 0) {
    grid.innerHTML = "<p>No episodes found.</p>";
    return;
  }
  episodeArr.forEach((episode) => {
    // Card container styled like character cards
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("card");
    episodeCard.style.cursor = "pointer";

    // Info section (like character-info)
    const episodeInfo = document.createElement("div");
    episodeInfo.classList.add("info", "episode-info");

    // Name
    const nameElem = document.createElement("h2");
    nameElem.textContent = episode.name;
    episodeInfo.appendChild(nameElem);

    // Episode code
    const codeElem = document.createElement("p");
    codeElem.textContent = `Episode: ${episode.episode}`;
    episodeInfo.appendChild(codeElem);

    // Air date
    const airDateElem = document.createElement("p");
    airDateElem.textContent = `Air Date: ${episode.air_date}`;
    episodeInfo.appendChild(airDateElem);

    // Character count
    const charCountElem = document.createElement("p");
    charCountElem.textContent = `Characters: ${episode.characters.length}`;
    episodeInfo.appendChild(charCountElem);

    episodeCard.appendChild(episodeInfo);

    // Make the card clickable (link to episode-detail.html)
    episodeCard.addEventListener("click", () => {
      window.location.href = `episode-detail.html?id=${episode.id}`;
    });

    grid.appendChild(episodeCard);
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

  let url =
    `https://rickandmortyapi.com/api/episode?page=${state.page}` +
    (state.search ? `&name=${encodeURIComponent(state.search)}` : "");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      state.data = data;
      updateUI(data.results);
      updatePagination(data.info);
    })
    .catch((error) => {
      grid.innerHTML = `<p class="error">Failed to load episodes. Please try again later.</p>`;
      console.error("Fetch error:", error);
    });
}

// Debounced search event listener for episodes
const searchInput = document.getElementById("search");
searchInput.addEventListener(
  "input",
  debounce(function () {
    state.search = this.value.trim();
    state.page = 1;
    loadEpisodes();
  }, 300)
);
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
