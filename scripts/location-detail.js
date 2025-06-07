/**
 * Location Detail Page Script
 * This script loads one specific location and shows its info and all its residents.
 */

// Step 1: Get ID from URL
const params = new URLSearchParams(window.location.search);
const locationId = params.get("id");

// Step 2: Check if ID is valid
if (!locationId || isNaN(locationId)) {
  alert("Invalid location ID.");
} else {
  loadLocationDetails(locationId);
}

/**
 * This function loads the location data and residents
 */
function loadLocationDetails(id) {
  // Step 3: Show loading state
  const container = document.getElementById("location-detail");
  container.innerHTML = "<p>Loading...</p>";

  // Step 4: Fetch the location data
  fetch(`https://rickandmortyapi.com/api/location/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch location data");
      }
      return res.json();
    })
    .then((location) => {
      // Step 5: Get character IDs from resident URLs
      const ids = location.residents.map((url) => url.split("/").pop());

      // If there are no residents, update UI now
      if (ids.length === 0) {
        updateUI(location, []);
        return;
      }

      // Step 6: Fetch all resident characters in one call
      fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`)
        .then((res) => res.json())
        .then((characters) => {
          // characters can be array or object (if one)
          const residentArr = Array.isArray(characters)
            ? characters
            : [characters];
          updateUI(location, residentArr);
        });
    })
    .catch((err) => {
      container.innerHTML = "<p>Error loading location.</p>";
      console.error(err);
    });
}

/**
 * This function updates the page with location + residents
 */
function updateUI(location, residents) {
  const container = document.getElementById("location-detail");
  container.innerHTML = ""; // Clear loading message

  // Create and add location title
  const title = document.createElement("h2");
  title.textContent = location.name;
  container.appendChild(title);

  // Add basic info
  const type = document.createElement("p");
  type.textContent = `Type: ${location.type}`;
  container.appendChild(type);

  const dimension = document.createElement("p");
  dimension.textContent = `Dimension: ${location.dimension}`;
  container.appendChild(dimension);

  // Residents Section
  if (residents.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No residents in this location.";
    container.appendChild(msg);
  } else {
    // Horizontal scroll container
    const scrollRow = document.createElement("div");
    scrollRow.className = "residents-scroll-row";

    residents.forEach((char) => {
      const card = document.createElement("div");
      card.className = "card character-card";

      const img = document.createElement("img");
      img.src = char.image;
      img.alt = char.name;

      const name = document.createElement("h3");
      name.textContent = char.name;

      const species = document.createElement("p");
      species.textContent = `Species: ${char.species}`;

      const status = document.createElement("p");
      status.textContent = `Status: ${char.status}`;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(species);
      card.appendChild(status);

      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = `character-detail.html?id=${char.id}`;
      });

      scrollRow.appendChild(card);
    });
    container.appendChild(scrollRow);
  }
}
