const fs = require('fs');

// Ladda in din data från kommuner.json
const kommunerData = require('./kommuner.json');

// Skapa GeoJSON-strukturen
const geoJson = {
  type: 'FeatureCollection',
  features: kommunerData.map(kommun => ({
    type: 'Feature',
    properties: {
      kod: kommun.kod,
      namn: kommun.namn,
      postnummer: kommun.postnummer,
      telefon: kommun.telefon,
      epost: kommun.epost,
      url: kommun.url,
      postort: kommun.postort
    },
    geometry: {
      type: kommun.geometry.type,
      coordinates: kommun.geometry.coordinates
    }
  }))
};

// Spara GeoJSON till en fil
fs.writeFileSync('kommuner.geojson', JSON.stringify(geoJson, null, 2), 'utf-8');

console.log('GeoJSON-fil skapad!');
