import { Button, Divider, Form, Input, Steps, Tooltip } from "antd";
import React, { useCallback, useRef, useState } from "react";
import "./MapNavigate.css";
import { RightOutlined } from "@ant-design/icons";
import markerIcon from "../../../assets/images/marker-icon.png";
import { AddressSelect } from "./AddressSelect";
import { EstateMap } from "../../DetailPage/EstateMap";
import useGeoLocation from "../../../common/hooks/GeoLocation";
import { IAddressOption, IEstateLocation } from "./MapNavigateType";
import {
    AddressNumberRule,
    CityRule,
    DistrictRule,
    WardRule
} from "../../../common/helper/Validator";

const { Item } = Form;

const option: { value: string; label: string }[] = [
    {
        value: "HN",
        label: "Ha Noi"
    },
    {
        value: "DN",
        label: "Da Nang"
    },
    {
        value: "HCM",
        label: "Ho Chi Minh"
    }
];

const EmptyOption: IAddressOption = { value: "", label: "" };

const ZOOM_LEVEL = 18;

export const MapNavigator: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);
    const [city, setCity] = useState<IAddressOption>(EmptyOption);
    const [district, setDistrict] = useState<IAddressOption>(EmptyOption);
    const [ward, setWard] = useState<IAddressOption>(EmptyOption);
    const [isAddressSelectShown, setIsAddressSelectShown] = useState<boolean>(
        false
    );
    const [isShowCurrentLocation, setIsShowCurrentLocation] = useState<boolean>(
        false
    );
    const [estateLocation, setEstateLocation] = useState<[number, number]>([
        0,
        0
    ]);
    const [isLocationChange, setIsLocationChange] = useState<boolean>(false);
    const [errorLocation, setErrorLocation] = useState<string>("");

    const location = useGeoLocation();

    const [form] = Form.useForm();
    const mapRef = useRef<L.Map>();

    const handleFindLocation = (valueLocation: IEstateLocation) => {
        if (
            valueLocation.city?.value &&
            valueLocation.district?.value &&
            valueLocation.ward?.value &&
            valueLocation.addressNumber
        ) {
            setErrorLocation("");
        } else {
            setErrorLocation("Please select your city/province,district!");
        }
    };

    const handleSaveLocation = () => {
        setIsLocationChange(false);
    };

    const handleClearForm = useCallback(() => {
        setWard(EmptyOption);
        setDistrict(EmptyOption);
        setCity(EmptyOption);
        setCurrent(0);
        setIsAddressSelectShown(false);
        setErrorLocation("");
        form.resetFields();
    }, [form]);

    const showMyLocation = useCallback(() => {
        handleClearForm();
        if (location.loaded) {
            if (
                isShowCurrentLocation === false ||
                (estateLocation[0] !== location.coordinates.lat &&
                    estateLocation[1] !== location.coordinates.lng)
            ) {
                setIsShowCurrentLocation(true);
                setIsLocationChange(false);

                setEstateLocation([
                    location.coordinates.lat ?? 0,
                    location.coordinates.lng ?? 0
                ]);

                mapRef.current?.flyTo(
                    [
                        location.coordinates.lat ?? 0,
                        location.coordinates.lng ?? 0
                    ],
                    ZOOM_LEVEL,
                    { animate: true }
                );
            }
        } else {
            setErrorLocation(
                "ERROR: Cannot get current location. Please try again "
            );
        }
    }, [
        estateLocation,
        handleClearForm,
        isShowCurrentLocation,
        location.coordinates.lat,
        location.coordinates.lng,
        location.loaded
    ]);

    return (
        <div className="map-navigator">
            <Button className="map-current-locate" onClick={showMyLocation}>
                <img src={markerIcon} className="current-location-icon" />
                Use my current location
            </Button>
            <Divider className="map-addr-divider">Or</Divider>
            <Form form={form} onFinish={handleFindLocation} autoComplete="off">
                <div className="map-input-addr">
                    <Button
                        className="map-city-addr"
                        onClick={() => {
                            setIsAddressSelectShown(!isAddressSelectShown);
                            setErrorLocation("");
                        }}
                    >
                        <div className="map-button-content">
                            City/Province,District
                            <Tooltip title="Estate Address">
                                <RightOutlined className="map-address-icon" />
                            </Tooltip>
                        </div>
                    </Button>

                    {isAddressSelectShown ? (
                        <Steps
                            direction="vertical"
                            current={current}
                            items={[
                                {
                                    title: "City/Province",
                                    className:
                                        city.value === ""
                                            ? "addr-step-line"
                                            : "",
                                    description: (
                                        <Item name="city" rules={CityRule}>
                                            <AddressSelect
                                                placeholder="City/Province"
                                                handleChangeValue={(
                                                    addressValue:
                                                        | IAddressOption
                                                        | IAddressOption[]
                                                ) => {
                                                    setCity(
                                                        addressValue as IAddressOption
                                                    );
                                                    form.setFieldsValue({
                                                        city: addressValue
                                                    });

                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(current + 1);
                                                }}
                                                arrayOption={option}
                                                value={city.value}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "District",
                                    className:
                                        city.value === ""
                                            ? "addr-selected"
                                            : district.value === ""
                                            ? "addr-selected-line"
                                            : "",
                                    description: city.value !== "" && (
                                        <Item
                                            name="district"
                                            rules={DistrictRule}
                                        >
                                            <AddressSelect
                                                placeholder="District"
                                                handleChangeValue={(
                                                    addressValue:
                                                        | IAddressOption
                                                        | IAddressOption[]
                                                ) => {
                                                    setDistrict(
                                                        addressValue as IAddressOption
                                                    );
                                                    form.setFieldsValue({
                                                        district: addressValue
                                                    });
                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(current + 1);
                                                }}
                                                arrayOption={option}
                                                value={district.value}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "Ward",
                                    className:
                                        district.value === ""
                                            ? "addr-selected"
                                            : "",
                                    description: district.value !== "" && (
                                        <Item name="ward" rules={WardRule}>
                                            <AddressSelect
                                                placeholder="Ward"
                                                handleChangeValue={(
                                                    addressValue:
                                                        | IAddressOption
                                                        | IAddressOption[]
                                                ) => {
                                                    setWard(
                                                        addressValue as IAddressOption
                                                    );
                                                    form.setFieldsValue({
                                                        ward: addressValue
                                                    });
                                                    setCurrent(current + 1);
                                                }}
                                                arrayOption={option}
                                                value={ward.value}
                                            />
                                        </Item>
                                    )
                                }
                            ]}
                            className="map-addr-step"
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <Item name="addressNumber" rules={AddressNumberRule}>
                    <Input
                        placeholder="House number, Street"
                        className="map-city-addr"
                    />
                </Item>
                <Button className="map-find-location" htmlType="submit">
                    Find location
                </Button>
            </Form>

            <div className="map-show-location">
                {errorLocation && (
                    <p className="error-location">{errorLocation}</p>
                )}
                {isShowCurrentLocation && (
                    <div>
                        <EstateMap
                            positionCenter={estateLocation}
                            mapRef={mapRef}
                            ZOOM_LEVEL={ZOOM_LEVEL}
                            popupMarker={
                                <div className="map-navigate-popup-marker">
                                    You are here <br /> Please check your
                                    location on the map
                                </div>
                            }
                            isPopupAlwaysShowed={true}
                            isGetLocationByClick={isLocationChange}
                            handleGetCurrentLocation={(
                                latLng: [number, number]
                            ) => setEstateLocation(latLng)}
                        />
                        <div className="map-show-location-button">
                            {isLocationChange ? (
                                <Button
                                    className="map-show-location-submit"
                                    onClick={handleSaveLocation}
                                >
                                    Save location
                                </Button>
                            ) : (
                                <Button
                                    className="map-show-location-submit"
                                    onClick={() => {
                                        setIsLocationChange(true);
                                    }}
                                >
                                    Choose another location
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
