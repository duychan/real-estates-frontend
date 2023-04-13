import { Button, Card, Dropdown, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import {
    EnvironmentOutlined,
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import "./HistoryEstate.css";
import { IMyEstateResult } from "./ListEstateType";
import { useConvertPriceEstate } from "../../../common/hooks/PriceEstate";
import { MouseEvent } from "react";
import { deleteMyEstate } from "../../../app/api/GetMyEstate";

import { useAppDispatch } from "../../../app/redux/store";
import {
    setErrorNotification,
    setSuccessNotification
} from "../../../app/redux/reducer/NotificationSlice";
import { setDeleteMyEstate } from "../../../app/redux/reducer/GetMyEstateSlice";
import { DeleteMyEstate } from "../../../app/redux/action/GetMyEstateAction";

interface CustomMouseEvent<T = Element> extends MouseEvent<T> {
    stopPropagation(): void;
}

export const ListMyEstate: React.FC<IMyEstateResult> = ({
    estateResult: {
        _id = "",
        coverImg = "",
        name = "",
        address = "",
        price = "",
        type: { _id: _idType = "", name: NameType = "" },
        bedRoom = 0,
        bathRoom = 0,
        area = 0
    },
    handleGetSingleEstate
}) => {
    const dispatch = useAppDispatch();
    const handleClick = (
        e:
            | CustomMouseEvent<HTMLButtonElement>
            | CustomMouseEvent<HTMLAnchorElement>
    ) => {
        e.stopPropagation();
    };
    const handleMenuClick: MenuProps["onClick"] = e => {
        e.domEvent.stopPropagation();
        if (e.key === "delete") {
            dispatch(DeleteMyEstate(_id)).then(res => {
                if (res.payload.message === "Deleted") {
                    dispatch(
                        setSuccessNotification("Delete estate successfully! ")
                    );
                    dispatch(setDeleteMyEstate(_id));
                } else {
                    dispatch(setErrorNotification(res.payload.message));
                }
            });
        }
    };
    const items: MenuProps["items"] = [
        {
            label: "Edit Estate",
            key: "edit",
            icon: <EditOutlined />
        },
        {
            label: "Delete Estate",
            key: "delete",
            icon: <DeleteOutlined />
        }
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick
    };
    return (
        <Card
            hoverable
            className="history-estate-single-card"
            cover={<img alt="example" src={coverImg} />}
            onClick={handleGetSingleEstate}
        >
            <div className="history-estate-action">
                <Dropdown menu={menuProps} placement="bottomRight">
                    <Button
                        className="history-estate-action-button"
                        onClick={handleClick}
                    >
                        ...
                    </Button>
                </Dropdown>
            </div>
            <div className="history-estate-product-info">
                <h3 className="history-estate-product-name">{name}</h3>
                <p className="history-estate-product-address">
                    <EnvironmentOutlined className="history-estate-icon-address" />
                    {address}
                </p>
            </div>
            <div className="history-estate-product-fees">
                <div className="history-estate-product-type">
                    <p>{NameType}</p>
                </div>
                <div className="history-estate-product-price">
                    {useConvertPriceEstate(price)}
                </div>
            </div>
            <div className="history-estate-product-sub">
                <div className="history-estate-product-bedroom">
                    Bedrooms: {bedRoom}
                </div>
                <div className="history-estate-product-bathroom">
                    Bathrooms: {bathRoom}
                </div>
                <div className="history-estate-product-area">
                    Size: {area} m<sup>2</sup>
                </div>
            </div>
        </Card>
    );
};
