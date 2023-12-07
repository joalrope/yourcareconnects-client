interface ILocation {
  type: "Point";
  coordinates: [number, number];
}
export const getLocation = (location: ILocation) => {
  if (!location) {
    return {
      lng: 0,
      lat: 0,
    };
  }
  const { coordinates } = location;

  return {
    lng: parseFloat(String(coordinates[0])),
    lat: parseFloat(String(coordinates[1])),
  } as { lng: number; lat: number };
};
