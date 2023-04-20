import React from "react";
import {
    PhoneOutlined,
    DeleteOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import "./ChatHeader.css";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { getSellerInfo } from "../../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { AvatarComponent } from "../../pageLayout/Navbar/AvatarComponent";

export const ChatHeader: React.FC = () => {
    const { profileImage, firstName, lastName, idUser } =
        useSelector(getSellerInfo);
    return (
        <div className="chat-header">
            <Row>
                <Col className="chat-header-avatar">
                    <AvatarComponent
                        imgUser={profileImage}
                        firstName={firstName}
                        lastName={lastName}
                    />
                </Col>
                <Col xs={{ span: 17, offset: 0 }}>
                    <div className="chat-header-text">
                        <div className="chat-header-title">
                            {firstName} {lastName}
                        </div>
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
