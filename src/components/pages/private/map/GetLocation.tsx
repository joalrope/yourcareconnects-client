import { MapView } from "../..";

export const GetLocation = () => {
  const getLoc = (loc: { lat: number; lng: number }) => {
    console.log(loc);
    return loc;
  };
  return (
    <div>
      <MapView getLoc={getLoc} />
    </div>
  );
};
