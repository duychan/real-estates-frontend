import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./HistoryEstate.css";
import { IMyEstateResult } from "./ListEstateType";

export const ListMyEstate: React.FC<IMyEstateResult> = ({
    estateResult: {
        _id,
        coverImg,
        name,
        address,
        price,
        type,
        bedRoom,
        bathRoom,
        area
    },
    handleGetSingleEstate
}) => {
    return (
        <Card
            hoverable
            className="history-estate-single-card"
            cover={<img alt="example" src={coverImg} />}
            onClick={handleGetSingleEstate}
        >
            <div className="history-estate-product-info">
                <h3 className="history-estate-product-name">{name}</h3>
                <p className="history-estate-product-address">
                    <EnvironmentOutlined className="history-estate-icon-address" />
                    {address}
                </p>
            </div>
            <div className="history-estate-product-fees">
                <div className="history-estate-product-type">
                    <p>{type.name}</p>
                </div>
                <div className="history-estate-product-price">{price}</div>
            </div>
            <div className="history-estate-product-sub">
                <div className="history-estate-product-bedroom">
                    Bedrooms: {bedRoom}
                </div>
                <div className="history-estate-product-bathroom">
                    Bathrooms: {bathRoom}
                </div>
                <div className="history-estate-product-area">Size: {area}</div>
            </div>
        </Card>
    );
};
