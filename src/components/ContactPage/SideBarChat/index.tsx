import { AutoComplete, Avatar, Col, Input, Row } from "antd";
import React from "react";
import "./SideBarChat.css";

export const SideBarChat: React.FC = () => {
    return (
        <div className="sidebar-chat">
            <div className="siderbar-chat-title">
                <h1 className="siderbar-chat-h1">Chats</h1>
            </div>
            <div className="sidebar-chat-search">
                <AutoComplete className="sidebar-chat-form-autocomplete">
                    <Input.Search
                        className="sidebar-chat-input-search"
                        size="large"
                        placeholder="Search customers..."
                        enterButton
                    />
                </AutoComplete>
            </div>
            <div className="sidebar-chatcard">
                <Row>
                    <Col>
                        <Avatar
                            size={54}
                            className="sidebar-chatcard-avatar"
                            src="https://joesch.moe/api/v1/random?key=1"
                            alt=""
                            shape="square"
                        />
                    </Col>
                    <div className="sidebar-chatcard-infor">
                        <p className="sidebar-chatcard-username">Hang Doan</p>
                        <p className="sidebar-chatcard-lastmessage">
                            Hello, Phuong
                        </p>
                    </div>
                    <Col></Col>
                </Row>
            </div>
        </div>
    );
};
