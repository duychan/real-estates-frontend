import { Button, Col, Divider, Form, Input, Row } from "antd";
import React from "react";
import {
    ConfirmPasswordRule,
    PasswordRule
} from "../../../common/helper/Validator";
import "./ChangePass.css";

export const ChangePassword: React.FC = () => {
    return (
        <div className="change-password">
            <h1 className="change-password__title">Password settings</h1>
            <Form layout="vertical">
                <Col xs={{ span: 9, offset: 1 }}>
                    <Form.Item
                        label="Enter current password:"
                        name="currentPassword"
                        rules={PasswordRule}
                        hasFeedback
                    >
                        <div className="change-password__name">
                            <Input.Password
                                className="change-password__input"
                                placeholder="Current Password"
                            />
                        </div>
                    </Form.Item>
                </Col>
                <Row>
                    <Col xs={{ span: 9, offset: 1 }}>
                        <Form.Item
                            label="Enter new password:"
                            name="newPassword"
                            rules={PasswordRule}
                            hasFeedback
                        >
                            <div className="change-password__name">
                                <Input.Password
                                    className="change-password__input"
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
                            <div className="change-password__name">
                                <Input.Password
                                    className="change-password__input"
                                    placeholder="Password"
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />
                <Col xs={{ offset: 1 }}>
                    <Button
                        className="change-password__button"
                        htmlType="submit"
                    >
                        SET NEW PASSWORD
                    </Button>
                </Col>
            </Form>
        </div>
    );
};
