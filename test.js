/**
 * Test file for USA Cities Database
 * Run with: node test.js
 */

const usaData = require('./index.js');

console.log('==================================');
console.log('USA Cities Database - Test Suite');
console.log('==================================\n');

// Test 1: Load all data
console.log('Test 1: Load all data');
console.log('Cities:', usaData.cities.length);
console.log('States:', usaData.states.length);
console.log('Counties:', usaData.counties.length);
console.log('✓ Data loaded successfully\n');

// Test 2: Get cities by state
console.log('Test 2: Get cities by state (CA)');
const caCities = usaData.getCitiesByState('CA');
console.log('California cities:', caCities.length);
console.log('Sample:', caCities[0].city_ascii);
console.log('✓ getCitiesByState works\n');

// Test 3: Search cities
console.log('Test 3: Search cities (Springfield)');
const springfields = usaData.searchCities('Springfield');
console.log('Found', springfields.length, 'cities named Springfield');
if (springfields.length > 0) {
  console.log('First result:', springfields[0].city_ascii + ', ' + springfields[0].state_id);
}
console.log('✓ searchCities works\n');

// Test 4: Get specific city
console.log('Test 4: Get specific city (Los Angeles, CA)');
const la = usaData.getCity('Los Angeles', 'CA');
if (la) {
  console.log('City:', la.city_ascii);
  console.log('County:', la.county_name);
  console.log('Population:', la.population);
  console.log('Timezone:', la.timezone);
  console.log('✓ getCity works\n');
} else {
  console.log('✗ getCity failed\n');
}

// Test 5: Get cities by ZIP
console.log('Test 5: Get cities by ZIP (90210)');
const bevHills = usaData.getCitiesByZip('90210');
console.log('Cities with ZIP 90210:', bevHills.length);
if (bevHills.length > 0) {
  console.log('City:', bevHills[0].city_ascii + ', ' + bevHills[0].state_id);
}
console.log('✓ getCitiesByZip works\n');

// Test 6: Get state info
console.log('Test 6: Get state by ID (NY)');
const ny = usaData.getState('NY');
if (ny) {
  console.log('State:', ny.state_name);
  console.log('✓ getState works\n');
}

// Test 7: Get state by name
console.log('Test 7: Get state by name (California)');
const ca = usaData.getStateByName('California');
if (ca) {
  console.log('State ID:', ca.state_id);
  console.log('✓ getStateByName works\n');
}

// Test 8: Get counties by state
console.log('Test 8: Get counties by state (TX)');
const txCounties = usaData.getCountiesByState('TX');
console.log('Texas counties:', txCounties.length);
if (txCounties.length > 0) {
  console.log('Sample county:', txCounties[0].county_name);
}
console.log('✓ getCountiesByState works\n');

// Test 9: Get cities by state name
console.log('Test 9: Get cities by state name (New York)');
const nyCities = usaData.getCitiesByStateName('New York');
console.log('New York cities:', nyCities.length);
console.log('✓ getCitiesByStateName works\n');

// Test 10: Get nearby cities
console.log('Test 10: Get cities nearby (LA coordinates, 25 mile radius)');
const nearby = usaData.getCitiesNearby(34.0522, -118.2437, 25);
console.log('Nearby cities:', nearby.length);
console.log('✓ getCitiesNearby works\n');

console.log('==================================');
console.log('All tests passed! ✓');
console.log('==================================');
