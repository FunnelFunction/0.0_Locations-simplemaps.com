/**
 * TypeScript definitions for USA Cities Database (CSV-based)
 */

export interface CityBasic {
  City: string;
  'State short': string;
  'State full': string;
  County: string;
  'City alias': string;
}

export interface CityExtended {
  City: string;
  'State short': string;
  'State full': string;
  County: string;
  Latitude: string;
  Longitude: string;
  'ZIP codes': string;
  Population: string;
  Density: string;
  Timezone: string;
}

export interface State {
  state_id: string;
  state_name: string;
}

export interface County {
  state_id: string;
  state_name: string;
  county_name: string;
}

/**
 * Parse a pipe-delimited CSV file
 */
export function parseCSV(filename: string): any[];

/**
 * Load basic cities data
 */
export function loadCities(): CityBasic[];

/**
 * Load extended cities data with ZIP codes, coordinates, population
 */
export function loadCitiesExtended(): CityExtended[];

/**
 * Load states data
 */
export function loadStates(): State[];

/**
 * Load counties data
 */
export function loadCounties(): County[];

/**
 * Get cities by state code
 */
export function getCitiesByState(stateCode: string): CityBasic[];

/**
 * Get cities by state name
 */
export function getCitiesByStateName(stateName: string): CityBasic[];

/**
 * Search cities by name
 */
export function searchCities(searchTerm: string): CityBasic[];

/**
 * Get cities by ZIP code
 */
export function getCitiesByZip(zipCode: string): CityExtended[];

/**
 * Get all states
 */
export function getAllStates(): State[];

/**
 * Get all counties
 */
export function getAllCounties(): County[];
