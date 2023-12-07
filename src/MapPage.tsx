import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './components/Map';
import { useEffect, useState } from 'react';

const render = (status: Status) => {
  return <span>{status}</span>;
};

const INITIAL_CENTER = { lat: 35.709026, lng: 139.731992 };
const INITIAL_ZOOM = 13;

export function MapPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    function fetchRestaurantsData() {
      fetch('http://127.0.0.1:5000/restaurants')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRestaurants(data);
        });
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
        }}
      />
    </Wrapper>
  );
}
