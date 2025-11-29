# USA Cities Database

**CSV-based database of US cities, counties, and states** - 31,254 entries with detailed information. Inspired by and compatible with [grammakov/USA-cities-and-states](https://github.com/grammakov/USA-cities-and-states) format.

Perfect for dropdowns, location lookups, ZIP code searches, and geographic applications.

## Why This Database?

- **Same Format as Reference Repo**: Uses pipe-delimited CSV like the popular grammakov repo
- **More Data**: Includes ZIP codes, coordinates, population, density, and timezone
- **31,254 Cities**: Complete coverage of all US states, DC, and territories
- **Ready to Use**: Works with any CSV parser or import directly
- **Zero Dependencies**: Just CSV files - use with any language or framework

## Files

| File | Size | Description | Format |
|------|------|-------------|--------|
| **us_cities_states_counties.csv** | 1.3 MB | Basic city data | `City\|State short\|State full\|County\|City alias` |
| **us_cities_states_counties_zips.csv** | 2.6 MB | Extended with ZIP codes & coordinates | Adds: `Latitude\|Longitude\|ZIP codes\|Population\|Density\|Timezone` |
| **states.csv** | 889 B | All 50 states + DC + territories | `state_id,state_name` |
| **counties.csv** | 83 KB | All counties by state | `state_id,state_name,county_name` |

### Bonus: JSON Format

JSON versions available in `data/` folder for those who prefer JSON over CSV.

## Quick Start

### Option 1: Direct CSV Usage (Python Example)

```python
import csv

# Read basic cities
with open('us_cities_states_counties.csv', 'r') as f:
    reader = csv.DictReader(f, delimiter='|')
    cities = list(reader)

# Filter cities by state
ca_cities = [c for c in cities if c['State short'] == 'CA']
print(f"California has {len(ca_cities)} cities")
```

### Option 2: Direct CSV Usage (JavaScript/Node.js)

```javascript
const fs = require('fs');

// Simple CSV parser
const data = fs.readFileSync('us_cities_states_counties.csv', 'utf-8');
const lines = data.split('\n');
const headers = lines[0].split('|');

const cities = lines.slice(1).map(line => {
  const values = line.split('|');
  return {
    city: values[0],
    state: values[1],
    stateFull: values[2],
    county: values[3]
  };
});

// Find all cities in Texas
const txCities = cities.filter(c => c.state === 'TX');
```

### Option 3: Use the Built-in Module

```javascript
const usaData = require('./index.js');

// Load basic cities
const cities = usaData.loadCities();

// Get California cities
const caCities = usaData.getCitiesByState('CA');
// Returns: [{ City, State short, State full, County, City alias }, ...]

// Search for cities
const springfields = usaData.searchCities('Springfield');

// Get cities by ZIP code (uses extended data)
const cities = usaData.getCitiesByZip('90210');
// Returns: [{ City, State short, ..., ZIP codes, Population, ... }, ...]

// Load extended data with coordinates and population
const citiesExtended = usaData.loadCitiesExtended();
```

## CSV File Formats

### Basic File: `us_cities_states_counties.csv`

Pipe-delimited format matching the reference repo:

```
City|State short|State full|County|City alias
New York|NY|New York|Queens|New York
Los Angeles|CA|California|Los Angeles|Los Angeles
Chicago|IL|Illinois|Cook|Chicago
```

**Perfect for:**
- Simple city/state lookups
- Dropdown menus
- Form validation
- Autocomplete features

### Extended File: `us_cities_states_counties_zips.csv`

Includes additional fields:

```
City|State short|State full|County|Latitude|Longitude|ZIP codes|Population|Density|Timezone
New York|NY|New York|Queens|40.6943|-73.9249|11229,11228,11226...|18832416|10943.7|America/New_York
```

**Perfect for:**
- ZIP code lookups
- Geographic distance calculations
- Population analysis
- Timezone conversion
- Mapping applications

## Real-World Examples

### Example 1: State/City Dropdown

```javascript
const usaData = require('./index.js');

// Populate state dropdown
const states = usaData.getAllStates();
const stateOptions = states.map(s =>
  `<option value="${s.state_id}">${s.state_name}</option>`
).join('');

// When user selects a state, populate cities
function onStateChange(stateCode) {
  const cities = usaData.getCitiesByState(stateCode);
  return cities.map(c =>
    `<option value="${c.City}">${c.City}</option>`
  ).join('');
}
```

### Example 2: ZIP Code to City/State Lookup

```javascript
const usaData = require('./index.js');

function lookupZIP(zipCode) {
  const cities = usaData.getCitiesByZip(zipCode);

  if (cities.length > 0) {
    const city = cities[0];
    return {
      city: city.City,
      state: city['State short'],
      stateFull: city['State full'],
      county: city.County,
      lat: parseFloat(city.Latitude),
      lng: parseFloat(city.Longitude),
      population: parseInt(city.Population),
      timezone: city.Timezone
    };
  }

  return null;
}

const info = lookupZIP('90210');
// { city: "Los Angeles", state: "CA", timezone: "America/Los_Angeles", ... }
```

### Example 3: City Search/Autocomplete

```javascript
const usaData = require('./index.js');

function autocomplete(searchTerm) {
  if (searchTerm.length < 2) return [];

  const results = usaData.searchCities(searchTerm);

  return results.slice(0, 10).map(city => ({
    label: `${city.City}, ${city['State short']}`,
    value: city.City,
    state: city['State short'],
    county: city.County
  }));
}

const suggestions = autocomplete('San');
// Returns: San Francisco, San Diego, San Antonio, etc.
```

### Example 4: Find Cities in a County

```javascript
const cities = usaData.loadCities();

// Get all cities in Los Angeles County
const laCities = cities.filter(c =>
  c.County === 'Los Angeles' && c['State short'] === 'CA'
);

console.log(`Los Angeles County has ${laCities.length} cities`);
```

### Example 5: Parse CSV in Python

```python
import csv

def get_cities_by_state(state_code):
    cities = []
    with open('us_cities_states_counties.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='|')
        for row in reader:
            if row['State short'] == state_code:
                cities.append(row)
    return cities

# Get all California cities
ca_cities = get_cities_by_state('CA')
print(f"Found {len(ca_cities)} cities in California")
```

### Example 6: Load in React/Next.js

```javascript
import { useState, useEffect } from 'react';

function CitySelector() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    // Load CSV file
    fetch('/us_cities_states_counties.csv')
      .then(res => res.text())
      .then(csv => {
        const lines = csv.split('\n');
        const data = lines.slice(1).map(line => {
          const [city, state, stateFull, county] = line.split('|');
          return { city, state, stateFull, county };
        });

        // Get unique states
        const uniqueStates = [...new Set(data.map(d => d.state))];
        setStates(uniqueStates);
      });
  }, []);

  const handleStateChange = (state) => {
    setSelectedState(state);
    // Filter cities for selected state
    // ...
  };

  return (
    <div>
      <select onChange={(e) => handleStateChange(e.target.value)}>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    </div>
  );
}
```

## API Reference (Node.js Module)

### Basic Functions

#### `loadCities()`
Load basic city data (pipe-delimited format).

```javascript
const cities = usaData.loadCities();
// Returns: [{ City, State short, State full, County, City alias }, ...]
```

#### `loadCitiesExtended()`
Load extended city data with ZIP codes, coordinates, and population.

```javascript
const cities = usaData.loadCitiesExtended();
// Returns: [{ City, ..., Latitude, Longitude, ZIP codes, Population, ... }, ...]
```

#### `getCitiesByState(stateCode)`
Get all cities in a state.

```javascript
const txCities = usaData.getCitiesByState('TX');
```

#### `getCitiesByStateName(stateName)`
Get cities by full state name.

```javascript
const txCities = usaData.getCitiesByStateName('Texas');
```

#### `searchCities(searchTerm)`
Search cities by name (partial match).

```javascript
const results = usaData.searchCities('Spring');
```

#### `getCitiesByZip(zipCode)`
Find cities containing a ZIP code.

```javascript
const cities = usaData.getCitiesByZip('90210');
```

#### `getAllStates()` / `getAllCounties()`
Get lists of states or counties.

```javascript
const states = usaData.getAllStates();
const counties = usaData.getAllCounties();
```

#### `parseCSV(filename)`
Parse any pipe-delimited CSV file.

```javascript
const data = usaData.parseCSV('your_file.csv');
```

## Data Coverage

- **31,254** cities
- **52** states (50 states + DC + territories)
- **3,207** counties
- **All ZIP codes** included in extended file
- **Coverage**: All 50 US states, District of Columbia, Puerto Rico, and territories

## File Structure

```
.
├── us_cities_states_counties.csv       # Main file (basic data)
├── us_cities_states_counties_zips.csv  # Extended file (with ZIP codes)
├── states.csv                           # All states
├── counties.csv                         # All counties
├── index.js                             # Node.js module
├── index.d.ts                           # TypeScript definitions
├── test.js                              # Test suite
├── package.json                         # NPM package config
└── data/                                # Bonus: JSON format files
    ├── cities.json
    ├── cities.min.json
    └── ...
```

## Installation

### Clone Repository

```bash
git clone https://github.com/FunnelFunction/0.0_Locations-simplemaps.com.git
cd 0.0_Locations-simplemaps.com
```

### Use in Your Project

**Option 1:** Copy the CSV files you need

```bash
cp us_cities_states_counties.csv /your-project/
```

**Option 2:** Install as npm package (when published)

```bash
npm install usa-cities-database
```

**Option 3:** Use as git submodule

```bash
git submodule add https://github.com/FunnelFunction/0.0_Locations-simplemaps.com.git
```

## Testing

```bash
node test.js
```

All tests pass successfully!

## Data Source & License

**Source:** SimpleMaps.com - US Cities Database (Basic)
- URL: https://simplemaps.com/data/us-cities
- License: Creative Commons Attribution 4.0 International (CC BY 4.0)
- License URL: https://creativecommons.org/licenses/by/4.0/

**Attribution Required:** When using this data, you must give appropriate credit to SimpleMaps.com

## License

This database is licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

You are free to:
- Share and redistribute in any medium or format
- Adapt, remix, transform, and build upon the material for any purpose (commercial or non-commercial)

Under the following terms:
- **Attribution**: You must give appropriate credit to SimpleMaps.com

See [LICENSE](LICENSE) file for full details.

## Similar Projects

- Inspired by: [grammakov/USA-cities-and-states](https://github.com/grammakov/USA-cities-and-states)
- This repo uses the same CSV format but includes extended data

## Contributing

Contributions welcome! Please submit a Pull Request.

## Support

Found a bug or have a question?
1. Check the documentation above
2. Search existing issues
3. Open a new issue on GitHub

---

**Made with data from SimpleMaps.com** | **31,254 cities** | **CSV format** | **Production ready**
