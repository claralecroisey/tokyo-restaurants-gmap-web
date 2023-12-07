import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './components/Map';
import { useEffect, useState } from 'react';
import { Marker } from './components/Marker';
import { GetRestaurantsResponse, Restaurant } from './types';
import { SidePanel } from './components/SidePanel';

const render = (status: Status) => {
  // TODO: handle loading and error states
  return <span>{status}</span>;
};

const INITIAL_CENTER = { lat: 35.709026, lng: 139.731992 };
const INITIAL_ZOOM = 16;
const ICON_URL =
  'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-2-medium.png&highlight=c5221f,ea4335,ffffff';

export function MapPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl text-slate-400 my-12">Tokyo restaurants</h1>
        <div className="w-full h-full flex">
          {selectedRestaurant && (
            <div className="w-2/5">
              <SidePanel
                title={selectedRestaurant.displayName.text}
                onClose={() => setSelectedRestaurant(null)}>
                <div className="space-y-2">
                  <p>{selectedRestaurant.formattedAddress}</p>
                  <p>{selectedRestaurant.nationalPhoneNumber}</p>
                </div>
              </SidePanel>
            </div>
          )}
          <Map
            center={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            // TODO: Temporary styles, to change later
            style={{
              width: '100%',
              height: '100%'
            }}>
            {restaurants.map((restaurant) => {
              const {
                id,
                location: { latitude, longitude }
              } = restaurant;
              return (
                <Marker
                  key={id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  position={{
                    lat: latitude,
                    lng: longitude
                  }}
                  icon={{
                    url: ICON_URL
                  }}
                />
              );
            })}
          </Map>
        </div>
      </div>
    </Wrapper>
  );
}
