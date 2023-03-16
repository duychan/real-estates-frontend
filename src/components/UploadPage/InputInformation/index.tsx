import { Form, Input, InputNumber, Col, Row, Button } from "antd";
import React, { useState } from "react";
import "./InputInformation.css";
import SelecType from "../SelectType";
const { TextArea } = Input;
import {
    AreaEstateRule,
    BathRoomRule,
    BedRoomRule,
    NameEstateRule,
    PriceEstateRule
} from "../../../common/helper/Validator";

const InputInformation: React.FC = () => {
    return (
        <div className="input-information">
            <h1 className="input-infomation-h1">Add Infomation Estate</h1>
            <div className="input-information-form">
                <Form layout="vertical">
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
                        <Form.Item label="Type:" name="type">
                            <SelecType />
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
