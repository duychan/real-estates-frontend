import React, { useEffect } from "react";
import "./ProductCard.css";
import { Card } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { IProductCard } from "./ProductCardType";

const ProductCard: React.FC<IProductCard> = ({
    _id,
    name,
    address,
    type,
    price,
    bedRoom,
    bathRoom,
    area,
    coverImg,
    handleGetSingleEstate
}) => {
    return (
        <Card
            hoverable
            className="product-card-single"
            cover={
                <img
                    alt="example"
                    src={coverImg}
                    className="product-card-img"
                />
            }
            onClick={handleGetSingleEstate}
        >
            <div className="product-card-info">
                <h3 className="product-card-name">{name}</h3>
                <p className="product-card-address">
                    <EnvironmentOutlined className="product-card-icon-address" />
                    {address}
                </p>
            </div>
            <div className="product-card-fees">
                <div className="product-card-type">
                    <p>{type.name}</p>
                </div>
                <div className="product-card-price">{price}</div>
            </div>
            <div className="product-card-sub">
                <div className="product-bedroom">Bedrooms: {bedRoom}</div>
                <div className="product-bathroom">Bathrooms: {bathRoom}</div>
                <div className="product-area">Size: {area}</div>
            </div>
        </Card>
    );
};
export default ProductCard;
