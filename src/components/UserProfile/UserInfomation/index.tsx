import React, { useState } from "react";
import "./UserInformation.css";
import {
    Input,
    Form,
    Col,
    Row,
    DatePicker,
    Radio,
    Divider,
    Button
} from "antd";
import {
    AddressRule,
    DateOfBirthRule,
    EmailRule,
    FirstNameRule,
    IDCard,
    LastNameRule,
    PhoneNumberRule
} from "../../../common/helper/Validator";

const UserInformation: React.FC = () => {
    const [filebase64, setFileBase64] = useState<string>("");
    const convertFile = (files: FileList | null) => {
        if (files) {
            const fileRef = files[0] || "";
            const fileType: string = fileRef.type || "";
            const reader = new FileReader();
            reader.readAsBinaryString(fileRef);
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                setFileBase64(
                    `data:${fileType};base64,${btoa(
                        ev.target?.result as string
                    )}`
                );
            };
        }
    };

    return (
        <div className="user-profile">
            <h1 className="user-profile-title">Personal information</h1>
            <Form layout="vertical">
                <Form.Item>
                    <Col xs={{ offset: 1 }}>
                        <div className="user-profile-avatar">
                            <img
                                className="user-profile-img"
                                src={filebase64}
                                alt=""
                            />
                            <div className="user-profile-input-avatar">
                                <label
                                    htmlFor="avatar-user"
                                    className="user-profile-label-img"
                                >
                                    Change your avatar
                                </label>
                                <input
                                    accept="image/*"
                                    id="avatar-user"
                                    className="user-profile-input-img"
                                    type="file"
                                    onChange={e => convertFile(e.target.files)}
                                />
                            </div>
                        </div>
                    </Col>
                </Form.Item>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="First Name:"
                            name="firstname"
                            rules={FirstNameRule}
                            hasFeedback
                        >
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input"
                                    placeholder="First Name"
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 2 }}>
                        <Form.Item
                            label="Last Name:"
                            name="lastname"
                            rules={LastNameRule}
                            hasFeedback
                        >
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input"
                                    placeholder="Last Name"
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item label="Your Gender:" name="gender">
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 2 }}>
                        <Form.Item
                            label="Date of birth:"
                            name="dateofbirth"
                            rules={DateOfBirthRule}
                            hasFeedback
                        >
                            <DatePicker className="user-profile-date" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="National ID:"
                            name="nationalid"
                            rules={IDCard}
                            hasFeedback
                        >
                            <div className="user-profile-name">
                                <Input
                                    placeholder="ID National"
                                    className="user-profile-input"
                                />
                            </div>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 9, offset: 2 }}>
                        <Form.Item
                            label="Current Address"
                            name="address"
                            rules={AddressRule}
                            hasFeedback
                        >
                            <Input
                                className="user-profile-input"
                                placeholder="Current Address"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Email:"
                            name="email"
                            rules={EmailRule}
                            hasFeedback
                        >
                            <Input
                                className="user-profile-input"
                                placeholder="Email"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 2 }}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={PhoneNumberRule}
                            hasFeedback
                        >
                            <Input
                                className="user-profile-input"
                                placeholder="Phone Number"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Col xs={{ offset: 1 }}>
                    <Button className="user-profile-button" htmlType="submit">
                        SAVE CHANGES
                    </Button>
                </Col>
            </Form>
        </div>
    );
};

export default UserInformation;
