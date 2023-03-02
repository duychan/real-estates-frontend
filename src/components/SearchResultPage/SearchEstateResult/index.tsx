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
`;

export const SearchEstateResult: React.FC<ISearchEstateResult> = ({
    width
}) => {
    return (
        <ResultEstateCardStyle
            width={width ?? "350px"}
            hoverable
            cover={<img alt="" src={house} />}
        >
            <div className="estate-result-address">
                <div className="estate-result-header">
                    <p className="estate-result-addr-title">
                        K146/5B Nguyen Hoang, Hai Chau, Da Nang
                    </p>
                    <p className="estate-result-price">$25000</p>
                </div>
                <p className="estate-result-addr-detail">Apartment</p>
            </div>
            <div className="estate-result-info">
                <IconDetail
                    key="estate-bedroom"
                    title="Bedroom"
                    iconContent="3"
                    icon={<BedIcon className="estate-result-detail" />}
                />
                <IconDetail
                    key="estate-bathroom"
                    title="Bathroom"
                    iconContent="5"
                    icon={<BathIcon className="estate-result-detail" />}
                />
                <IconDetail
                    key="estate-house-size"
                    title="HouseSize"
                    iconContent="2m^2"
                    icon={<HouseSizeIcon className="estate-result-detail" />}
                />
            </div>
        </ResultEstateCardStyle>
    );
};
