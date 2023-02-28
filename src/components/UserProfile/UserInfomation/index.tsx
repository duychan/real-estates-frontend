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
    Button,
    Upload,
    message
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
};

const UserInformation: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div>Upload</div>
        </div>
    );
    const imgInput = (
        <img src={imageUrl} alt="avatar" className="user-profile-img" />
    );
    return (
        <div className="user-profile">
            <h1 className="user-profile-title">Personal information</h1>
            <Form layout="vertical">
                <Form.Item>
                    <Col xs={{ offset: 1 }}>
                        <div className="user-profile-avatar">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? imgInput : uploadButton}
                            </Upload>
                        </div>
                    </Col>
                </Form.Item>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="First Name:"
                            name="firstname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your First Name"
                                },
                                { whitespace: true }
                            ]}
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
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Last Name:"
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your Last Name"
                                },
                                { whitespace: true }
                            ]}
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
                <Col xs={{ offset: 1 }}>
                    <Form.Item label="Your Gender" name="gender">
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Date of birth:"
                            name="dateofbirth"
                            rules={[
                                {
                                    required: true,
                                    message: "Please provide your date of birth"
                                }
                            ]}
                            hasFeedback
                        >
                            <DatePicker className="user-profile-date" />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Current Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your Address"
                                },
                                { whitespace: true }
                            ]}
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
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email"
                                },
                                {
                                    type: "email",
                                    message: "Please enter a valid email"
                                }
                            ]}
                            hasFeedback
                        >
                            <Input
                                className="user-profile-input"
                                placeholder="Email"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your Phone Number"
                                }
                            ]}
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
