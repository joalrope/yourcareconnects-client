import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  GoogleMap,
  //InfoWindow,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";
//import { LongInfo } from "./LongInfo";
import styles from "./mapStyles.json";
import "./map.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IPictures } from "../../../interface/user";
import { MarkersSort } from "../../../helpers/markers";
import { useContent } from "../../../hooks/useContent";
import { Markers } from "./Markers";
import { getCenter } from "./utils/getLocation";

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

interface Props {
  getLoc?: (loc: ICenterMap) => object;
  goBack?: Dispatch<SetStateAction<boolean>>;
  markers?: IMarker[];
}

interface ICenterMap {
  lat: number;
  lng: number;
}
export const MapView = ({ getLoc, goBack, markers }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [center, setCenter] = useState<ICenterMap>({ lat: 0, lng: 0 });
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const libraries: Libraries = useMemo(() => ["places", "marker"], []);
  const { t } = useTranslation();
  const content = useContent();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const marker = markers?.some(
      (marker) => marker?.fullname === user.fullname
    );

    const userLocation = getCenter(user.location);

    setCenter({
      lat: userLocation.lat,
      lng: userLocation.lng,
    });

    if (!marker) {
      const newUser: IMarker = {
        id: user.id as string,
        fullname: user.fullname as string,
        location: {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        pictures: user.pictures,
        services: user.services as string[],
        ratings: user.ratings as number,
        role: user.role as string,
      };

      markers?.push(newUser as IMarker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //calculate zoom so all markers fit on screen
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      if (markers) {
        MarkersSort(markers);

        const bounds = new window.google.maps.LatLngBounds(center);

        markers?.forEach((marker) => {
          bounds.extend(
            new google.maps.LatLng(marker.location.lat, marker.location.lng)
          );
        });

        map.fitBounds(bounds);
      }

      mapRef.current = map;
    },
    [center, markers]
  );

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
          onOk() {
            if (goBack) {
              goBack(false);
            }
          },
        });
      }
    });
  }, [content, goBack, t]);

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    if (getLoc) {
      getLoc({
        lat: e.latLng?.lat() as number,
        lng: e.latLng?.lng() as number,
      });
    }
  };

  const handleMarkerClick = (marker: IMarker) => {
    if (marker.fullname === user.fullname) return;
    setSelectedMarker(marker);
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  const handleReadyButtonClick = () => {
    if (goBack) {
      goBack(false);
    }
  };

  return !isLoaded ? (
    <Text strong>Loading...</Text>
  ) : (
    <GoogleMap
      key={"1"}
      zoom={user.location ? 4 : 3}
      center={center}
      mapContainerStyle={mapStyles}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP,
        },
        styles: styles as google.maps.MapTypeStyle[],
      }}
    >
      {getLoc && (
        <MarkerF
          key={"1"}
          position={{ lat: center.lat, lng: center.lng }}
          title="Hello World!"
          draggable={true}
          onDragEnd={onDragEnd}
        />
      )}

      {markers?.map((marker) => {
        return (
          <Markers
            key={marker.id}
            marker={marker}
            selectedMarker={selectedMarker}
            handleMarkerClick={handleMarkerClick}
          />
        );
      })}

      <Button
        type="primary"
        onClick={handleReadyButtonClick}
        style={{
          border: "1px solid black",
          position: "absolute",
          top: "30px",
          left: "30px",
          width: "200px",
        }}
      >
        {t("Ready, let's go back")}
      </Button>
    </GoogleMap>
  );
};
