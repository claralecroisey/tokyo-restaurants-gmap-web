import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './components/Map';
import { useEffect, useState } from 'react';
import { Marker } from './components/Marker';
import { GetRestaurantsResponse, Restaurant } from './types';

const render = (status: Status) => {
  return <span>{status}</span>;
};

const INITIAL_CENTER = { lat: 35.709026, lng: 139.731992 };
const INITIAL_ZOOM = 13;
const ICON_URL =
  'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-2-medium.png&highlight=c5221f,ea4335,ffffff';

export function MapPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRestaurantsData() {
      const url = `${import.meta.env.VITE_API_BASE_URL}/restaurants`;
      const response = await fetch(url);
      const data = (await response.json()) as GetRestaurantsResponse;
      setRestaurants(data);
    }

    fetchRestaurantsData();
  }, []);

  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render={render}>
      <h1>Tokyo restaurants</h1>
      <Map
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        // TODO: Temporary styles, to change later
        style={{
          width: '80vw',
          height: '80vh'
        }}>
        {restaurants.map(({ id, location: { latitude, longitude } }) => (
          <Marker
            key={id}
            position={{
              lat: latitude,
              lng: longitude
            }}
            icon={{
              url: ICON_URL
            }}
          />
        ))}
      </Map>
    </Wrapper>
  );
}
