import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { IMyEstateResult } from "../HistoryEstate/ListEstateType";

export const WishesListResult: React.FC<IMyEstateResult> = ({
    estateResult: {
        _id = "",
        coverImg = "",
        name = "",
        address = "",
        price = "",
        type: { _id: _idType = "", name: NameType = "" },
        bedRoom = 0,
        bathRoom = 0,
        area = 0
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
                    <p>{NameType}</p>
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
                <div className="history-estate-product-area">
                    Size: {area} m<sup>2</sup>
                </div>
            </div>
        </Card>
    );
};
