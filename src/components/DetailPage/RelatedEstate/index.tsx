import { Card } from "antd";
import React from "react";
import "./RelateEstate.css";
import house from "../../../assets/images/house.jpg";
import styled from "styled-components";
import { IRelateEstate } from "./RelateEstType";

export const RelatedCardStyle = styled(Card).attrs<IRelateEstate>(
    ({ width }) => ({
        width: width
    })
)`
    width: ${({ width }: { width: string }) => width};
    border-radius: 0%;
    margin: 0 10px;
`;

export const RelatedEstate: React.FC<IRelateEstate> = ({ width }) => {
    return (
        <RelatedCardStyle
            width={width ?? "400px"}
            hoverable
            className="relate-estate-card"
            cover={<img alt="" src={house} />}
        >
            <div className="estate-address">
                <p className="estate-addr-title">Hoa Ninh Hoa Vang, Da Nang</p>
                <p className="estate-addr-detail">
                    K146/5B Nguyen Hoang, Hai Chau, Da Nang
                </p>
            </div>
            <div className="estate-info">
                <p className="estate-info-text">Bedrooms: 2</p>
                <p className="estate-info-text">Bathrooms: 2</p>
                <p className="estate-info-text">Estate size: 2m2</p>
            </div>
        </RelatedCardStyle>
    );
};
