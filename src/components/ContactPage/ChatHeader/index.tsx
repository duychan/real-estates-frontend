import React from "react";
import {
    PhoneFilled,
    DeleteFilled,
    PaperClipOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import "./ChatHeader.css";
import { Avatar, Col, Form, Input, Row } from "antd";

export const ChatHeader: React.FC = () => {
    return (
        <div className="chat-header">
            <Row>
                <Col>
                    <Avatar
                        className="chat-header-avatar"
                        src="https://joesch.moe/api/v1/random?key=1"
                    />
                </Col>
                <Col xs={{ span: 20, offset: 0 }}>
                    <div className="chat-header-text">
                        <div className="chat-header-title">hang doan</div>
                        <div className="chat-header-subtitle">Online</div>
                    </div>
                </Col>
                <Col xs={{ span: 1, offset: 2 }}>
                    <div className="chat-header-icon-wrapper">
                        <Form>
                            <label htmlFor="chat-header-files-picker">
                                <PaperClipOutlined className="chat-header-icon" />
                            </label>
                            <Input
                                multiple
                                id="chat-header-files-picker"
                                type="file"
                            />
                        </Form>
                        <PhoneFilled className="chat-header-icon" />
                        <DeleteFilled className="chat-header-icon" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
