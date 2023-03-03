import { Button, Col, Divider, Form, Input, Row } from "antd";
import React from "react";
import {
    ConfirmPasswordRule,
    PasswordRule
} from "../../../common/helper/Validator";
import "./ChangePass.css";

export const ChangePassword: React.FC = () => {
    return (
        <div className="user-profile">
            <h1 className="user-profile-title">Password settings</h1>
            <Form layout="vertical">
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Enter new password:"
                            name="newPassword"
                            rules={PasswordRule}
                            hasFeedback
                        >
                            <div className="user-profile-name">
                                <Input.Password
                                    className="user-profile-input"
                                    placeholder="Password"
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Repeat new password:"
                            name="confirmPassword"
                            rules={ConfirmPasswordRule}
                            hasFeedback
                        >
                            <div className="user-profile-name">
                                <Input.Password
                                    className="user-profile-input"
                                    placeholder="Password"
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />
                <Col xs={{ offset: 1 }}>
                    <Button className="user-profile-button" htmlType="submit">
                        SET NEW PASSWORD
                    </Button>
                </Col>
            </Form>
        </div>
    );
};
