import React, { useState, useEffect } from "react";
import "./SelectType.css";
import { Select } from "antd";
import { ISelect, ISelectOption } from "./SelectItemType";
import { getListType } from "../../../app/api/TypeEstateApi";

const SelecType: React.FC<ISelect> = ({
    handleChangeValue,
    valueSelectType
}) => {
    const [listType, setListType] = useState<ISelectOption[]>();
    const [valueSelect, setValueSelect] = useState<string>("");

    useEffect(() => {
        setValueSelect(valueSelectType);
    }, [valueSelectType]);

    const handleSelectChange = (
        value: string,
        option: ISelectOption | ISelectOption[]
    ) => {
        handleChangeValue(option);
        setValueSelect((option as ISelectOption).value);
    };

    useEffect(() => {
        getListType().then(res => {
            const listType =
                res.data?.records?.map(
                    ({ _id, name }: { _id: string; name: string }) => {
                        const type = {
                            value: _id,
                            label: name
                        } as ISelectOption;
                        return type;
                    }
                ) || [];
            setListType(listType);
        });
    }, []);

    return (
        <div className="select-type">
            <Select
                className="select-type-option"
                size="large"
                onChange={handleSelectChange}
                placeholder="Select type of Estate"
                filterOption={(input, option) =>
                    (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                options={listType as ISelectOption[]}
                value={valueSelect}
            />
        </div>
    );
};
export default SelecType;
