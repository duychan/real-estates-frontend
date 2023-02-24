import { Avatar, Button, Form, Input } from "antd";
import React from "react";
import { IEditor } from "./CommentType";
import "./Comment.css";

const { TextArea } = Input;

export const CommentEditor: React.FC<IEditor> = ({
    onChange,
    onSubmit,
    submitting,
    value
}) => {
    return (
        <div className="comment-editor">
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
            <div className="comment-editor-text">
                <Form.Item>
                    <TextArea
                        rows={3}
                        onChange={onChange}
                        value={value}
                        className="comment-textarea"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={submitting}
                        onClick={onSubmit}
                        className="comment-editor-button"
                    >
                        Comment
                    </Button>
                </Form.Item>
            </div>
        </div>
    );
};
