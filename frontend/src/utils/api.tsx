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
    const Params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString()
    }).toString()

    const response  = await fetch('http://localhost:8000/?' + Params, {
        method: 'GET',

    }
    );
    const data = await response.json()
    if (data) {
        return data
    }
    return Promise.reject('Failed to get message from backend');
};

