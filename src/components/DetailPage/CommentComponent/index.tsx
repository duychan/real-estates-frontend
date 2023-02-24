import React, { useEffect, useRef, useState } from "react";
import { Avatar, Form, Button, List, Input } from "antd";
import Comment from "antd";
import { CommentEditor } from "./CommentEditor";
import { IComment } from "./CommentType";
import { CommentList } from "./CommentList";
import "./Comment.css";

const { TextArea } = Input;

export const CommentComponent: React.FC = () => {
    const commentList: IComment[] = [
        {
            author: "Han Solo",
            avatar:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
        }
    ];
    const [comments, setComments] = useState<IComment[]>(commentList);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [valueComment, setValueComment] = useState<string>("");

    const handleSubmitComment = (): void => {
        if (!valueComment) {
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            setValueComment("");
            setComments([
                {
                    author: "Han Solo",
                    avatar:
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
                    content: valueComment
                },
                ...comments
            ]);
        }, 1000);
    };
    const handleChangeComment = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValueComment(event.target.value);
    };
    return (
        <div className="comment-component-style">
            <CommentEditor
                onChange={handleChangeComment}
                onSubmit={handleSubmitComment}
                submitting={submitting}
                value={valueComment}
            />
            {comments.length > 0 && <CommentList comments={comments} />}
        </div>
    );
};
