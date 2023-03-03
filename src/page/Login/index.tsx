import { Button, Form, Input } from "antd";
import React from "react";
import "../Register/Register.css";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { EmailRule, PasswordRule } from "../../common/helper/Validator";

export const LoginPage: React.FC = () => {
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
                    <h1 className="title-register">Log in to your account!</h1>

                    <Form autoComplete="off" layout="vertical">
                        <Form.Item
                            name={"email"}
                            label="E-mail"
                            rules={EmailRule}
                            hasFeedback
                        >
                            <Input
                                type="email"
                                placeholder="Enter Email Address"
                                required
                                prefix={<MailOutlined />}
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            style={{ margin: "1rem 0 " }}
                            rules={PasswordRule}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter Password"
                                required
                                prefix={<LockOutlined />}
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <a
                                className="login-form-forgot"
                                href="/forgot-password"
                            >
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Button className="button-login">LOGIN</Button>
                    </Form>

                    <hr />

                    <p className="register-login">
                        Need an account?{" "}
                        <Link to="/register">Create an account!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
