# USA Cities Database

A comprehensive, production-ready database of US cities, counties, and states with 31,000+ entries. Perfect for dropdowns, location lookups, ZIP code searches, and geographic applications.

## Features

- **31,254 US Cities** with detailed information
- **All 50 States** plus DC and territories
- **3,000+ Counties** organized by state
- **Geographic Coordinates** (latitude/longitude)
- **ZIP Codes** for each city
- **Population & Density** data
- **Timezone** information
- **Multiple Formats**: JSON, minified JSON, CSV, and pipe-delimited
- **Easy to Use**: Simple JavaScript/Node.js API
- **TypeScript Support**: Full type definitions included
- **Zero Dependencies**: Lightweight and fast

## Installation

### NPM (when published)
```bash
npm install usa-cities-database
```

### Direct Use
Clone or download this repository and import the files you need:
```bash
git clone https://github.com/FunnelFunction/0.0_Locations-simplemaps.com.git
```

## Quick Start

### Node.js / JavaScript

```javascript
const usaData = require('usa-cities-database');

// Get all cities
const cities = usaData.getAllCities();

// Get cities in California
const caCities = usaData.getCitiesByState('CA');

// Search for cities named "Springfield"
const springfields = usaData.searchCities('Springfield');

// Get a specific city
const city = usaData.getCity('Los Angeles', 'CA');
console.log(city);
// {
//   state_name: "California",
//   state_id: "CA",
//   county_name: "Los Angeles",
//   city_ascii: "Los Angeles",
//   zips: "90001,90002,90003...",
//   lat: "34.1141",
//   lng: "-118.4068",
//   population: "11885717",
//   density: "3165.7",
//   timezone: "America/Los_Angeles"
// }

// Get cities by ZIP code
const citiesWithZip = usaData.getCitiesByZip('90210');

// Get all states
const states = usaData.getAllStates();

// Get counties in Texas
const txCounties = usaData.getCountiesByState('TX');
```

### TypeScript

```typescript
import {
  City,
  State,
  County,
  getCitiesByState,
  searchCities,
  getCity
} from 'usa-cities-database';

const cities: City[] = getCitiesByState('NY');
const city: City | null = getCity('New York', 'NY');
```

### Direct File Access

#### JSON Format
```javascript
// Full data
const cities = require('./cities.json');

// Minified (smaller file size)
const citiesMin = require('./cities.min.json');

// States only
const states = require('./states.json');

// Counties only
const counties = require('./counties.json');
```

#### CSV Format
```javascript
// For use with CSV parsers
const fs = require('fs');
const csv = require('csv-parser');

const cities = [];
fs.createReadStream('cities.csv')
  .pipe(csv())
  .on('data', (row) => cities.push(row))
  .on('end', () => console.log('CSV loaded'));
```

#### Simple Pipe-Delimited (like the reference repo)
```
city|state|state_name|county
New York|NY|New York|Queens
Los Angeles|CA|California|Los Angeles
Chicago|IL|Illinois|Cook
```

## Available Files

| File | Description | Size | Format |
|------|-------------|------|--------|
| `cities.json` | Full city data with all fields | 8.3 MB | JSON |
| `cities.min.json` | Minified version (same data) | 6.3 MB | JSON |
| `cities.csv` | All cities with all fields | 3.1 MB | CSV |
| `cities-simple.csv` | City, state, county only | 936 KB | Pipe-delimited |
| `states.json` | All 50 states + DC + territories | 3.1 KB | JSON |
| `states.csv` | States in CSV format | 889 B | CSV |
| `counties.json` | All counties by state | 283 KB | JSON |
| `counties.csv` | Counties in CSV format | 83 KB | CSV |

## API Reference

### Data Arrays

- `cities` - Array of all city objects
- `states` - Array of all state objects
- `counties` - Array of all county objects

### Functions

#### `getAllCities()`
Returns all cities as an array.

#### `getAllStates()`
Returns all states as an array.

#### `getAllCounties()`
Returns all counties as an array.

#### `getCitiesByState(stateId)`
Get all cities in a state.
- **stateId**: Two-letter state code (e.g., 'CA', 'NY')

```javascript
const caCities = getCitiesByState('CA');
```

#### `getCitiesByStateName(stateName)`
Get all cities in a state by full name.
- **stateName**: Full state name (e.g., 'California', 'New York')

```javascript
const caCities = getCitiesByStateName('California');
```

#### `getCountiesByState(stateId)`
Get all counties in a state.
- **stateId**: Two-letter state code

```javascript
const txCounties = getCountiesByState('TX');
```

#### `searchCities(cityName)`
Search for cities by name (partial match, case-insensitive).

```javascript
const springfields = searchCities('Springfield');
const portCities = searchCities('Port');
```

#### `getCity(cityName, stateId)`
Get a specific city by exact name and state.

```javascript
const la = getCity('Los Angeles', 'CA');
```

#### `getCitiesByZip(zipCode)`
Find all cities that include a specific ZIP code.

```javascript
const cities = getCitiesByZip('90210');
```

#### `getCitiesNearby(lat, lng, radiusMiles)`
Find cities within a radius of coordinates.
- **lat**: Latitude
- **lng**: Longitude
- **radiusMiles**: Radius in miles

```javascript
const nearby = getCitiesNearby(34.0522, -118.2437, 25);
```

#### `getState(stateId)`
Get state info by ID.

```javascript
const ca = getState('CA');
```

#### `getStateByName(stateName)`
Get state info by name.

```javascript
const ca = getStateByName('California');
```

## Data Structure

### City Object
```javascript
{
  state_name: "California",      // Full state name
  state_id: "CA",                 // Two-letter state code
  county_name: "Los Angeles",     // County name
  city_ascii: "Los Angeles",      // City name (ASCII)
  zips: "90001,90002,90003...",   // Comma-separated ZIP codes
  lat: "34.1141",                 // Latitude
  lng: "-118.4068",               // Longitude
  population: "11885717",         // Population
  density: "3165.7",              // Population density
  timezone: "America/Los_Angeles" // IANA timezone
}
```

### State Object
```javascript
{
  state_id: "CA",           // Two-letter state code
  state_name: "California"  // Full state name
}
```

### County Object
```javascript
{
  state_id: "CA",               // Two-letter state code
  state_name: "California",     // Full state name
  county_name: "Los Angeles"    // County name
}
```

## Use Cases

### Populate a State/City Dropdown
```javascript
const { getAllStates, getCitiesByState } = require('usa-cities-database');

// Get states for dropdown
const states = getAllStates();
const stateOptions = states.map(s => ({
  value: s.state_id,
  label: s.state_name
}));

// When user selects a state, populate cities
function onStateChange(stateId) {
  const cities = getCitiesByState(stateId);
  const cityOptions = cities.map(c => ({
    value: c.city_ascii,
    label: c.city_ascii
  }));
  return cityOptions;
}
```

### ZIP Code Lookup
```javascript
const { getCitiesByZip } = require('usa-cities-database');

function lookupZip(zipCode) {
  const cities = getCitiesByZip(zipCode);
  if (cities.length > 0) {
    const city = cities[0];
    return {
      city: city.city_ascii,
      state: city.state_id,
      timezone: city.timezone
    };
  }
  return null;
}

const info = lookupZip('10001');
// { city: "New York", state: "NY", timezone: "America/New_York" }
```

### Find Nearby Cities
```javascript
const { getCitiesNearby } = require('usa-cities-database');

// Find cities within 50 miles of a location
const userLat = 40.7128;
const userLng = -74.0060;
const nearbyCities = getCitiesNearby(userLat, userLng, 50);

console.log(`Found ${nearbyCities.length} cities nearby`);
```

### Autocomplete Search
```javascript
const { searchCities } = require('usa-cities-database');

function autocomplete(query) {
  if (query.length < 2) return [];

  const results = searchCities(query);
  return results.slice(0, 10).map(city => ({
    label: `${city.city_ascii}, ${city.state_id}`,
    value: city
  }));
}

const suggestions = autocomplete('San');
// Returns: San Francisco, San Diego, San Antonio, etc.
```

## Browser Usage

### Using a Bundler (Webpack, Rollup, Vite)
```javascript
import { getCitiesByState, searchCities } from 'usa-cities-database';

const cities = getCitiesByState('CA');
```

### Direct Script Tag
```html
<script src="path/to/cities.json"></script>
<script>
  // Access the data
  console.log(cities);
</script>
```

### Fetch API
```javascript
fetch('path/to/cities.json')
  .then(response => response.json())
  .then(cities => {
    console.log('Loaded', cities.length, 'cities');
  });
```

## Performance Tips

1. **Use Minified JSON** (`cities.min.json`) for smaller bundle size
2. **Use CSV** if you're parsing it anyway or need smaller size
3. **Use Simple CSV** (`cities-simple.csv`) if you only need basic info
4. **Import Only What You Need**:
   ```javascript
   // Instead of importing all cities
   const states = require('usa-cities-database/states.json');
   const counties = require('usa-cities-database/counties.json');
   ```

## Data Source

Data sourced from **SimpleMaps.com** - US Cities Database (Basic)
- Source: https://simplemaps.com/data/us-cities
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Full license: https://creativecommons.org/licenses/by/4.0/

You are free to use this data for commercial or personal projects as long as you maintain attribution.

## License

**Creative Commons Attribution 4.0 International (CC BY 4.0)**

You are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution**: You must give appropriate credit to SimpleMaps.com

See [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### Version 1.0.0
- Initial release with 31,254 cities
- Multiple format support (JSON, CSV, pipe-delimited)
- Full JavaScript API with helper functions
- TypeScript definitions
- Comprehensive documentation

## Support

If you encounter any issues or have questions:
1. Check the documentation above
2. Search existing issues on GitHub
3. Open a new issue if needed

## Similar Projects

Inspired by [grammakov/USA-cities-and-states](https://github.com/grammakov/USA-cities-and-states)

## Stats

- **31,254** cities
- **51** states (including DC)
- **3,000+** counties
- **Coverage**: All 50 US states, District of Columbia, and territories
- **Data Points**: ~10 fields per city
- **Last Updated**: 2024

---

**Made with data from SimpleMaps.com**
