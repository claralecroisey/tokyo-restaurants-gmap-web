import { Status, Wrapper } from "@googlemaps/react-wrapper";
import "./App.css";

const render = (status: Status) => {
  return <span>{status}</span>;
};

function App() {
  return (
    <Wrapper apiKey={import.meta.env.GOOGLE_API_KEY} render={render}>
      <div id="map">Map here</div>
    </Wrapper>
  );
}

export default App;
