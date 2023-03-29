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
import { IUploadEstate } from "../../../app/redux/reducer/UploadSlice/UploadSliceType";

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
        <ResultEstateCardStyle
            width={width ?? "100%"}
            hoverable
            cover={
                <img
                    alt=""
                    src={coverImg}
                    className="estate-result-cover-img"
                />
            }
            className="estate-result-card"
            onClick={handleGetSingleEstate}
        >
            <div className="estate-result-address">
                <div className="estate-result-header">
                    <p className="estate-result-addr-title">{name}</p>
                    <p className="estate-result-price">{`${price}`}</p>
                </div>
                <p className="estate-result-addr-detail">{address}</p>
            </div>
            <div className="estate-result-info">
                <p className="estate-result-info-detail">{type.name}</p>
                <IconDetail
                    keyIcon="estate-bedroom"
                    title="Bedroom"
                    iconContent={String(bedRoom ?? 0)}
                    icon={<BedIcon className="estate-result-detail" />}
                />
                <IconDetail
                    keyIcon="estate-bathroom"
                    title="Bathroom"
                    iconContent={String(bathRoom ?? 0)}
                    icon={<BathIcon className="estate-result-detail" />}
                />
                <IconDetail
                    keyIcon="estate-house-size"
                    title="HouseSize"
                    iconContent={`${area}`}
                    icon={<HouseSizeIcon className="estate-result-detail" />}
                />
            </div>
        </ResultEstateCardStyle>
    );
};
