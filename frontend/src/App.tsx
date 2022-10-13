import React, { FC, useState, Component } from 'react';
import { getPlanes, Plane} from './utils/api';
import { useGeolocated } from "react-geolocated";

function App() {
  const [planes, setPlanes] = useState<Array<Plane>>();
  const [error, setError] = useState('');

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });
    
  const queryBackend = async () => {

    try {
      const planes = await getPlanes(coords?.latitude ?? 40, coords?.longitude ?? -75);
      console.log(planes)
      setPlanes(planes);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <>
      {!planes && !error && isGeolocationEnabled && (
        <a href="#" onClick={() => queryBackend()}>
          Click to make request
        </a>
      )}
      {!isGeolocationEnabled && (
        <p>Geolocation not available</p>
      )}
      {planes && (
        <ul>
          {planes.map((plane) =>
            <li key = {plane.icao24}> {plane.callsign }</li>
          )}
        </ul>
          
      )}
      {error && (
        <p>
          Error: <code>{error}</code>
        </p>
      )}
    </>
  );
}

export default App;
