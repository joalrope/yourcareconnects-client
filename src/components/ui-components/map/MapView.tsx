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
  InfoWindow,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { Button, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { content as modalContent } from "./content";
import { LongInfo } from "./LongInfo";
import styles from "./mapStyles.json";
import "./map.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { IPictures } from "../../../interface/user";
import { MarkersSort } from "../../../helpers/markers";

const { Text } = Typography;

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapStyles = {
  height: "78.5vh",
  width: "100%",
};

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IMarker {
  id: string;
  location: ILocation;
  fullname: string;
  pictures: IPictures | undefined;
  services: string[];
  ratings: number;
}

interface Props {
  getLoc?: (loc: ILocation) => object;
  goBack?: Dispatch<SetStateAction<boolean>>;
  markers?: IMarker[];
}

export const MapView = ({ getLoc, goBack, markers }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [center, setCenter] = useState<ILocation>({ lat: 0, lng: 0 });
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const libraries: Libraries = useMemo(() => ["places", "marker"], []);
  const { t } = useTranslation();

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

    setCenter({
      lat: user.location.lat,
      lng: user.location.lng,
    });

    if (!marker) {
      markers?.push(user as IMarker);
    }
  }, [markers, user]);

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
          title: t("Please, activate Geolocalizacion permission"),
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
  }, [t]);

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
            key={marker.fullname}
            position={marker.location}
            title={marker.fullname}
            onClick={() => handleMarkerClick(marker)}
          >
            <InfoWindow
              position={marker.location}
              options={{
                zIndex: selectedMarker?.id === marker.id ? 3 : 2,
              }}
            >
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

      {getLoc && (
        <Button
          type="primary"
          onClick={handleReadyButtonClick}
          style={{ position: "absolute", top: "10px", left: "10px" }}
        >
          {t("Ready")}
        </Button>
      )}
    </GoogleMap>
  );
};
