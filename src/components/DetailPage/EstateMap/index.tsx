import { LatLngExpression } from "leaflet";
import React from "react";
import {
    Circle,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents
} from "react-leaflet";
import { IEstateMap } from "./EstateMapType";
import "./EstateMap.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
    earthCircumstance,
    numberOfTile,
    pi,
    semicircle
} from "../../../common/constants";
import { EstateMapPopup } from "./EstateMapPopup";

const markerCenterIcon = new L.Icon({
    iconUrl: require("../../../assets/images/marker-icon.png"),
    iconSize: [35, 45]
});
const markerRelatedIcon = new L.Icon({
    iconUrl: require("../../../assets/images/relate-marker.png"),
    iconSize: [25, 25]
});

const redOptions = { color: "red" };

export const EstateMap: React.FC<IEstateMap> = ({
    positionCenter = [0, 0],
    estateNearCenter = [],
    radius = 1000,
    mapRef,
    ZOOM_LEVEL = 0,
    popupMarker = "",
    isPopupAlwaysShowed = false,
    isGetLocationByClick = false,
    handleGetCurrentLocation = () => {}
}) => {
    const listOfEstateNearCenter: [number, number][] =
        estateNearCenter?.map(estate => [
            estate.location.coordinates[1],
            estate.location.coordinates[0]
        ]) || [];
    const getLatLngBounds = () => {
        const latLngs = listOfEstateNearCenter?.map(position => {
            return L.latLng(position[0], position[1]);
        });
        const bounds = L.latLngBounds(latLngs ?? []) ?? {
            _southWest: { lat: 0, lng: 0 },
            _northEast: { lat: 0, lng: 0 }
        };
        return bounds;
    };

    const latlngBound = getLatLngBounds();

    const centerPoint = new L.LatLng(
        positionCenter[0] ?? 0,
        positionCenter[1] ?? 0
    );
    const northBoundPoint = latlngBound.getNorthEast() ?? { lat: 0, lng: 0 };
    const southBoundPoint = latlngBound.getSouthWest() ?? { lat: 0, lng: 0 };
    const centerToNorth =
        (northBoundPoint.lat !== 0 &&
            northBoundPoint.lng !== 0 &&
            centerPoint.distanceTo(northBoundPoint ?? {})) ||
        0;
    const centerToSouth =
        (southBoundPoint.lat !== 0 &&
            southBoundPoint.lng !== 0 &&
            centerPoint.distanceTo(southBoundPoint ?? {})) ||
        0;
    const radiusBound =
        Math.max(centerToNorth, centerToSouth) <= radius
            ? Math.max(centerToNorth, centerToSouth)
            : radius;
    const zoom = Math.floor(
        Math.log2(
            (Math.cos((positionCenter[0] * pi) / semicircle) *
                earthCircumstance *
                numberOfTile) /
                radiusBound
        )
    );

    const MapEvents = (): JSX.Element => {
        useMapEvents({
            click(e) {
                setTimeout(
                    () =>
                        handleGetCurrentLocation([
                            e.latlng.lat ?? 0,
                            e.latlng.lng ?? 0
                        ]),
                    1000
                );
            }
        });
        return <></>;
    };

    return (
        <MapContainer
            center={positionCenter as LatLngExpression}
            zoom={ZOOM_LEVEL !== 0 ? ZOOM_LEVEL : zoom}
            scrollWheelZoom={true}
            touchZoom={true}
            ref={mapRef as React.MutableRefObject<L.Map>}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                tileSize={256}
            />
            <Marker
                position={positionCenter as LatLngExpression}
                icon={markerCenterIcon}
            >
                {popupMarker && <Popup>{popupMarker}</Popup>}
            </Marker>
            {estateNearCenter?.map(
                ({
                    _id = "",
                    location: { coordinates = [0, 0] },
                    name = "",
                    address = "",
                    coverImg = ""
                }) => (
                    <Marker
                        position={[coordinates[1], coordinates[0]]}
                        key={_id}
                        icon={markerRelatedIcon}
                    >
                        <Popup>
                            <EstateMapPopup
                                imgEstate={coverImg}
                                addressEstate={address}
                                titleEstate={name}
                            />
                        </Popup>
                    </Marker>
                )
            )}

            {estateNearCenter.length > 0 && (
                <Circle
                    center={positionCenter as LatLngExpression}
                    pathOptions={redOptions}
                    radius={radiusBound} //meters
                >
                    <Popup>Related Estate</Popup>
                </Circle>
            )}
            {isGetLocationByClick && <MapEvents />}
        </MapContainer>
    );
};
