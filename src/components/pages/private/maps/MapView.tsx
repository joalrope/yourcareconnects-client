import { GoogleMap, LoadScript } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const MapView = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 18.4292072,
    lng: -66.1591063,
  };

  console.log({ apiKey });

  return (
    <LoadScript googleMapsApiKey={String(apiKey)}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
