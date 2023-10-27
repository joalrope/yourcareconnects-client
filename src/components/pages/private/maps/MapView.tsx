import { GoogleMap, LoadScript } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const MapView = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 18.392373,
    lng: -66.133979,
  };

  console.log({ apiKey });

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
