/**
 * Locations Page Script
 * Handles the display and interaction of the locations list page
 */

// State management for the locations page
const state = {
  page: 1,
  data: null,
  search: "",
};

/**
 * Updates the UI with location data
 * @param {Array} locations - Array of location objects
 */
function updateUI(locations) {
  // 1. Get the grid element
  const grid = document.getElementById("location-grid");
  // 2. Clear existing content
  grid.innerHTML = "";
  // 3. For each location in data.results:
  locations.forEach((location) => {
    //    - Create a card element
    const locationCard = document.createElement("div");
    locationCard.classList.add("card");
    locationCard.classList.add("location-card");
    locationCard.style.cursor = "pointer"; // Make it look clickable

    //    - Add location name
    const nameElem = document.createElement("h2");
    nameElem.textContent = location.name;
    locationCard.appendChild(nameElem);

    //    - Add type and dimension
    const typeElem = document.createElement("p");
    typeElem.textContent = `Type: ${location.type}`;
    locationCard.appendChild(typeElem);

    const dimensionElem = document.createElement("p");
    dimensionElem.textContent = `Dimension: ${location.dimension}`;
    locationCard.appendChild(dimensionElem);

    //    - Add resident count
    const residentCountElem = document.createElement("p");
    residentCountElem.textContent = `Residents: ${location.residents.length}`;
    locationCard.appendChild(residentCountElem);

    //    - Make the card clickable (link to location-detail.html)
    locationCard.addEventListener("click", () => {
      window.location.href = `location-detail.html?id=${location.id}`;
    });

    //    - Append the card to the grid
    grid.appendChild(locationCard);
  });
  // 4. Update pagination UI
  updatePagination(state.data.info);
}

/**
 * Loads location data from the API
 */
function loadLocations() {
  // 1. Show loading state
  const grid = document.getElementById("location-grid");
  grid.innerHTML = "<p>Loading...</p>";

  // 2. Fetch location data using the API module
  let url = `https://rickandmortyapi.com/api/location?page=${state.page}`;
  if (state.search) {
    url += `&name=${encodeURIComponent(state.search)}`;
  }

  fetch(url)
    .then((response) => {
      // 4. Handle any errors
      if (!response.ok) throw new Error("Failed to load locations");
      return response.json();
    })
    .then((data) => {
      // 3. Update UI with the results
      state.data = data;
      updateUI(data.results);
    })
    .catch((err) => {
      // 4. Handle any errors
      grid.innerHTML = `<p style="color:red;">${err.message}</p>`;
      document.getElementById("pagination").innerHTML = "";
    });
  // 5. Hide loading state (handled by updateUI or error)
}

/**
 * Updates the pagination UI with numbered buttons
 * @param {Object} info - Pagination information from the API
 */
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
      loadLocations();
    });

    pagination.appendChild(btn);
  }
}

// 4. Call loadLocations() on page load
loadLocations();
