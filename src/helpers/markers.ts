import { IMarker } from "../components/ui-components/map/MapView";

export const MarkersSort = (markers: IMarker[]) => {
  markers.sort((a, b) => {
    const A = (a.location && a.location?.lat) || 0;
    const B = (b.location && b.location?.lat) || 0;

    if (A > B) return -1;
    if (A < B) return 1;
    return 0;
  });
};
