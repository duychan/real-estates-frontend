import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Col, Row, Button, UploadFile } from "antd";
import { useNavigate } from "react-router-dom";
import "./InputInformation.css";
import SelecType from "../SelectType";
const { TextArea } = Input;
import {
    AreaEstateRule,
    BathRoomRule,
    BedRoomRule,
    NameEstateRule,
    PriceEstateRule,
    TypeRule
} from "../../../common/helper/Validator";
import UploadImage from "../UploadImage";
import { IEstateUpload } from "./EstateUploadType";
import { useSelector } from "react-redux";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { ISelectOption } from "../SelectType/SelectItemType";
import { RcFile } from "antd/es/upload";
import {
    getFormData,
    isLoading,
    setUploadFormData
} from "../../../app/redux/reducer/UploadSlice";
import { useAppDispatch } from "../../../app/redux/store";
import { IUploadAction } from "../../../app/redux/reducer/UploadSlice/UploadSliceType";
import { MapNavigator } from "../MapNavigator";
import { ICoordinates } from "../MapNavigator/MapNavigateType";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";
import { UploadNewEstate } from "../../../app/redux/action/UploadEstateAction";

const InputInformation = () => {
    const navigate = useNavigate();
    const { _id } = useSelector(getUser);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const formDataEstate = useSelector(getFormData);

    const isLoadingUpload = useSelector(isLoading);
    const [addressEstate, setAddressEstate] = useState<ICoordinates>({
        lat: 0,
        lng: 0
    });
    const [errorLocation, setErrorLocation] = useState<string>("");

    const onFinish = (estate: IEstateUpload) => {
        if (estate.thumbnail === undefined) {
            dispatch(
                setErrorNotification(
                    "Please choose at least one photo about your real estate!"
                )
            );
        } else if (addressEstate.lat !== 0 && addressEstate.lng !== 0) {
            const [coverImg, ...rest] = estate.thumbnail;
            const fileList = estate.thumbnail?.map(
                (file: UploadFile) => file.originFileObj as RcFile
            );

            const estateAction: IUploadAction = {
                owner: _id,
                name: estate.name,
                address: "",
                area: estate.area,
                price: estate.price,
                currentStatus: "641805bed27ac809a60a9cd3",
                type: estate.type.key,
                coverImg: coverImg,
                fileList: fileList,
                bedRoom: estate.bedRoom,
                bathRoom: estate.bathRoom,
                description: estate.description ?? "",
                _id: "",
                updateAt: "",
                createAt: "",
                coordinates: addressEstate
            };
            dispatch(setUploadFormData(estateAction));

            if (formDataEstate.values !== null) {
                dispatch(UploadNewEstate(formDataEstate)).then(res => {
                    const _idEstateUpload =
                        res.payload.data?.records?._id ?? "";
                    const message = res.payload?.message ?? "";

                    if (_idEstateUpload !== "") {
                        navigate(`/single-estate/${_idEstateUpload}`);
                    } else if (message !== "") {
                        dispatch(setErrorNotification(message));
                    }
                });
            } else {
                dispatch(setErrorNotification("Error"));
            }
        } else {
            setErrorLocation("Please choose your location!");
        }
    };

    return (
        <div className="input-information">
            <div className="input-information-form">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    id="uploadForm"
                >
                    <Form.Item name="thumbnail">
                        <UploadImage
                            handleChangeValue={(value: UploadFile[]) => {
                                form.setFieldsValue({ thumbnail: value });
                            }}
                        />
                    </Form.Item>
                    <h1 className="input-infomation-h1">
                        Add Infomation Estate
                    </h1>
                    <Col xs={{ span: 18 }}>
                        <Form.Item
                            label="Title:"
                            name="name"
                            rules={NameEstateRule}
                        >
                            <Input size="large" placeholder="Title of estate" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <Form.Item label="Type:" name="type" rules={TypeRule}>
                            <SelecType
                                handleChangeValue={(
                                    value: ISelectOption | ISelectOption[]
                                ) => {
                                    form.setFieldsValue({ type: value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Row>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Area:"
                                name="area"
                                rules={AreaEstateRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    size="large"
                                    min={0}
                                    placeholder="Area of estate"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Bathroom:"
                                name="bathRoom"
                                rules={BathRoomRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    min={0}
                                    size="large"
                                    placeholder="Bathroom of estate"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Bedroom:"
                                name="bedRoom"
                                rules={BedRoomRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    size="large"
                                    min={0}
                                    placeholder="Bedroom of estate"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Col xs={{ span: 6 }}>
                        <Form.Item
                            label="Price:"
                            name="price"
                            rules={PriceEstateRule}
                        >
                            <InputNumber
                                min={0}
                                size="large"
                                placeholder="Price of estate"
                                addonAfter="VND"
                            />
                        </Form.Item>
                    </Col>

                    <Form.Item name="description" label="Description:">
                        <TextArea rows={5} />
                    </Form.Item>
                </Form>
                <p className="address-title">Address:</p>
                <MapNavigator
                    handleGetEstateLocation={(address: ICoordinates) => {
                        setAddressEstate(address);
                    }}
                    errorCoordinate={errorLocation}
                />
                <Button
                    className="input-information-button"
                    htmlType="submit"
                    form="uploadForm"
                    loading={isLoadingUpload}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default InputInformation;
