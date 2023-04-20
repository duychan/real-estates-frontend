import React from "react";
import { MainChat } from "../../components/ContactPage/MainChat";
import { ChatHeader } from "../../components/ContactPage/ChatHeader";
import "./ContactChatPage.css";
import { SideBarChat } from "../../components/ContactPage/SideBarChat";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { getIdConversation } from "../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { ReactComponent as NoData } from "../../assets/icon/No-data-pana.svg";
import { getAllMyConversation } from "../../app/redux/reducer/ChatSlice/MyConversationSlice";

export const ContactChatPage: React.FC = () => {
    const ListOfMyConversation = useSelector(getAllMyConversation);

    return (
        <div className="contact-chat-page">
            <Row>
                <Col span={6}>
                    <SideBarChat />
                </Col>
                {ListOfMyConversation.length > 0 ? (
                    <Col span={18} className="contact-chat-container">
                        <ChatHeader />
                        <MainChat />
                    </Col>
                ) : (
                    <Col span={18} className="contact-chat-nodata">
                        <NoData className="contact-chat-no-data-img" />
                        <p className="contact-chat-empty-content">
                            No contact !
                        </p>
                    </Col>
                )}
            </Row>
        </div>
    );
};
