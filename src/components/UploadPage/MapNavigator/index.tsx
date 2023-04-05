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
    getAddressByCoordinates,
    getCoordinatesByAddress,
    getDistricts,
    getProvinces,
    getWards
} from "../../../app/api/MapApi";
import { ILocation } from "../../../app/api/MapApi/MapType";
import useDebounce from "../../../common/hooks/Debounce";

const { Item } = Form;

const EmptyOption: IAddressOption = { value: "", label: "" };

const ZOOM_LEVEL = 18;

const DebounceEstateTime = 1000;
const Step1 = 1;
const Step2 = 2;
const Step3 = 3;
const Step4 = 4;

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
    const debouncedEstateLocation = useDebounce<[number, number]>(
        estateLocation,
        DebounceEstateTime
    );

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
        if (current === Step1) {
            form.resetFields(["district", "ward"]);
            setDistrict(EmptyOption);
            setWard(EmptyOption);
        } else if (current === Step2) {
            form.resetFields(["ward"]);
            setWard(EmptyOption);
        } else if (current === Step3) {
            form.resetFields(["addressNumber"]);
        }
    }, [current]);

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
                    if (!district.value && district.label) {
                        setDistrict(
                            districtOption?.find(
                                districtItem =>
                                    districtItem.label === district.label
                            ) ?? EmptyOption
                        );
                    }
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
                valueLocation.ward ?? ""
            } ${valueLocation.district ?? ""} ${valueLocation.city ?? ""}`;
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

                handleClickEstateOnMap([
                    location.coordinates?.lat,
                    location.coordinates?.lng
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
        handleGetEstateLocation,
        isShowCurrentLocation,
        location.coordinates.lat,
        location.coordinates.lng,
        location.loaded
    ]);

    const handleClickEstateOnMap = (latLng: [number, number]) => {
        setEstateLocation(latLng);
        setCurrent(Step4);
        getAddressByCoordinates({
            lat: debouncedEstateLocation[0],
            lng: debouncedEstateLocation[1]
        }).then(response => {
            setIsAddressSelectShown(true);
            const {
                records: {
                    data: { street = "", district = "", city = "", county = "" }
                }
            } = response;
            form.setFieldsValue({
                city: county
            });
            form.setFieldsValue({
                district: city
            });
            form.setFieldsValue({
                ward: district
            });
            form.setFieldsValue({ addressNumber: street });
            setCity(
                provinceList.find(province => province.label === county) ??
                    EmptyOption
            );
            setDistrict({ value: "", label: city });
        });
    };

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
                                        form.getFieldValue("city") === undefined
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
                                                        city: (addressValue as IAddressOption)
                                                            .label
                                                    });

                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(Step1);
                                                }}
                                                arrayOption={provinceList}
                                                value={form.getFieldValue(
                                                    "city"
                                                )}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "District",
                                    className:
                                        form.getFieldValue("city") === undefined
                                            ? "addr-selected"
                                            : form.getFieldValue("district") ===
                                              undefined
                                            ? "addr-selected-line"
                                            : "",
                                    description: form.getFieldValue("city") !==
                                        undefined && (
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
                                                        district: (addressValue as IAddressOption)
                                                            .label
                                                    });
                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(Step2);
                                                }}
                                                arrayOption={districtList}
                                                value={form.getFieldValue(
                                                    "district"
                                                )}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "Ward",
                                    className:
                                        form.getFieldValue("district") ===
                                        undefined
                                            ? "addr-selected"
                                            : form.getFieldValue("ward") ===
                                              undefined
                                            ? "addr-selected-line"
                                            : "",
                                    description: form.getFieldValue(
                                        "district"
                                    ) !== undefined && (
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
                                                        ward: (addressValue as IAddressOption)
                                                            .label
                                                    });
                                                    setCurrent(Step3);
                                                }}
                                                arrayOption={wardList}
                                                value={form.getFieldValue(
                                                    "ward"
                                                )}
                                            />
                                        </Item>
                                    )
                                },
                                {
                                    title: "House number, Street",
                                    className:
                                        form.getFieldValue("ward") === undefined
                                            ? "addr-selected"
                                            : "",
                                    description: form.getFieldValue("ward") !==
                                        undefined && (
                                        <Item
                                            name="addressNumber"
                                            rules={AddressNumberRule}
                                        >
                                            <Input
                                                placeholder="House number, Street"
                                                className="map-city-addr"
                                                value={form.getFieldValue(
                                                    "addressNumber"
                                                )}
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
                            handleGetCurrentLocation={handleClickEstateOnMap}
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
