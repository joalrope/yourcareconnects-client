import { InfoWindow, MarkerF } from "@react-google-maps/api";
import { LongInfo } from "./LongInfo";
import { IMarker } from "./MapView";

interface Props {
  marker: IMarker;
  selectedMarker: IMarker | null;
  handleMarkerClick: (marker: IMarker) => void;
}

export const Markers = ({
  marker,
  selectedMarker,
  handleMarkerClick,
}: Props) => {
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
};
