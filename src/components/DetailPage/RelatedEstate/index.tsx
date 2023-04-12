import { Card } from "antd";
import React from "react";
import "./RelateEstate.css";
import house from "../../../assets/images/house.jpg";
import styled from "styled-components";
import { IRelateEstate } from "./RelateEstType";
import { useNavigate } from "react-router-dom";

export const RelatedCardStyle = styled(Card).attrs<IRelateEstate>(
    ({ width }) => ({
        width: width
    })
)`
    width: ${({ width }: { width: string }) => width};
    border-radius: 0%;
    margin: 0 10px;
`;

export const RelatedEstate: React.FC<IRelateEstate> = ({
    width,
    coverImg = "",
    name = "",
    address = "",
    bedRoom = 0,
    bathRoom = 0,
    area = 0,
    _id = ""
}) => {
    const navigate = useNavigate();
    return (
        <RelatedCardStyle
            width={width ?? "400px"}
            hoverable
            className="relate-estate-card"
            cover={<img alt="" src={coverImg} />}
            onClick={() => navigate(`/single-estate/${_id}`)}
        >
            <div className="estate-address">
                <p className="estate-addr-title">{name}</p>
                <p className="estate-addr-detail">{address}</p>
            </div>
            <div className="estate-info">
                <p className="estate-info-text">Bedrooms: {bedRoom}</p>
                <p className="estate-info-text">Bathrooms: {bathRoom}</p>
                <p className="estate-info-text">
                    Estate size: {area}m<sup>2</sup>
                </p>
            </div>
        </RelatedCardStyle>
    );
};
