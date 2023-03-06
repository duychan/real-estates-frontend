import React, { useEffect } from "react";
import "./Register.css";
import { Input, Form, Button } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    IdcardOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
    ConfirmPasswordRule,
    EmailRule,
    PasswordRule,
    FirstNameRule,
    LastNameRule,
    IDCard
} from "../../common/helper/Validator";
const Register: React.FC = () => {
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

                    <Form layout="vertical" autoComplete="off">
                        <Form.Item
                            label="First Name:"
                            name="firstname"
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
                            name="lastname"
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
                            name="nationalid"
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
                            name="confirmpassword"
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

                    <p className="register-link">
                        Already have an account? <Link to="/login">Login!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
