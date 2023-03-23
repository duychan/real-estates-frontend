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
    radius = 100,
    mapRef,
    ZOOM_LEVEL = 0,
    popupMarker = "",
    isPopupAlwaysShowed = false,
    isGetLocationByClick = false,
    handleGetCurrentLocation = () => {}
}) => {
    const getLatLngBounds = () => {
        const latLngs = estateNearCenter?.map(position => {
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
                handleGetCurrentLocation([
                    e.latlng.lat ?? 0,
                    e.latlng.lng ?? 0
                ]);
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
            {estateNearCenter?.map((position, idx) => (
                <Marker position={position} key={idx} icon={markerRelatedIcon}>
                    <Popup>
                        Latitude: {position[0]} <br /> Longitude:
                        {position[1]}
                    </Popup>
                </Marker>
            ))}

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
