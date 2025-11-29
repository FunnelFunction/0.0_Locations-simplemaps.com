/**
 * USA Cities Database
 * Comprehensive database of US cities, counties, and states
 *
 * Data includes:
 * - 31,000+ cities across all 50 states, DC, and territories
 * - Geographic coordinates (latitude/longitude)
 * - ZIP codes
 * - Population and density data
 * - Timezone information
 * - County associations
 */

const cities = require('./cities.json');
const states = require('./states.json');
const counties = require('./counties.json');

/**
 * Get all cities
 * @returns {Array} Array of all city objects
 */
function getAllCities() {
  return cities;
}

/**
 * Get all states
 * @returns {Array} Array of all state objects
 */
function getAllStates() {
  return states;
}

/**
 * Get all counties
 * @returns {Array} Array of all county objects
 */
function getAllCounties() {
  return counties;
}

/**
 * Get cities by state
 * @param {string} stateId - Two-letter state code (e.g., 'CA', 'NY')
 * @returns {Array} Array of cities in the specified state
 */
function getCitiesByState(stateId) {
  return cities.filter(city => city.state_id === stateId.toUpperCase());
}

/**
 * Get cities by state name
 * @param {string} stateName - Full state name (e.g., 'California', 'New York')
 * @returns {Array} Array of cities in the specified state
 */
function getCitiesByStateName(stateName) {
  return cities.filter(city =>
    city.state_name.toLowerCase() === stateName.toLowerCase()
  );
}

/**
 * Get counties by state
 * @param {string} stateId - Two-letter state code (e.g., 'CA', 'NY')
 * @returns {Array} Array of counties in the specified state
 */
function getCountiesByState(stateId) {
  return counties.filter(county => county.state_id === stateId.toUpperCase());
}

/**
 * Search cities by name
 * @param {string} cityName - City name to search for (case-insensitive, partial match)
 * @returns {Array} Array of matching cities
 */
function searchCities(cityName) {
  const search = cityName.toLowerCase();
  return cities.filter(city =>
    city.city_ascii.toLowerCase().includes(search)
  );
}

/**
 * Get city by exact name and state
 * @param {string} cityName - City name
 * @param {string} stateId - Two-letter state code (e.g., 'CA', 'NY')
 * @returns {Object|null} City object or null if not found
 */
function getCity(cityName, stateId) {
  return cities.find(city =>
    city.city_ascii.toLowerCase() === cityName.toLowerCase() &&
    city.state_id === stateId.toUpperCase()
  ) || null;
}

/**
 * Get cities by ZIP code
 * @param {string} zipCode - ZIP code to search for
 * @returns {Array} Array of cities containing this ZIP code
 */
function getCitiesByZip(zipCode) {
  return cities.filter(city =>
    city.zips && city.zips.split(',').includes(zipCode)
  );
}

/**
 * Get cities within radius of coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radiusMiles - Radius in miles
 * @returns {Array} Array of cities within the radius
 */
function getCitiesNearby(lat, lng, radiusMiles) {
  const radiusInDegrees = radiusMiles / 69; // Rough conversion

  return cities.filter(city => {
    const cityLat = parseFloat(city.lat);
    const cityLng = parseFloat(city.lng);
    const distance = Math.sqrt(
      Math.pow(cityLat - lat, 2) + Math.pow(cityLng - lng, 2)
    );
    return distance <= radiusInDegrees;
  });
}

/**
 * Get state by ID
 * @param {string} stateId - Two-letter state code (e.g., 'CA', 'NY')
 * @returns {Object|null} State object or null if not found
 */
function getState(stateId) {
  return states.find(state =>
    state.state_id === stateId.toUpperCase()
  ) || null;
}

/**
 * Get state by name
 * @param {string} stateName - Full state name (e.g., 'California')
 * @returns {Object|null} State object or null if not found
 */
function getStateByName(stateName) {
  return states.find(state =>
    state.state_name.toLowerCase() === stateName.toLowerCase()
  ) || null;
}

module.exports = {
  // Data
  cities,
  states,
  counties,

  // Functions
  getAllCities,
  getAllStates,
  getAllCounties,
  getCitiesByState,
  getCitiesByStateName,
  getCountiesByState,
  searchCities,
  getCity,
  getCitiesByZip,
  getCitiesNearby,
  getState,
  getStateByName
};
