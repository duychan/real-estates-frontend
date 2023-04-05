import { List } from "antd";
import React from "react";
import { CommentItem } from "./Comment";
import { IComment, ICommentList } from "./CommentType";

export const CommentList: React.FC<ICommentList> = ({ comments = [] }) => {
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${
                comments.length > 1 ? "replies" : "reply"
            }`}
            itemLayout="horizontal"
            renderItem={(comment: IComment) => {
                return (
                    <li>
                        <CommentItem {...comment} />
                    </li>
                );
            }}
        />
    );
};
