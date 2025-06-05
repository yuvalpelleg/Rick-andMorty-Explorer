/**
 * Utility functions for the Rick and Morty Explorer application
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
export function debounce(func, wait) {
  let timeID = undefined;

  if (!func) {
    throw new Error("debounce not implemented");
  }

  return function (...args) {
    if (timeID) {
      clearTimeout(timeID);
    }
    timeID = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

/**
 * Extracts the numeric ID from a given Rick and Morty API URL
 * Example: "https://rickandmortyapi.com/api/character/42" → "42"
 * @param {string} url - The API URL
 * @returns {string} The extracted ID
 */
export function getIdFromUrl(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export function createLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Loading...";
  return loader;
}
