import { Button, Col, Divider, Form, Input, Row } from "antd";
import React from "react";
import {
    ConfirmPasswordRule,
    PasswordRule
} from "../../../common/helper/Validator";
import "./ChangePass.css";
import { IChangePassword } from "./ChangePasswordType";
import { useAppDispatch } from "../../../app/redux/store";
import { ChangePasswordAction } from "../../../app/redux/action/ChangePasswordAction";
import {
    setErrorNotification,
    setSuccessNotification
} from "../../../app/redux/reducer/NotificationSlice";
import { useNavigate } from "react-router-dom";

export const ChangePassword: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onFinish = (query: IChangePassword) => {
        dispatch(ChangePasswordAction(query)).then(response => {
            if (response.payload.message === "success") {
                dispatch(
                    setSuccessNotification(
                        "Your password has been changed successfully!"
                    )
                );
                navigate("/");
            } else {
                dispatch(
                    setErrorNotification(
                        "Change password failed, Please try again!"
                    )
                );
            }
        });
    };

    return (
        <div className="change-password">
            <h1 className="change-password__title">Password settings</h1>
            <Form layout="vertical" onFinish={onFinish}>
                <Col xs={{ span: 9, offset: 1 }}>
                    <Form.Item
                        label="Enter current password:"
                        name="passwordCurrent"
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
                            name="password"
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
                            label="Confirm new password:"
                            name="passwordConfirm"
                            dependencies={["password"]}
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
                        CHANGE PASSWORD
                    </Button>
                </Col>
            </Form>
        </div>
    );
};
