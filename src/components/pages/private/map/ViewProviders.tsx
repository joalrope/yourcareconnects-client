import { MapView } from "../..";

const markers = [
  {
    id: "qaz1123",
    location: { lat: 8.265913165402855, lng: -62.7923691801483 },
    fullname: "John Doe",
    pictures: { profile: "/images/man.png" },
    services: ["Cleaning", "Cooking"],
    ratings: 3.25,
  },
  {
    id: "qaz11244",
    location: { lat: 8.26682316540885, lng: -62.7919691101483 },
    fullname: "John Doe 2",
    pictures: { profile: "/images/man.png" },
    services: ["Cleaning", "Hair Stilish"],
    ratings: 4,
  },
  {
    id: "wsx234",
    location: { lat: 8.265361061282569, lng: -62.7949172787124 },
    fullname: "Jose Rodriguez",
    pictures: { profile: "/images/user.png" },
    services: ["Hair Stilish", "Food Prep"],
    ratings: 4.5,
  },
  {
    id: "edc456",
    location: { lat: 8.266852802368952, lng: -62.7931255630905 },
    fullname: "Stella Davies",
    pictures: { profile: "/images/woman.png" },
    services: ["Hair Stilish", "Food Prep"],
    ratings: 2.5,
  },
];

export const ViewProviders = () => {
  return <MapView markers={markers} />;
};
