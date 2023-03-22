export interface IEstateMap {
    positionCenter?: [number, number];
    estateNearCenter?: [number, number][];
    radius?: number;
    mapRef?: React.MutableRefObject<L.Map | undefined>;
    ZOOM_LEVEL?: number;
    popupMarker?: string | JSX.Element;
    isPopupAlwaysShowed?: boolean;
    isGetLocationByClick?: boolean;
    handleGetCurrentLocation?: (latLng: [number, number]) => void;
}
