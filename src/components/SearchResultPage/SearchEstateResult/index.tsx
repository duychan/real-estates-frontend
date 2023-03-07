import { Card, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import { IIconDetail, ISearchEstateResult } from "./SearchResultType";
import house from "../../../assets/images/house.jpg";
import { ReactComponent as BedIcon } from "../../../assets/icon/bedroom.svg";
import { ReactComponent as BathIcon } from "../../../assets/icon/bathroom.svg";
import { ReactComponent as HouseSizeIcon } from "../../../assets/icon/houseSize.svg";
import "./SearchResult.css";
import { IconDetail } from "./IconDetail";

export const ResultEstateCardStyle = styled(Card).attrs<ISearchEstateResult>(
    ({ width }) => ({
        width: width
    })
)`
    width: ${({ width }: { width: string }) => width};
    border-radius: 0%;
    margin: 10px;
`;

export const SearchEstateResult: React.FC<ISearchEstateResult> = ({
    width,
    estateName,
    estateAddress,
    estatePrice,
    estateType,
    estateBedroom,
    estateBathroom,
    estateArea
}) => {
    return (
        <ResultEstateCardStyle
            width={width ?? "350px"}
            hoverable
            cover={<img alt="" src={house} />}
        >
            <div className="estate-result-address">
                <div className="estate-result-header">
                    <p className="estate-result-addr-title">{estateName}</p>
                    <p className="estate-result-price">{`$${estatePrice}`}</p>
                </div>
                <p className="estate-result-addr-detail">{estateAddress}</p>
            </div>
            <div className="estate-result-info">
                <p className="estate-result-info-detail">{estateType}</p>
                <IconDetail
                    keyIcon="estate-bedroom"
                    title="Bedroom"
                    iconContent={String(estateBedroom)}
                    icon={<BedIcon className="estate-result-detail" />}
                />
                <IconDetail
                    keyIcon="estate-bathroom"
                    title="Bathroom"
                    iconContent={String(estateBathroom)}
                    icon={<BathIcon className="estate-result-detail" />}
                />
                <IconDetail
                    keyIcon="estate-house-size"
                    title="HouseSize"
                    iconContent={`${estateArea}m^2`}
                    icon={<HouseSizeIcon className="estate-result-detail" />}
                />
            </div>
        </ResultEstateCardStyle>
    );
};
