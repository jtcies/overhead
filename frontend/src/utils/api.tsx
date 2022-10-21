import { useQuery } from 'react-query'

export type Plane = {
    icao24: string;
    callsign: string;
    origin_country: string;
    time_position: number;
    last_contact: number;
    longitude: number;
    latitude: number;
    baro_altitude: number;
    on_ground: boolean;
    velocity: number;
    true_track: number;
    vertical_rate: number;
    sensors: number[];
    geo_altitude: number;
    squawk:number;
    spi: boolean;
    position_source: number
}

export const getPlanes = async (lat: number, lon: number): Promise<Array<Plane>> => {
    if (lat == undefined) {
        return Promise.reject('Geolocation not available')
    }
    const Params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString()
    }).toString()

    const data  = await fetch('http://localhost:8000/?' + Params)
        .then((res) => res.json())
        .then((data) => {
            data.sort((a: Plane, b: Plane) => b.geo_altitude - a.geo_altitude)
            return data
        })

    if (data) {
        return data
    }
    return Promise.reject('Failed to get message from backend');
};

