import { List } from "antd";
import React from "react";
import { CommentItem } from "./Comment";
import { ICommentList } from "./CommentType";

export const CommentList: React.FC<ICommentList> = ({ comments }) => {
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${
                comments.length > 1 ? "replies" : "reply"
            }`}
            itemLayout="horizontal"
            renderItem={({ author, avatar, content }) => {
                return (
                    <li>
                        <CommentItem
                            author={author}
                            avatar={avatar}
                            content={content}
                        />
                    </li>
                );
            }}
        />
    );
};
