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

export const ImgStyle = styled.img.attrs<string>(({ height }) => ({
    height: height
}))`
    height: ${({ height }: { height: string }) => height};
`;

export const AreaCard: React.FC<IAreaCard> = ({
    width,
    height,
    imageCard,
    contentCard
}) => {
    return (
        <AreaCardStyle width={width} className="area-card">
            <ImgStyle height={height ?? "100%"} src={imageCard} />
            <p>{contentCard}</p>
        </AreaCardStyle>
    );
};
