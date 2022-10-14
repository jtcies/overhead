import React, { useState, Component } from 'react';
import { getPlanes, Plane} from './utils/api';
import { useGeolocated } from "react-geolocated";
import "./styles/global.css";

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
      const planes = await getPlanes(coords?.latitude ?? 0, coords?.longitude ?? 0);
      console.log(planes)
      setPlanes(planes);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div className='h-screen bg-slate-800 text-center text-slate-200 p-8'>
      {!planes && !error && isGeolocationEnabled && (
        <button className = 'btn text-3xl py-2 px-4 rounded-md bg-slate-500 p-8' onClick={() => queryBackend()}>
          What's overhead? 
        </button>
      )}
      {!isGeolocationEnabled && (
        <p>Geolocation not available</p>
      )}
      {planes && (
        <div className='grid place-items-center'>
        <table className='table-fixed text-left border border-spacing-5 rounded w-1/2'>
          <thead>
            <tr className='border border-spacing-8'>
              <th className='pl-3'>callsign</th>
              <th className='pl-3'>altitude</th>
              <th className='pl-3'>velocity</th>
              <th className='pl-3'>vertical rate</th>
              <th className='pl-3'>on ground?</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plane) =>
              <tr key = { plane.icao24 } > 
                <td className='pl-3'>{ plane.callsign }</td>
                <td className='pr-3 text-right'>{ plane.geo_altitude && (
                      Math.round(plane.geo_altitude) + " m"
                ) }</td>
                <td className='pr-3 text-right'>{ Math.round(plane.velocity) } m/s</td> 
                <td className='pr-3 text-right'>{ plane.vertical_rate && (
                      Math.round(plane.vertical_rate) + " m/s"
                ) }</td> 
                <td className='pl-3 text-left'>{ '' + plane.on_ground } </td> 
              </tr>
            )}
        </tbody>
        </table>
        </div>
      )}
      {error && (
        <p>
          Error: <code>{error}</code>
        </p>
      )}
    </div>
  );
}

export default App;
