import { MapView } from "../..";

export const Map = () => {
  const getLoc = (loc: { lat: number; lng: number }) => {
    /*  form.setFieldValue("location", {
      type: "Point",
      coordinates: [loc.lng, loc.lat],
    });*/
    return loc;
  };

  return <MapView getLoc={getLoc} />;
};
