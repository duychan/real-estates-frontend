import { Select } from "antd";
import React from "react";
import "./MapNavigate.css";
import { IAddressOption, IAddressSelect } from "./MapNavigateType";

export const AddressSelect: React.FC<IAddressSelect> = ({
    placeholder,
    arrayOption,
    handleChangeValue,
    value
}) => {
    const onChange = (
        value: string,
        option: IAddressOption | IAddressOption[]
    ) => {
        handleChangeValue(option);
    };

    return (
        <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
                (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            options={arrayOption}
            className="addr-select"
            value={value}
        />
    );
};
