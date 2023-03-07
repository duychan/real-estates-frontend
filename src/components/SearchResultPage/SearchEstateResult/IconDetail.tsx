import { Tooltip } from "antd";
import React from "react";
import { IIconDetail } from "./SearchResultType";
import "./SearchResult.css";

export const IconDetail: React.FC<IIconDetail> = ({
    keyIcon,
    title,
    iconContent,
    icon
}) => {
    return (
        <span key={keyIcon}>
            <Tooltip title={title}>
                <span className="icon-content">{iconContent}</span>
                {icon}
            </Tooltip>
        </span>
    );
};
