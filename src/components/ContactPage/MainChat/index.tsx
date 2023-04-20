import React, { useEffect, useRef, useState } from "react";
import "./MainChat.css";
import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Avatar } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/redux/store";
import { format } from "timeago.js";
import { PostMessageChat } from "../../../app/redux/action/ChatContactAction";
import {
    addMessage,
    getAllMessage,
    getIdConversation
} from "../../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";
import { Socket, io } from "socket.io-client";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { IMessageResponse } from "../../../app/redux/reducer/ChatSlice/ChatSliceType";
import { IUserInformation } from "../../../app/redux/reducer/AuthSlice/AuthSliceType";
import { AvatarComponent } from "../../pageLayout/Navbar/AvatarComponent";
const host = "http://localhost:3000";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const MainChat: React.FC = () => {
    const idConversation = useSelector(getIdConversation);
    const dispatch = useAppDispatch();
    const [messageContent, setMessageContent] = useState<string>("");
    const { records: recordsAllMessage } = useSelector(getAllMessage);
    const scrollRef = useRef<HTMLDivElement>(null);
    let mounted = true;
    const userAuth = useSelector(getUser);
    const { _id: buyerId } = userAuth;
    useEffect(() => {
        if (idConversation !== "") {
            socket = io(host, {
                transports: ["websocket"]
            });
            socket.emit("identity", buyerId);
            socket.emit("subscribe", idConversation, buyerId);
            socket.on("newMessage", (data: IMessageResponse) => {
                if (mounted) {
                    dispatch(addMessage(data.message));
                }
            });
            return () => {
                mounted = false;
                socket.off("newMessage");
            };
        }
    }, [idConversation]);

    const onFinish = () => {
        if (messageContent !== "") {
            dispatch(
                PostMessageChat({
                    conversationId: idConversation,
                    messageInput: {
                        messageContent: messageContent
                    }
                })
            ).then(res => {
                const newMessage = res.payload.data ?? null;
                if (newMessage === null) {
                    dispatch(
                        setErrorNotification(
                            "Sorry, Your message cannot be sent.Please try again!"
                        )
                    );
                }
                setMessageContent("");
            });
        } else {
            dispatch(setErrorNotification("Message must not empty!"));
        }
    };

    useEffect(() => {
        const scrollMessageContent = document.getElementById(
            "main-chat-conversation"
        );
        scrollMessageContent?.scrollTo({
            top: scrollMessageContent.scrollHeight,
            behavior: "smooth"
        });
    }, [recordsAllMessage]);

    const handleChangeMessageContent = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMessageContent(event.target.value);
    };

    return (
        <div className="main-chat">
            <div id="main-chat-conversation">
                {recordsAllMessage?.map((record, key) => {
                    return (
                        <div
                            className={
                                record.postedByUser._id === buyerId
                                    ? "main-chat-message-from-me "
                                    : "main-chat-message-from-other "
                            }
                            key={key}
                        >
                            <div
                                className="main-chat-message-container"
                                ref={scrollRef}
                            >
                                <div className="main-chat-message-top">
                                    <AvatarComponent
                                        imgUser={
                                            record.postedByUser.profileImage
                                        }
                                        firstName={
                                            (
                                                record.postedByUser as IUserInformation
                                            ).firstName
                                        }
                                        lastName={
                                            (
                                                record.postedByUser as IUserInformation
                                            ).lastName
                                        }
                                    />
                                    <p className="main-chat-message-text">
                                        {record.messageContent}
                                    </p>
                                </div>
                                <div className="main-chat-message-time">
                                    {format(record.createdAt)}
                                </div>
                                <div></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="main-chat-form">
                <Form className="main-chat-form-message" onFinish={onFinish}>
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
                                <Input
                                    placeholder="Type something..."
                                    className="main-chat-message-input"
                                    size="large"
                                    onChange={handleChangeMessageContent}
                                    value={messageContent}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Form.Item>
                                <Button
                                    className="main-chat-send-button"
                                    htmlType="submit"
                                >
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
