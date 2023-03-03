import { LatLngExpression } from "leaflet";
import React from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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

export const EstateMap: React.FC<IEstateMap> = ({
    positionCenter,
    estateNearCenter,
    radius = 100
}) => {
    const redOptions = { color: "red" };
    const getLatLngBounds = () => {
        const latLngs = estateNearCenter.map(position => {
            return L.latLng(position[0], position[1]);
        });
        const bounds = L.latLngBounds(latLngs);
        return bounds;
    };

    const latlngBound = getLatLngBounds();
    const centerPoint = new L.LatLng(positionCenter[0], positionCenter[1]);
    const northBoundPoint = latlngBound.getNorthEast();
    const southBoundPoint = latlngBound.getSouthWest();
    const centerToNorth = centerPoint.distanceTo(northBoundPoint);
    const centerToSouth = centerPoint.distanceTo(southBoundPoint);
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

    return (
        <MapContainer
            center={positionCenter as LatLngExpression}
            zoom={zoom}
            scrollWheelZoom={true}
            touchZoom={true}
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
                <Popup>
                    Latitude: {positionCenter[0]} <br /> Longitude:
                    {positionCenter[1]}
                </Popup>
            </Marker>
            {estateNearCenter.map((position, idx) => (
                <Marker position={position} key={idx} icon={markerRelatedIcon}>
                    <Popup>
                        Latitude: {position[0]} <br /> Longitude:
                        {position[1]}
                    </Popup>
                </Marker>
            ))}
            <Circle
                center={positionCenter as LatLngExpression}
                pathOptions={redOptions}
                radius={radiusBound} //meters
            >
                <Popup>Related Estate</Popup>
            </Circle>
        </MapContainer>
    );
};
