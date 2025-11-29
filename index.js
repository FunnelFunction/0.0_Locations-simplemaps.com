/**
 * USA Cities Database - CSV Parser
 *
 * Simple CSV-based database matching the format from:
 * https://github.com/grammakov/USA-cities-and-states
 *
 * Main files:
 * - us_cities_states_counties.csv (basic data, pipe-delimited)
 * - us_cities_states_counties_zips.csv (extended with ZIP codes, coordinates, population)
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse a pipe-delimited CSV file
 * @param {string} filename - Name of the CSV file to parse
 * @returns {Array} Array of parsed rows
 */
function parseCSV(filename) {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');

  // First line is header
  const headers = lines[0].split('|').map(h => h.trim());

  // Parse remaining lines
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('|');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

/**
 * Load basic cities data
 * Format: City|State short|State full|County|City alias
 */
function loadCities() {
  return parseCSV('us_cities_states_counties.csv');
}

/**
 * Load extended cities data with ZIP codes
 * Format: City|State short|State full|County|Latitude|Longitude|ZIP codes|Population|Density|Timezone
 */
function loadCitiesExtended() {
  return parseCSV('us_cities_states_counties_zips.csv');
}

/**
 * Load states data
 */
function loadStates() {
  return parseCSV('states.csv');
}

/**
 * Load counties data
 */
function loadCounties() {
  return parseCSV('counties.csv');
}

/**
 * Get cities by state (using basic data)
 * @param {string} stateCode - Two-letter state code (e.g., 'CA', 'NY')
 * @returns {Array} Cities in the state
 */
function getCitiesByState(stateCode) {
  const cities = loadCities();
  return cities.filter(city => city['State short'] === stateCode.toUpperCase());
}

/**
 * Get cities by state name (using basic data)
 * @param {string} stateName - Full state name (e.g., 'California')
 * @returns {Array} Cities in the state
 */
function getCitiesByStateName(stateName) {
  const cities = loadCities();
  return cities.filter(city =>
    city['State full'].toLowerCase() === stateName.toLowerCase()
  );
}

/**
 * Search cities by name (using basic data)
 * @param {string} searchTerm - City name to search for
 * @returns {Array} Matching cities
 */
function searchCities(searchTerm) {
  const cities = loadCities();
  const term = searchTerm.toLowerCase();
  return cities.filter(city =>
    city['City'].toLowerCase().includes(term)
  );
}

/**
 * Get cities by ZIP code (using extended data)
 * @param {string} zipCode - ZIP code to search for
 * @returns {Array} Cities containing this ZIP code
 */
function getCitiesByZip(zipCode) {
  const cities = loadCitiesExtended();
  return cities.filter(city => {
    const zips = city['ZIP codes'] || '';
    return zips.split(',').map(z => z.trim()).includes(zipCode);
  });
}

/**
 * Get all unique states
 * @returns {Array} Array of state objects
 */
function getAllStates() {
  return loadStates();
}

/**
 * Get all counties
 * @returns {Array} Array of county objects
 */
function getAllCounties() {
  return loadCounties();
}

// Export functions
module.exports = {
  // CSV Parsers
  loadCities,
  loadCitiesExtended,
  loadStates,
  loadCounties,
  parseCSV,

  // Helper functions
  getCitiesByState,
  getCitiesByStateName,
  searchCities,
  getCitiesByZip,
  getAllStates,
  getAllCounties
};
