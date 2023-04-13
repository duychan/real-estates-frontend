import React from "react";
import "./MainChat.css";
import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Avatar } from "antd";

export const MainChat: React.FC = () => {
    return (
        <div className="main-chat">
            <div className="main-chat-conversation">
                <div className="main-chat-message">
                    <div className="main-chat-message-top">
                        <Avatar
                            className="main-chat-message-avatar"
                            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                        />
                        <p className="main-chat-message-text">
                            Hello, How are you doing?
                        </p>
                    </div>
                    <div className="main-chat-message-time">1 hour ago</div>
                </div>
                {/* static UI */}
            </div>

            <div className="main-chat-form">
                <Form className="main-chat-form-message">
                    <Row>
                        <Col span={23}>
                            <Form.Item>
                                <Input
                                    placeholder="Type something..."
                                    className="main-chat-message-input"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Form.Item>
                                <Button className="main-chat-send-button">
                                    <SendOutlined className="main-chat-send-icon" />
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
