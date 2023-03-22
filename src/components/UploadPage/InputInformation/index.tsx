import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { ISelectOption } from "../SelectType/SelectItemType";
import { RcFile } from "antd/es/upload";
import { uploadEstate } from "../../../app/api/UploadEstateApi";
import { setUploadFormData } from "../../../app/redux/reducer/UploadSlice";
import { RootState } from "../../../app/redux/store";
import { IUploadAction } from "../../../app/redux/reducer/UploadSlice/UploadSliceType";

const InputInformation = () => {
    const navigate = useNavigate();
    const { _id } = useSelector(getUser);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { formData: formDataEstate } = useSelector(
        (state: RootState) => state.uploadEstate
    );
    const onFinish = (estate: IEstateUpload) => {
        const [coverImg, ...rest] = estate.thumbnail;

        const fileList = estate.thumbnail.map(
            (file: UploadFile) => file.originFileObj as RcFile
        );
        const estateAction: IUploadAction = {
            owner: _id,
            name: estate.name,
            address: "192 Nguyen Luong Bang",
            area: estate.area,
            price: estate.price,
            currentStatus: "641805bed27ac809a60a9cd3",
            type: estate.type.key,
            coverImg: coverImg,
            fileList: fileList,
            bedRoom: estate.bedRoom,
            bathRoom: estate.bathRoom,
            description: estate.description,
            _id: "",
            updateAt: "",
            createAt: ""
        };
        dispatch(setUploadFormData(estateAction));

        if (formDataEstate !== null) {
            uploadEstate(formDataEstate).then(res => {
                navigate("/single-estate/" + res.data.records._id);
            });
        } else {
            alert("error");
        }
    };

    return (
        <div className="input-information">
            <div className="input-information-form">
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="thumbnail">
                        <UploadImage
                            handleChangeValue={(value: UploadFile[]) => {
                                form.setFieldValue("thumbnail", value);
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
                                    form.setFieldValue("type", value);
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

                    <Button
                        className="input-information-button"
                        htmlType="submit"
                    >
                        SUBMIT
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default InputInformation;
