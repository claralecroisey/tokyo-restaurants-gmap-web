import { Status, Wrapper } from "@googlemaps/react-wrapper";
import "./App.css";
import { Map } from "./components/Map";

const render = (status: Status) => {
  return <span>{status}</span>;
};

function App() {
  return (
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render={render}>
      <h1>Tokyo restaurants</h1>
      <Map
        center={{ lat: 35.709026, lng: 139.731992 }}
        zoom={13}
        // TODO: Temporary styles, to change later
        style={{
          width: "80vw",
          height: "80vh",
        }}
      />
    </Wrapper>
  );
}

export default App;
