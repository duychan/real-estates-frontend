import React from "react";
import "./MainChat.css";
import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Avatar } from "antd";
import TextArea from "antd/es/input/TextArea";

export const MainChat: React.FC = () => {
    return (
        <div className="main-chat">
            <div className="main-chat-conversation">
                <div className="main-chat-message">
                    <div className="main-chat-message-top">
                        <Avatar
                            size={40}
                            className="main-chat-message-avatar"
                            src="https://joesch.moe/api/v1/random?key=1"
                            alt=""
                        />
                        <p className="main-chat-message-text">
                            Hello, How are you doing?
                        </p>
                    </div>
                    <div className="main-chat-message-time">1 hour ago</div>
                </div>
            </div>

            <div className="main-chat-form">
                <Form className="main-chat-form-message">
                    <Row>
                        <Col>
                            <label htmlFor="main-chat-files-picker">
                                <PaperClipOutlined className="chat-header-icon" />
                            </label>
                            <Input
                                multiple
                                id="main-chat-files-picker"
                                type="file"
                            />
                        </Col>
                        <Col span={21}>
                            <Form.Item>
                                <TextArea
                                    autoSize={{ minRows: 1, maxRows: 6 }}
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
