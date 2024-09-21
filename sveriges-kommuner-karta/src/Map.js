// src/Map.js
import React, { useState, useEffect } from 'react';  // Importera React, useState och useEffect
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';  // Importera MapContainer, TileLayer och GeoJSON från react-leaflet
import 'leaflet/dist/leaflet.css';  // Importera Leaflet CSS

// KommunMap-komponenten
const KommunMap = () => {
  const [kommuner, setKommuner] = useState(null);
  const [selectedKommun, setSelectedKommun] = useState(null);

  const onEachKommun = (kommun, layer) => {
    layer.on({
      click: () => {
        setSelectedKommun(kommun.properties);
      },
    });
  };

  useEffect(() => {
    // Här kan du ladda GeoJSON-data från din lokala fil eller extern URL
    import('./data/kommuner.geojson').then((data) => {
      setKommuner(data.default);  // Ladda data från GeoJSON-filen
    });
  }, []);

  return (
    <div>
      <MapContainer style={{ height: '600px', width: '100%' }} zoom={5} center={[62, 15]}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {kommuner && <GeoJSON data={kommuner} onEachFeature={onEachKommun} />}
      </MapContainer>
      {selectedKommun && (
        <div>
          <h2>{selectedKommun.namn}</h2>
          <p>Postnummer: {selectedKommun.postnummer}</p>
          <p>Telefon: {selectedKommun.telefon}</p>
          <p>E-post: {selectedKommun.epost}</p>
          <a href={selectedKommun.url}>Besök kommunens webbplats</a>
        </div>
      )}
    </div>
  );
};

export default KommunMap;  // Exportera komponenten korrekt
