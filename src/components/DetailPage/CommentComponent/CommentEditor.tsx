import { Button, Form, Input } from "antd";
import React from "react";
import { IEditor } from "./CommentType";
import "./Comment.css";
import { useSelector } from "react-redux";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { AvatarComponent } from "../../pageLayout/Navbar/AvatarComponent";

const { TextArea } = Input;

export const CommentEditor: React.FC<IEditor> = ({
    onChange,
    onSubmit,
    onReset,
    submitting,
    value = ""
}) => {
    const { firstName = "", lastName = "", profileImage = "" } = useSelector(
        getUser
    );
    const [form] = Form.useForm();

    return (
        <div className="comment-editor">
            <AvatarComponent
                imgUser={profileImage}
                firstName={firstName}
                lastName={lastName}
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
                <div className="comment-editor-submit">
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
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            onClick={onReset}
                            className="comment-editor-button-cancel"
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};
