import React from "react";
import "./EstateDes.css";

interface IEstateDescription {
    description: string;
}

export const EstateDescription: React.FC<IEstateDescription> = ({
    description
}) => {
    return (
        <div className="estate-description">
            <h1 className="estate-description-title">Details</h1>
            <p className="estate-description-text">{description}</p>
        </div>
    );
};
