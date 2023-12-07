# Frontend part of small Google Maps implementation

### About

This mini React SPA is built using Vite displays Tokyo restaurants information. (WIP)
It's using Google's React wrapper library [@googlemaps/react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper).

### Installation

```
npm install
```

Make sure to have generated a Google API Key giving you access to Google Maps services (Maps Javascript API at least) and to enable those services via the Google console.

Create a .env file with the content:

```
VITE_GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
VITE_API_BASE_URL=http://127.0.0.1:5000
```

### Run the app

Make sure you're running the associated Flask API on port 5000 (see API url above).

Then, to start the frontend server, simply run:

```
npm run dev
```
