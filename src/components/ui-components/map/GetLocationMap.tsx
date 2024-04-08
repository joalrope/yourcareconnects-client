import { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { App, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IPictures } from "../../../interface/user";
import { useNavigate } from "react-router-dom";
import { setLatLng } from "../../../store/slices";
import { setUserLocation } from "../../../services/userService";
import styles from "./mapStyles.json";
import "./map.css";

const { Text } = Typography;

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStylesDefault = {
  borderRadius: "12px",
  height: "86.5vh",
  width: "100%",
};

export interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

export interface IMarker {
  id: string;
  location: ICenterMap;
  fullname: string;
  pictures: IPictures | undefined;
  services: string[];
  ratings: number;
  role?: string;
}

interface ICenterMap {
  lat: number;
  lng: number;
}

interface IMapStyles {
  height: string;
  width: string;
}

interface Props {
  mapStyles?: IMapStyles;
}

export const GetLocationMap = ({ mapStyles = mapStylesDefault }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { message } = App.useApp();

  const user = useSelector((state: RootState) => state.user);
  const [center, setCenter] = useState<ICenterMap>({ lat: 0, lng: 0 });
  const libraries: Libraries = useMemo(() => ["places", "marker"], []);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const userLoc = {
      lng: user.location.coordinates[0],
      lat: user.location.coordinates[1],
    };

    if (!userLoc || (userLoc.lat === 0 && userLoc.lng === 0)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setCenter({
          lat: latitude,
          lng: longitude,
        });

        const location: ILocation = {
          type: "Point",
          coordinates: [longitude, latitude],
        };

        const setData = async () => {
          const { ok, msg } = await setUserLocation(
            user.id as string,
            location
          );

          if (!ok) {
            message.error({
              content: `${t(msg)}`,
              style: {
                marginTop: "10vh",
              },
            });
          } else {
            message.success({
              content: `${t(msg)}`,
              style: {
                marginTop: "10vh",
              },
            });
          }
        };

        setData();

        dispatch(setLatLng(location));
      });
    } else {
      setCenter({
        lat: userLoc.lat,
        lng: userLoc.lng,
      });

      dispatch(
        setLatLng({
          type: "Point",
          coordinates: [userLoc.lat, userLoc.lng],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUnmount = () => {
    mapRef.current = null;
  };

  const onDragEnd = async (e: google.maps.MapMouseEvent) => {
    const location: ILocation = {
      type: "Point",
      coordinates: [e.latLng?.lng() as number, e.latLng?.lat() as number],
    };

    const { ok, msg } = await setUserLocation(user.id as string, location);

    dispatch(setLatLng(location));

    setCenter({
      lat: e.latLng?.lat() as number,
      lng: e.latLng?.lng() as number,
    });

    if (ok) {
      message.success({
        content: `${t(msg)}`,
        style: {
          marginTop: "10vh",
        },
      });
    } else {
      message.error(msg);
    }
  };

  const handleReadyButtonClick = () => {
    navigate("/profile");
  };

  return !isLoaded ? (
    <Text strong>Loading...</Text>
  ) : (
    <GoogleMap
      key={"1"}
      zoom={15}
      center={center}
      mapContainerStyle={mapStyles}
      onUnmount={onUnmount}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: styles as google.maps.MapTypeStyle[],
      }}
    >
      <MarkerF
        key={"1"}
        position={{ lat: center.lat, lng: center.lng }}
        title="Hello World!"
        draggable={true}
        onDragEnd={onDragEnd}
      />
      {mapStyles.height === mapStylesDefault.height && (
        <Button
          type="primary"
          onClick={handleReadyButtonClick}
          style={{
            border: "1px solid black",
            position: "absolute",
            top: "30px",
            left: "30px",
          }}
        >
          {t("Ready, I already indicated my location")}
        </Button>
      )}
    </GoogleMap>
  );
};
