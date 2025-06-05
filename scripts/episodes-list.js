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
function updateUI(data) {
  const grid = document.querySelector("#episodes-grid"); //Find the grid element in the HTML
  grid.innerHTML = ""; //empty the old episodes and new ones are fetched

  data.results.forEach((episode) => {
    const card = document.createElement("div"); //create card element
    card.classList.add("card");

    const name = document.createElement("h3"); //create episode name element
    name.textContent = episode.ep_name;

    const airDate = document.createElement("p"); //create air date element
    airDate.textContent = `Air Date: ${episode.air_date}`;

    const code = document.createElement("p"); //create code element
    code.textContent = `Episode Code: ${episode.ep_code}`;

    const charCount = document.createElement("p"); //create character count element
    charCount.textContent = `Character Count: ${episode.char_count}`;

    const link = document.createElement("a"); //makes the card clickable
    link.href = `episode-detail.html?id=${episode.id}`; //link to episode-detail
    link.textContent = "View Details"; //text when hovering over the card

    card.append(name, code, airDate, charCount, link); //appends the elements into the card element
    grid.appendChild(card); //displays the card in the episodes list
  });

  // TODO: Implement the UI update
  // 1. Get the grid element
  // 2. Clear existing content
  // 3. For each episode in data.results:
  //    - Create a card element
  //    - Add episode name, air date, episode code, and character count
  //    - Make the card clickable (link to episode-detail.html)
  // 4. Update pagination UI
  throw new Error("updateUI not implemented");
}

/**
 * Loads episode data from the API
 */
function loadEpisodes() {
  const grid = document.querySelector("#episodes-grid");
  grid.innerHTML = "";
  const loader = createLoader();
  grid.appendChild(loader);

  let url = `https://rickandmortyapi.com/api/episode?page=${state.page}`;
  if (state.search) {
    url += `&name=${state.search}`;
  }

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load episodes");
      return res.json();
    })
    .then((data) => {
      state.data = data;
      updateUI(data);
    })
    .catch((err) => {
      showError("Episodes could not be loaded.");
    })
    .finally(() => {
      loader.remove();
    });
}

// Event Listeners
document.querySelector("#prev-page").addEventListener("click", () => {
  if (state.page > 1) {
    state.page--;
    loadEpisodes();
  }
});

document.querySelector("#next-page").addEventListener("click", () => {
  state.page++;
  loadEpisodes();
});

document.querySelector("#search").addEventListener(
  "input",
  debounce((e) => {
    state.search = e.target.value.trim();
    state.page = 1;
    loadEpisodes();
  }, 500)
);

// Initial Load
loadEpisodes();

// TODO: Add event listeners
// 1. Previous page button click
// 2. Next page button click
// 3. Search input with debounce
// 4. Call loadEpisodes() on page load
