import React from "react";
import {
    PhoneOutlined,
    DeleteOutlined,
    VideoCameraOutlined
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
                <Col xs={{ span: 17, offset: 0 }}>
                    <div className="chat-header-text">
                        <div className="chat-header-title">hang doan</div>
                        <div className="chat-header-subtitle">Online</div>
                    </div>
                </Col>
                <Col xs={{ span: 1, offset: 2 }}>
                    <div className="chat-header-icon-wrapper">
                        <PhoneOutlined className="chat-header-icon phone" />
                        <VideoCameraOutlined className="chat-header-icon" />
                        <DeleteOutlined className="chat-header-icon" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
