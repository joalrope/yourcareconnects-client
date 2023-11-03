import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Modal, Typography } from "antd";
import { content as modalContent } from "./content";
import "./map.css";
//import { ShortInfo } from "./ShortInfo";
import styles from "./mapStyles.json";
import { LongInfo } from "./LongInfo";
const { Text } = Typography;

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStyles = {
  height: "78.5vh",
  width: "100%",
};

interface ICenter {
  lat: number;
  lng: number;
}

export interface IMarker {
  key: string;
  position: ICenter;
  title: string;
  picture: string;
  services: string[];
  ratings: number;
}

interface Props {
  getLoc?: (loc: ICenter) => object;
  markers?: IMarker[];
}

export const MapView = ({ getLoc, markers }: Props) => {
  const [center, setCenter] = useState<ICenter>({ lat: 0, lng: 0 });
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const libraries: Libraries = useMemo(() => ["places", "marker"], []);

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (markers![0].title !== "Me") {
        markers?.unshift({
          key: "Me",
          title: "Me",
          picture: "/images/man.png",
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          services: [],
          ratings: 0,
        });
      }

      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [markers]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);

      markers?.forEach((marker) => {
        bounds.extend(
          new google.maps.LatLng(marker.position.lat, marker.position.lng)
        );
      });

      map.fitBounds(bounds);

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
          title: "Please, activate Geolocalizacion permission",
          content: modalContent,
          width: "50%",
          okText: "Agreed",
          autoFocusButton: "ok",
          onOk() {
            console.log("Ok Modal Info");
          },
        });
      }
    });
  }, []);

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    if (getLoc) {
      getLoc({
        lat: e.latLng?.lat() as number,
        lng: e.latLng?.lng() as number,
      });
    }
  };

  const handleMarkerClick = (marker: IMarker) => {
    if (marker.title === "Me") return;
    setSelectedMarker(marker);
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  return !isLoaded ? (
    <Text strong>Loading...</Text>
  ) : (
    <GoogleMap
      key={"1"}
      zoom={18}
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
          <MarkerF
            key={marker.title}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker)}
          >
            <InfoWindow
              position={marker.position}
              options={{
                zIndex: selectedMarker?.key === marker.key ? 3 : 2,
              }}
            >
              {/*  {selectedMarker === null ? (
                <ShortInfo
                  marker={marker}
                  handleMarkerClick={() => handleMarkerClick(marker)}
                />
              ) : ( */}
              <LongInfo
                marker={marker}
                selectedMarker={selectedMarker}
                handleMarkerClick={() => handleMarkerClick(marker)}
              />
              {/*   )} */}
            </InfoWindow>
          </MarkerF>
        );
      })}
    </GoogleMap>
  );
};
