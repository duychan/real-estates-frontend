import { Button, Form, Input } from "antd";
import React from "react";
import "./ForgotPass.css";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const ForgotPassword: React.FC = () => {
    return (
        <div className="register">
            <div className="register-img">
                <img
                    src="https://images.unsplash.com/photo-1445272885371-027f17af0130?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    alt=""
                />
            </div>

            <div className="forgot-pass-form">
                <div className="content">
                    <h1 className="title-pass">Forgot password?</h1>
                    <p>
                        Enter your registered email address and we will send you
                        an email with instructions to reset your password.
                    </p>

                    <Form autoComplete="off" layout="vertical">
                        <Form.Item
                            name={"email"}
                            className="email-input"
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
                                type="email"
                                placeholder="Enter Email Address"
                                required
                                prefix={<MailOutlined />}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Login here!</Link>
                            </p>
                        </Form.Item>

                        <Button className="button-send">Send</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};
