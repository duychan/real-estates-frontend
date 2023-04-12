import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";
export interface IEstateMap {
    positionCenter?: [number, number];
    estateNearCenter?: IEstate[];
    radius?: number;
    mapRef?: React.MutableRefObject<L.Map | undefined>;
    ZOOM_LEVEL?: number;
    popupMarker?: string | JSX.Element;
    isPopupAlwaysShowed?: boolean;
    isGetLocationByClick?: boolean;
    handleGetCurrentLocation?: (latLng: [number, number]) => void;
}

export interface IEstateMapPopup {
    imgEstate: string;
    addressEstate: string;
    titleEstate: string;
}
