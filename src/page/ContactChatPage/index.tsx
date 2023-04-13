import React from "react";
import { MainChat } from "../../components/ContactPage/MainChat";
import { ChatHeader } from "../../components/ContactPage/ChatHeader";
import "./ContactChatPage.css";
import { SideBarChat } from "../../components/ContactPage/SideBarChat";
import { Col, Row } from "antd";

export const ContactChatPage: React.FC = () => {
    return (
        <div className="contact-chat-page">
            <Row>
                <Col span={6}>
                    <SideBarChat />
                </Col>
                <Col span={18} className="contact-chat-container">
                    <ChatHeader />
                    <MainChat />
                </Col>
            </Row>
        </div>
    );
};
