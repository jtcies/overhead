import React, { FC, useState } from 'react';
import { getPlanes, Plane} from './utils/api';


function App() {
  const [planes, setPlanes] = useState<Array<Plane>>();
  const [error, setError] = useState('');

  const queryBackend = async () => {
    try {
      const planes = await getPlanes();
      console.log(planes)
      setPlanes(planes);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <>
      {!planes && !error && (
        <a href="#" onClick={() => queryBackend()}>
          Click to make request
        </a>
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
