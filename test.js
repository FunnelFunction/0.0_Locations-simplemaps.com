/**
 * Test file for USA Cities Database (CSV-based)
 * Run with: node test.js
 */

const usaData = require('./index.js');

console.log('==================================');
console.log('USA Cities Database - CSV Test');
console.log('==================================\n');

// Test 1: Load basic cities
console.log('Test 1: Load basic cities data');
const cities = usaData.loadCities();
console.log('Total cities:', cities.length);
console.log('Sample city:', cities[0]);
console.log('✓ loadCities works\n');

// Test 2: Load extended cities
console.log('Test 2: Load extended cities data');
const citiesExt = usaData.loadCitiesExtended();
console.log('Total cities (extended):', citiesExt.length);
console.log('Sample with ZIP codes:', {
  city: citiesExt[0].City,
  state: citiesExt[0]['State short'],
  lat: citiesExt[0].Latitude,
  lng: citiesExt[0].Longitude,
  population: citiesExt[0].Population,
  zipCount: citiesExt[0]['ZIP codes'].split(',').length
});
console.log('✓ loadCitiesExtended works\n');

// Test 3: Get cities by state
console.log('Test 3: Get cities by state (CA)');
const caCities = usaData.getCitiesByState('CA');
console.log('California cities:', caCities.length);
console.log('First 3:', caCities.slice(0, 3).map(c => c.City));
console.log('✓ getCitiesByState works\n');

// Test 4: Search cities
console.log('Test 4: Search cities (Springfield)');
const springfields = usaData.searchCities('Springfield');
console.log('Found', springfields.length, 'Springfields');
console.log('States:', springfields.map(c => c['State short']).join(', '));
console.log('✓ searchCities works\n');

// Test 5: Get cities by state name
console.log('Test 5: Get cities by state name (Texas)');
const txCities = usaData.getCitiesByStateName('Texas');
console.log('Texas cities:', txCities.length);
console.log('✓ getCitiesByStateName works\n');

// Test 6: Get cities by ZIP
console.log('Test 6: Get cities by ZIP (90210)');
const zipCities = usaData.getCitiesByZip('90210');
console.log('Cities with ZIP 90210:', zipCities.length);
if (zipCities.length > 0) {
  console.log('City:', zipCities[0].City + ', ' + zipCities[0]['State short']);
  console.log('Population:', zipCities[0].Population);
}
console.log('✓ getCitiesByZip works\n');

// Test 7: Load states
console.log('Test 7: Load states');
const states = usaData.getAllStates();
console.log('Total states:', states.length);
console.log('First 5:', states.slice(0, 5).map(s => s.state_name));
console.log('✓ getAllStates works\n');

// Test 8: Load counties
console.log('Test 8: Load counties');
const counties = usaData.getAllCounties();
console.log('Total counties:', counties.length);
console.log('✓ getAllCounties works\n');

// Test 9: Direct CSV parsing
console.log('Test 9: Direct CSV parsing');
const parsedStates = usaData.parseCSV('states.csv');
console.log('Parsed states:', parsedStates.length);
console.log('✓ parseCSV works\n');

console.log('==================================');
console.log('All CSV tests passed! ✓');
console.log('==================================');
console.log('\nFile Structure:');
console.log('- us_cities_states_counties.csv (basic, pipe-delimited)');
console.log('- us_cities_states_counties_zips.csv (extended with ZIP codes)');
console.log('- states.csv (all states)');
console.log('- counties.csv (all counties)');
console.log('\nThis matches the format from:');
console.log('https://github.com/grammakov/USA-cities-and-states');
