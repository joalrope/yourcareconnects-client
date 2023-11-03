import { MapView } from "../..";

export const GetLatLng = () => {
  /*const getLoc = (loc: { lat: number; lng: number }) => {
    console.log(loc);
    return loc;
  };*/

  return (
    <MapView
      /*getLoc={getLoc}*/ markers={[
        {
          key: "qaz1123",
          position: { lat: 8.265913165402855, lng: -62.7923691801483 },
          title: "John Doe",
          picture: "/images/man.png",
          services: ["Cleaning", "Cooking"],
          ratings: 3.25,
        },
        {
          key: "qaz11244",
          position: { lat: 8.26682316540885, lng: -62.7919691101483 },
          title: "John Doe 2",
          picture: "/images/man.png",
          services: ["Cleaning", "Hair Stilish"],
          ratings: 4,
        },
        {
          key: "wsx234",
          position: { lat: 8.265361061282569, lng: -62.7949172787124 },
          title: "Jose Rodriguez",
          picture: "/images/user.png",
          services: ["Hair Stilish", "Food Prep"],
          ratings: 4.5,
        },
        {
          key: "edc456",
          position: { lat: 8.266852802368952, lng: -62.7931255630905 },
          title: "Stella Davies",
          picture: "/images/woman.png",
          services: ["Hair Stilish", "Food Prep"],
          ratings: 2.5,
        },
      ]}
    />
  );
};
