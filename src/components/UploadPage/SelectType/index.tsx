import React from "react";
import "./SelectType.css";
import { Select } from "antd";
import { typeArr } from "../../../common/constants";
const SelecType: React.FC = () => {
    return (
        <div className="select-type">
            <Select
                className="select-type-option"
                defaultValue="1"
                size="large"
                options={typeArr}
            />
        </div>
    );
};
export default SelecType;
