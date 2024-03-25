import { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  //InfoWindow,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Button, Modal, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
//import { LongInfo } from "./LongInfo";
import styles from "./mapStyles.json";
import "./map.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IPictures } from "../../../interface/user";
import { useContent } from "../../../hooks/useContent";
import { getLocation } from "./utils/getLocation";
import { useNavigate } from "react-router-dom";
import { setUserLocation } from "../../../services/userService";
import { setLatLng } from "../../../store/slices";

const { Text } = Typography;

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStyles = {
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
export const GetLocationMap = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [center, setCenter] = useState<ICenterMap>({ lat: 0, lng: 0 });
  const libraries: Libraries = useMemo(() => ["places", "marker"], []);
  const { t } = useTranslation();
  const content = useContent();
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const userLoc = getLocation(user.location);

    if (!userLoc || (userLoc.lat === 0 && userLoc.lng === 0)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setCenter({
          lat: latitude,
          lng: longitude,
        });

        dispatch(setLatLng({ lat: latitude, lng: longitude }));
      });
    } else {
      setCenter({
        lat: userLoc.lat,
        lng: userLoc.lng,
      });

      dispatch(setLatLng({ lat: userLoc.lat, lng: userLoc.lng }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUnmount = () => {
    mapRef.current = null;
  };

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        Modal.info({
          title: t("Please activate Geolocation permission"),
          content: content,
          width: "50%",
          okText: t("Agreed"),
          autoFocusButton: "ok",
          //onOk() {},
        });
      }
    });
  }, [content, t]);

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
      (
      <MarkerF
        key={"1"}
        position={{ lat: center.lat, lng: center.lng }}
        title="Hello World!"
        draggable={true}
        onDragEnd={onDragEnd}
      />
      )
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
    </GoogleMap>
  );
};
