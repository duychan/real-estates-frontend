import React, { useState, useEffect } from "react";
import "./SelectType.css";
import { Select } from "antd";
import {
    ISelect,
    ISelectItemType,
    ISelectOption,
    ISelectType
} from "./SelectItemType";
import { getListType } from "../../../app/api/TypeEstateApi";

const SelecType: React.FC<ISelect> = ({ handleChangeValue }) => {
    const [listType, setListType] = useState<ISelectType>();
    const handleSelectChange = (
        value: string,
        option: ISelectOption | ISelectOption[]
    ) => {
        handleChangeValue(option);
    };

    useEffect(() => {
        getListType().then(res => {
            setListType(res);
        });
    }, []);

    return (
        <div className="select-type">
            <Select
                className="select-type-option"
                size="large"
                onChange={handleSelectChange}
                placeholder="Select type of Estate"
            >
                {(listType?.data?.records || []).map(
                    (item: ISelectItemType) => {
                        return (
                            <Select.Option value={item.name} key={item._id}>
                                {item.name}
                            </Select.Option>
                        );
                    }
                )}
            </Select>
        </div>
    );
};
export default SelecType;
