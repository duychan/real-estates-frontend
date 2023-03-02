import React, { useEffect } from "react";
import "./Register.css";
import { Input, Form, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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
                <div className="content">
                    <h1 className="title-register">Create an account!</h1>

                    <Form layout="vertical" autoComplete="off">
                        <Form.Item
                            label="E-mail:"
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
                                placeholder="Enter Email Address"
                                prefix={<MailOutlined />}
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password:"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!"
                                },
                                { min: 6 },
                                { whitespace: true },
                                {
                                    validator: (_, value) =>
                                        value &&
                                        /(?=.*?[A-Z])/.test(value) &&
                                        /(?=.*?[a-z])/.test(value) &&
                                        /(?=.*?[0-9])/.test(value)
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  "Password must contain at least 6 characters, 1 capital and 1 number"
                                              )
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter Password"
                                prefix={<LockOutlined />}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmpassword"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            "The two passwords that you entered does not match."
                                        );
                                    }
                                })
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Enter Confirm Password"
                                prefix={<LockOutlined />}
                                size="large"
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

                    <hr />

                    <p style={{ margin: "2rem 0 " }}>
                        Already have an account? <Link to="/login">Login!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
