import React, { useState, useEffect } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { getListType } from "../../../app/api/TypeEstateApi";
import {
    ISelectItemType,
    ISelectType
} from "../../UploadPage/SelectType/SelectItemType";
interface IRadioTypeProps {
    setValueOption: (val: ISelectItemType) => void;
}
const RadioType: React.FC<IRadioTypeProps> = ({ setValueOption }) => {
    const [listType, setListType] = useState<ISelectType>();

    const onChange = (e: RadioChangeEvent) => {
        const selectedValue = e.target.value as ISelectItemType;
        setValueOption(selectedValue);
    };
    useEffect(() => {
        getListType().then(res => {
            setListType(res);
        });
    }, []);

    return (
        <div className="select-type">
            <Radio.Group className="select-type-option" onChange={onChange}>
                {(listType?.data?.records || []).map(
                    (item: ISelectItemType) => {
                        return (
                            <Radio
                                className="search-property-type-radio"
                                key={item._id}
                                value={item}
                            >
                                {item.name}
                            </Radio>
                        );
                    }
                )}
            </Radio.Group>
        </div>
    );
};
export default RadioType;
