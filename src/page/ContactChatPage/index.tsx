import React from "react";
import { MainChat } from "../../components/ContactPage/MainChat";
import { ChatHeader } from "../../components/ContactPage/ChatHeader";
import "./ContactChatPage.css";

export const ContactChatPage: React.FC = () => {
    return (
        <div className="contact-chat-page">
            <ChatHeader />
            <MainChat />
        </div>
    );
};
