import React from "react";
import { IEstateMapPopup } from "./EstateMapType";

export const EstateMapPopup: React.FC<IEstateMapPopup> = ({
    imgEstate,
    addressEstate,
    titleEstate
}) => {
    return (
        <div className="estate-map-popup">
            <img src={imgEstate} className="estate-map-popup-img" />
            <div className="estate-map-popup-text">
                <p className="estate-map-popup-title">{titleEstate}</p>
                <p className="estate-map-popup-address">{addressEstate}</p>
            </div>
        </div>
    );
};
