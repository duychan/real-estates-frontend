import { Select } from "antd";
import React, { useEffect, useState } from "react";
import "./MapNavigate.css";
import { IAddressOption, IAddressSelect } from "./MapNavigateType";

export const AddressSelect: React.FC<IAddressSelect> = ({
    placeholder,
    arrayOption,
    handleChangeValue,
    valueAddress
}) => {
    const [valueSelect, setValueSelect] = useState<string>("");

    useEffect(() => {
        setValueSelect(valueAddress);
    }, [valueAddress]);

    const onChange = (
        value: string,
        option: IAddressOption | IAddressOption[]
    ) => {
        handleChangeValue(option);
        setValueSelect((option as IAddressOption).value);
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
            value={valueSelect}
        />
    );
};
