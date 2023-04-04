import React from "react";
import { Slider } from "antd";
import type { SliderMarks } from "antd/es/slider";

const marks: SliderMarks = {
    0: "0",
    1000: "1000"
};

const areaMax = 1000;
interface ISliderAreaProps {
    setSliderValue: (value: [number, number]) => void;
}
const SliderArea: React.FC<ISliderAreaProps> = ({ setSliderValue }) => {
    const onAfterChangeSlider = (value: [number, number]) => {
        setSliderValue(value);
    };
    return (
        <>
            <Slider
                onAfterChange={onAfterChangeSlider}
                range
                marks={marks}
                defaultValue={[0, areaMax]}
                min={0}
                max={areaMax}
                keyboard
            />
        </>
    );
};
export default SliderArea;
