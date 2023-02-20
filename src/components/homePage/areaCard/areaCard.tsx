import React from "react";
import "./AreaCard.css";
import area from "../../../assets/images/area.jpg";
import styled from "styled-components";
import { IAreaCard } from "./AreaCardType";

export const AreaCardStyle = styled.div.attrs<IAreaCard>(({ width }) => ({
    width: width || "300px"
}))`
    width: ${({ width }: { width: string }) => width};
`;

export const AreaCard: React.FC<IAreaCard> = ({ width }) => {
    return (
        <AreaCardStyle width={width} className="area-card">
            <img src={area} />
            <p>Wyndham</p>
        </AreaCardStyle>
    );
};
