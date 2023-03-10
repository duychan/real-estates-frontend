import React, { useCallback, useEffect, useState } from "react";
import "./Register.css";
import { Input, Form, Button, message } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    IdcardOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
    ConfirmPasswordRule,
    EmailRule,
    PasswordRule,
    FirstNameRule,
    LastNameRule,
    IDCard
} from "../../common/helper/Validator";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/redux/store";
import { SignupUser } from "../../app/redux/action/AuthAction";
import { IUserRegisterInput } from "../../app/api/AuthenticationApi/AuthType";
const timeOut = 2000;

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { messageResponse } = useSelector((state: RootState) => state.auth);
    const success = useCallback(() => {
        messageApi.open({
            type: "success",
            content: "Login successful!"
        });
    }, [messageApi]);
    const error = useCallback(() => {
        messageApi.open({
            type: "error",
            content: messageResponse
        });
    }, [messageApi, messageResponse]);

    const onFinish = (user: IUserRegisterInput) => {
        dispatch(SignupUser(user));
    };

    useEffect(() => {
        if (messageResponse === "success") {
            success();
            setTimeout(() => {
                navigate("/");
            }, timeOut);
        } else {
            error();
        }
    }, [error, messageResponse, navigate, success]);

    return (
        <div className="register">
            <div className="register-title">
                <h1 className="register-title-text">
                    Welcome to CES Real Estate!
                </h1>
            </div>
            <div className="register-img">
                <img
                    src="https://images.unsplash.com/photo-1489370321024-e0410ad08da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                    alt=""
                />
            </div>

            <div className="register-form">
                <div className="register-content">
                    <h1 className="title-register">Create an account!</h1>

                    <Form
                        layout="vertical"
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="First Name:"
                            name="firstName"
                            rules={FirstNameRule}
                            hasFeedback
                        >
                            <Input
                                placeholder="First Name"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Last Name:"
                            name="lastName"
                            rules={LastNameRule}
                            hasFeedback
                        >
                            <Input
                                placeholder="Last Name"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            label="National ID:"
                            name="nationalId"
                            rules={IDCard}
                            hasFeedback
                        >
                            <Input
                                placeholder="Enter ID"
                                prefix={<IdcardOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            label="E-mail:"
                            name="email"
                            rules={EmailRule}
                            hasFeedback
                        >
                            <Input
                                placeholder="Enter Email Address"
                                prefix={<MailOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password:"
                            name="password"
                            rules={PasswordRule}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter Password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="passwordConfirm"
                            dependencies={["password"]}
                            rules={ConfirmPasswordRule}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter Confirm Password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="button-register"
                                htmlType="submit"
                            >
                                REGISTER
                            </Button>
                        </Form.Item>
                    </Form>

                    <hr className="register-hr" />

                    <p>
                        Already have an account? <Link to="/login">Login!</Link>
                    </p>
                </div>
            </div>
            {messageResponse !== "" ? <> {contextHolder}</> : null}
        </div>
    );
};

export default Register;
