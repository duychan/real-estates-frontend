import {
    Button,
    Divider,
    Form,
    FormInstance,
    Input,
    Steps,
    Tooltip
} from "antd";
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
import { useAppDispatch } from "../../../app/redux/store";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";

const { Item } = Form;

const EmptyOption: IAddressOption = { value: "", label: "" };

const ZOOM_LEVEL = 18;

const Step1 = 1;
const Step2 = 2;
const Step3 = 3;
const Step4 = 4;

export const MapNavigator: React.FC<IMapNavigate> = ({
    handleGetEstateLocation,
    estateCoordinates = [0, 0],
    isUploadEstate = false
}) => {
    const [current, setCurrent] = useState<number>(0);
    const [city, setCity] = useState<IAddressOption>(EmptyOption);
    const [district, setDistrict] = useState<IAddressOption>(EmptyOption);
    const [ward, setWard] = useState<IAddressOption>(EmptyOption);

    const [provinceList, setProvinceList] = useState<IAddressOption[]>([]);
    const [districtList, setDistrictList] = useState<IAddressOption[]>([]);
    const [wardList, setWardList] = useState<IAddressOption[]>([]);
    const formMapRef = useRef<FormInstance<IEstateLocation>>();
    const dispatch = useAppDispatch();

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
    const [previousLocation, setPreviousLocation] = useState<[number, number]>([
        0,
        0
    ]);

    const [isLocationChange, setIsLocationChange] = useState<boolean>(false);
    const [addressEstate, setAddressEstate] = useState<string>("");

    const location = useGeoLocation();

    const [form] = Form.useForm();
    const mapRef = useRef<L.Map>();

    const handleGetAddressFromCoordinates = useCallback(
        (latLng: [number, number]) => {
            if (latLng[0] !== 0 && latLng[1] !== 0) {
                setCurrent(Step4);
                getAddressByCoordinates({
                    lat: latLng[0],
                    lng: latLng[1]
                })
                    .then(response => {
                        setIsAddressSelectShown(true);
                        const {
                            records: {
                                data: {
                                    street = "",
                                    district = "",
                                    city = "",
                                    county = ""
                                }
                            }
                        } = response;
                        form.setFieldsValue({
                            city: { value: "", label: county } as IAddressOption
                        });
                        form.setFieldsValue({
                            district: {
                                value: "",
                                label: city
                            } as IAddressOption
                        });
                        form.setFieldsValue({
                            ward: {
                                value: "",
                                label: district
                            } as IAddressOption
                        });
                        form.setFieldsValue({ addressNumber: street });
                        setCity({ value: "", label: county });
                        setDistrict({ value: "", label: city });
                        setWard({ value: "", label: district });
                        setAddressEstate(
                            `${street}, ${district}, ${city}, ${county}`
                        );
                    })
                    .catch(error => {
                        dispatch(
                            setErrorNotification(
                                "Cannot find address in detail!"
                            )
                        );
                    });
            }
        },
        [dispatch, form]
    );

    useEffect(() => {
        if (estateCoordinates[0] !== 0 && estateCoordinates[1] !== 0) {
            if (
                estateLocation[0] === 0 &&
                estateLocation[1] === 0 &&
                previousLocation[0] === 0 &&
                previousLocation[1] === 0
            ) {
                setEstateLocation([estateCoordinates[1], estateCoordinates[0]]);
                handleGetAddressFromCoordinates([
                    estateCoordinates[1],
                    estateCoordinates[0]
                ]);
            }
        } else {
            handleClearForm();
            setIsShowCurrentLocation(false);
        }
    }, [estateCoordinates]);

    useEffect(() => {
        if (
            (estateLocation[0] !== 0 && estateLocation[1] !== 0) ||
            (previousLocation[0] !== 0 && previousLocation[1] !== 0)
        ) {
            const location =
                estateLocation[0] !== 0 && estateLocation[1] !== 0
                    ? estateLocation
                    : previousLocation;
            setIsShowCurrentLocation(true);
            mapRef.current?.flyTo(
                [location[0] ?? 0, location[1] ?? 0],
                ZOOM_LEVEL,
                {
                    animate: true
                }
            );
        } else {
            setIsShowCurrentLocation(false);
        }
    }, [addressEstate, estateLocation, previousLocation]);

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
    }, [current, form]);

    useEffect(() => {
        getProvinces()
            .then(response => {
                const provinceOption: IAddressOption[] = response?.data?.records?.map(
                    ({ code = "", name = "" }: ILocation) => {
                        return { value: code, label: name } as IAddressOption;
                    }
                );
                setProvinceList(provinceOption ?? []);
                if (!city?.value && city?.label) {
                    const cityValue =
                        provinceOption?.find(cityItem =>
                            cityItem.label.includes(city?.label)
                        ) ?? EmptyOption;
                    setCity(cityValue);
                    form.setFieldsValue({ city: cityValue });
                }
            })
            .catch(error => {
                dispatch(setErrorNotification(`ERROR: ${error}`));
            });
    }, [city?.value, city?.label, dispatch, form]);

    useEffect(() => {
        if (city?.value !== "") {
            getDistricts(city?.value)
                .then(response => {
                    const districtOption: IAddressOption[] = response?.data?.records?.map(
                        ({ code = "", name = "" }: ILocation) => {
                            return { value: code, label: name };
                        }
                    );
                    setDistrictList(districtOption ?? []);
                    if (!district?.value && district?.label) {
                        const districtValue =
                            districtOption?.find(districtItem =>
                                districtItem?.label.includes(district?.label)
                            ) ?? EmptyOption;
                        setDistrict(districtValue);
                        form.setFieldsValue({ district: districtValue });
                    }
                })
                .catch(error => {
                    dispatch(setErrorNotification(`ERROR: ${error}`));
                });
        }
    }, [city?.value, dispatch, district?.label, district?.value, form]);

    useEffect(() => {
        if (district?.value !== "") {
            getWards(district?.value)
                .then(response => {
                    const wardOption: IAddressOption[] = response?.data?.records?.map(
                        ({ code = "", name = "" }: ILocation) => {
                            return { value: code, label: name };
                        }
                    );
                    setWardList(wardOption ?? []);
                    if (!ward?.value && ward?.label) {
                        const wardValue =
                            wardOption?.find(wardItem =>
                                wardItem?.label.includes(ward?.label)
                            ) ?? EmptyOption;
                        setWard(wardValue);
                        form.setFieldsValue({ ward: wardValue });
                    }
                })
                .catch(error => {
                    dispatch(setErrorNotification(`ERROR: ${error}`));
                });
        }
    }, [dispatch, district?.value, form, ward?.label, ward?.value]);

    const handleFindLocation = (valueLocation: IEstateLocation) => {
        if (valueLocation.city?.value || valueLocation.addressNumber) {
            const addressFinding = `${valueLocation.addressNumber ?? ""} ${
                valueLocation.ward?.label ?? ""
            } ${valueLocation.district?.label ?? ""} ${
                valueLocation.city?.label ?? ""
            }`;
            setAddressEstate(addressFinding);
            getCoordinatesByAddress(addressFinding)
                .then(response => {
                    const lat = response.data?.records?.lat ?? 0;
                    const lng = response.data?.records?.lng ?? 0;
                    if (lat !== 0 && lng !== 0) {
                        setEstateLocation([lat, lng]);
                        handleGetEstateLocation(
                            { lat: lat, lng: lng },
                            addressEstate
                        );
                        setIsShowCurrentLocation(true);
                    } else {
                        dispatch(
                            setErrorNotification("Cannot find your location!")
                        );
                    }
                })
                .catch(error => {
                    dispatch(
                        setErrorNotification("Cannot find your location!")
                    );
                });
        } else {
            dispatch(
                setErrorNotification(
                    "Please input your house number or city/province,district,ward to find location!"
                )
            );
        }
    };

    const handleSaveLocation = () => {
        setIsLocationChange(false);
        handleGetEstateLocation(
            {
                lat: estateLocation[0],
                lng: estateLocation[1]
            },
            addressEstate
        );
    };

    const handleClearForm = useCallback(() => {
        setWard(EmptyOption);
        setDistrict(EmptyOption);
        setCity(EmptyOption);
        setCurrent(0);
        setIsAddressSelectShown(false);
        form.resetFields(["ward", "city", "district", "addressNumber"]);
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

                handleGetAddressFromCoordinates([
                    location.coordinates?.lat ?? 0,
                    location.coordinates?.lng ?? 0
                ]);
                handleGetEstateLocation(
                    {
                        lat: location.coordinates.lat ?? 0,
                        lng: location.coordinates.lng ?? 0
                    },
                    addressEstate
                );
            }
        } else {
            dispatch(
                setErrorNotification(
                    "ERROR: Cannot get current location. Please try again "
                )
            );
        }
    }, [
        addressEstate,
        dispatch,
        estateLocation,
        handleGetAddressFromCoordinates,
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
            <Form
                form={form}
                onFinish={handleFindLocation}
                autoComplete="off"
                ref={
                    formMapRef as React.MutableRefObject<
                        FormInstance<IEstateLocation>
                    >
                }
            >
                <div className="map-input-addr">
                    <Button
                        className="map-city-addr"
                        onClick={() => {
                            setIsAddressSelectShown(!isAddressSelectShown);
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
                                        <Item
                                            name="city"
                                            rules={CityRule}
                                            valuePropName="valueAddress"
                                        >
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
                                                        city: addressValue as IAddressOption
                                                    });

                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(Step1);
                                                }}
                                                arrayOption={provinceList}
                                                valueAddress={
                                                    (formMapRef.current?.getFieldValue(
                                                        "valueAddress"
                                                    ) as IAddressOption)?.value
                                                }
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
                                            valuePropName="valueAddress"
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
                                                        district: addressValue as IAddressOption
                                                    });
                                                    if (
                                                        (addressValue as IAddressOption)
                                                            .value !== ""
                                                    )
                                                        setCurrent(Step2);
                                                }}
                                                arrayOption={districtList}
                                                valueAddress={
                                                    (formMapRef.current?.getFieldValue(
                                                        "valueAddress"
                                                    ) as IAddressOption)?.value
                                                }
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
                                        <Item
                                            name="ward"
                                            rules={WardRule}
                                            valuePropName="valueAddress"
                                        >
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
                                                        ward: addressValue as IAddressOption
                                                    });
                                                    setCurrent(Step3);
                                                }}
                                                arrayOption={wardList}
                                                valueAddress={
                                                    (form.getFieldValue(
                                                        "valueAddress"
                                                    ) as IAddressOption)?.value
                                                }
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
                                            valuePropName="value"
                                        >
                                            <Input
                                                placeholder="House number, Street"
                                                className="house-number-street"
                                                value={formMapRef.current?.getFieldValue(
                                                    "value"
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
                {isShowCurrentLocation && (
                    <div>
                        <EstateMap
                            positionCenter={
                                estateLocation[0] !== 0 &&
                                estateLocation[1] !== 0
                                    ? estateLocation
                                    : previousLocation
                            }
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
                            ) => {
                                setEstateLocation(latLng);
                                handleGetAddressFromCoordinates(latLng);
                            }}
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
                                        setPreviousLocation(estateLocation);
                                        setEstateLocation([0, 0]);
                                        handleGetEstateLocation(
                                            { lat: 0, lng: 0 },
                                            addressEstate
                                        );
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
