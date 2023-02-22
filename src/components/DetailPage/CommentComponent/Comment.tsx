import { Avatar, Tooltip } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { IComment } from "./CommentType";
import {
    LikeOutlined,
    DislikeOutlined,
    DeleteOutlined,
    EditOutlined
} from "@ant-design/icons";
import "./Comment.css";

export const CommentItem: React.FC<IComment> = ({
    author,
    avatar,
    content
}) => {
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);
    const [action, setAction] = useState<string>("");

    return (
        <div className="comment-item">
            <Avatar size={50} src={avatar} alt="" />

            <div className="comment-content">
                <div className="comment-content-top">
                    <div className="comment-user">
                        <a className="comment-user-name">{author}</a>
                        <Tooltip
                            className="comment-time"
                            title={moment().format("YYYY-MM-DD HH:mm:ss")}
                        >
                            <span>{moment().format("YYYY-MM-DD HH:mm")}</span>
                        </Tooltip>
                    </div>
                    <div className="comment-user">
                        <EditOutlined className="comment-edit" />
                        <DeleteOutlined className="comment-delete" />
                    </div>
                </div>

                <p className="comment-sentence">{content}</p>
                <div className="comment-action">
                    <span key="comment-basic-like">
                        <Tooltip title="Like">
                            <LikeOutlined
                                className={
                                    action === "liked" ? "comment-react" : ""
                                }
                                onClick={() => {
                                    setLikes(1);
                                    setDislikes(0);
                                    setAction("liked");
                                }}
                            />
                        </Tooltip>
                        <span className="comment-action-status">{likes}</span>
                    </span>
                    <span key=' key="comment-basic-dislike"'>
                        <Tooltip title="Dislike">
                            <DislikeOutlined
                                className={
                                    action === "disliked" ? "comment-react" : ""
                                }
                                onClick={() => {
                                    {
                                        setLikes(0);
                                        setDislikes(1);
                                        setAction("disliked");
                                    }
                                }}
                            />
                        </Tooltip>
                        <span className="comment-action-status">
                            {dislikes}
                        </span>
                    </span>
                    <span key="comment-basic-reply-to">Reply to</span>
                </div>
            </div>
        </div>
    );
};
