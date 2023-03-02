import { Tooltip } from "antd";
import React from "react";
import { IIconDetail } from "./SearchResultType";
import "./SearchResult.css";

export const IconDetail: React.FC<IIconDetail> = ({
    key,
    title,
    iconContent,
    icon
}) => {
    return (
        <span key={key}>
            <Tooltip title={title}>
                <span>{iconContent}</span>
                {icon}
            </Tooltip>
        </span>
    );
};
