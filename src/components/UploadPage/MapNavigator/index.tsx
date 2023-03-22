import { Button, Divider, Form, Input, Steps, Tooltip } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MapNavigate.css";
import { RightOutlined } from "@ant-design/icons";
import markerIcon from "../../../assets/images/marker-icon.png";
import { AddressSelect } from "./AddressSelect";
import { EstateMap } from "../../DetailPage/EstateMap";
import useGeoLocation from "../../../common/hooks/GeoLocation";
import {
    IAddressOption,
    IEstateLocation,
    IMapNavigate
} from "./MapNavigateType";
import {
    AddressNumberRule,
    CityRule,
    DistrictRule,
    WardRule
} from "../../../common/helper/Validator";
import {
    getCoordinatesByAddress,
    getDistricts,
    getProvinces,
    getWards
} from "../../../app/api/MapApi";
import { ILocation } from "../../../app/api/MapApi/MapType";

const { Item } = Form;

const EmptyOption: IAddressOption = { value: "", label: "" };

const ZOOM_LEVEL = 18;

export const MapNavigator: React.FC<IMapNavigate> = ({
    handleGetEstateLocation,
    errorCoordinate = ""
}) => {
    const [current, setCurrent] = useState<number>(0);
    const [city, setCity] = useState<IAddressOption>(EmptyOption);
    const [district, setDistrict] = useState<IAddressOption>(EmptyOption);
    const [ward, setWard] = useState<IAddressOption>(EmptyOption);

    const [provinceList, setProvinceList] = useState<IAddressOption[]>([]);
    const [districtList, setDistrictList] = useState<IAddressOption[]>([]);
    const [wardList, setWardList] = useState<IAddressOption[]>([]);

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

    useEffect(() => {
        if (errorCoordinate) {
            setErrorLocation(errorCoordinate);
        }
    }, [errorCoordinate]);

    useEffect(() => {
        form.resetFields(["district", "ward"]);
        setDistrict(EmptyOption);
        setWard(EmptyOption);
    }, [city.value, form]);

    useEffect(() => {
        form.resetFields(["ward"]);
        setWard(EmptyOption);
    }, [district.value, form]);

    useEffect(() => {
        getProvinces()
            .then(response => {
                const provinceOption: IAddressOption[] = [];
                response?.data?.records?.map(({ code, name }: ILocation) =>
                    provinceOption.push({ value: code, label: name })
                );
                setProvinceList(provinceOption ?? []);
            })
            .then(() => {
                form.resetFields(["district", "ward"]);
            })
            .catch(error => {
                setErrorLocation(`ERROR: ${error}`);
            });
    }, [form]);

    useEffect(() => {
        if (city.value !== "") {
            getDistricts(city.value)
                .then(response => {
                    const districtOption: IAddressOption[] = [];
                    response?.data?.records?.map(({ code, name }: ILocation) =>
                        districtOption.push({ value: code, label: name })
                    );
                    setDistrictList(districtOption ?? []);
                })
                .catch(error => {
                    setErrorLocation(`ERROR: ${error}`);
                });
        }
    }, [city.value]);

    useEffect(() => {
        if (district.value !== "") {
            getWards(district.value)
                .then(response => {
                    const wardOption: IAddressOption[] = [];
                    response?.data?.records?.map(({ code, name }: ILocation) =>
                        wardOption.push({ value: code, label: name })
                    );
                    setWardList(wardOption ?? []);
                })
                .catch(error => {
                    setErrorLocation(`ERROR: ${error}`);
                });
        }
    }, [district.value]);

    const handleFindLocation = (valueLocation: IEstateLocation) => {
        setErrorLocation("");
        if (valueLocation.city?.value || valueLocation.addressNumber) {
            const addressFinding = `${valueLocation.addressNumber ?? ""} ${
                valueLocation.ward?.label ?? ""
            } ${valueLocation.district?.label ?? ""} ${
                valueLocation.city?.label ?? ""
            }`;
            getCoordinatesByAddress(addressFinding)
                .then(response => {
                    const lat = response.data?.records?.lat ?? 0;
                    const lng = response.data?.records?.lng ?? 0;
                    if (lat !== 0 && lng !== 0) {
                        setEstateLocation([lat, lng]);

                        handleGetEstateLocation({ lat: lat, lng: lng });
                        setIsShowCurrentLocation(true);
                        mapRef.current?.flyTo(
                            [lat ?? 0, lng ?? 0],
                            ZOOM_LEVEL,
                            {
                                animate: true
                            }
                        );
                    } else {
                        setErrorLocation("Cannot find your location!");
                    }
                })
                .catch(error => {
                    setErrorLocation(`ERROR: ${error}`);
                });
        } else {
            setErrorLocation(
                "Please input your house number or city/province,district,ward to find location!"
            );
        }
    };

    const handleSaveLocation = () => {
        setIsLocationChange(false);
        handleGetEstateLocation({
            lat: estateLocation[0],
            lng: estateLocation[1]
        });
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

                handleGetEstateLocation({
                    lat: location.coordinates?.lat,
                    lng: location.coordinates?.lng
                });

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
        handleGetEstateLocation,
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
                            City/Province - District - Ward - House number
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
                                                arrayOption={provinceList}
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
                                                arrayOption={districtList}
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
                                                arrayOption={wardList}
                                                value={ward.value}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "House number, Street",
                                    className:
                                        district.value === ""
                                            ? "addr-selected"
                                            : "",
                                    description: ward.value !== "" && (
                                        <Item
                                            name="addressNumber"
                                            rules={AddressNumberRule}
                                        >
                                            <Input
                                                placeholder="House number, Street"
                                                className="map-city-addr"
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

                <div>
                    <Button className="map-find-location" htmlType="submit">
                        Find location
                    </Button>
                    <Button
                        className="map-find-location-cancel"
                        onClick={handleClearForm}
                    >
                        Cancel
                    </Button>
                </div>
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
