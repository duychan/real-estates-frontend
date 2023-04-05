import { Button, Form, Input, Tooltip } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { IComment } from "./CommentType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./Comment.css";
import { useAppDispatch } from "../../../app/redux/store";
import {
    DeleteComment,
    UpdateComment
} from "../../../app/redux/action/CommentAction";
import {
    deleteComment,
    editComment
} from "../../../app/redux/reducer/CommentSlice/AllCommentSlice";
import { useSelector } from "react-redux";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";
import { AvatarComponent } from "../../pageLayout/Navbar/AvatarComponent";

const { TextArea } = Input;

export const CommentItem: React.FC<IComment> = ({
    _id = "",
    author: { firstName = "", lastName = "", _id: _idAuthor = "" },
    avatar = "",
    content = "",
    commentTime = "",
    isEdit = false
}) => {
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);
    const [action, setAction] = useState<string>("");
    const dispatch = useAppDispatch();
    const { _id: _idUser } = useSelector(getUser);
    const [isEditComment, setIsEditComment] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [valueComment, setValueComment] = useState<string>("");
    const isAuth = localStorage.getItem("loginToken");

    const nameOwnerComment = `${firstName || ""} ${lastName || ""}`;
    const handleDeleteComment = () => {
        if (_idUser === _idAuthor && isAuth) {
            dispatch(DeleteComment(_id));
            dispatch(deleteComment(_id));
        } else {
            dispatch(setErrorNotification("Please authenticate to continue!"));
        }
    };

    const handleEditComment = (): void => {
        if (!valueComment || valueComment === content) {
            return;
        }

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            dispatch(
                UpdateComment({
                    idComment: _id,
                    commentInput: { content: valueComment }
                })
            ).then(res => {
                const comment = res.payload.data?.record ?? null;
                if (comment !== null) {
                    dispatch(editComment({ _id: _id, comment: comment }));
                } else {
                    dispatch(
                        setErrorNotification(
                            "Sorry, Your comment cannot be edited.Please try again!"
                        )
                    );
                }
                setValueComment("");
                setIsEditComment(false);
            });
        }, 1000);
    };
    const handleChangeComment = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValueComment(event.target.value);
    };
    const handleCancelComment = () => {
        setValueComment("");
        setIsEditComment(false);
    };

    return (
        <div className="comment-item">
            <AvatarComponent
                imgUser={avatar}
                firstName={firstName}
                lastName={lastName}
            />

            <div className="comment-content">
                <div className="comment-content-top">
                    <div className="comment-user">
                        <a className="comment-user-name">{nameOwnerComment}</a>
                        <Tooltip
                            className="comment-time"
                            title={moment(commentTime).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )}
                        >
                            <span>
                                {moment(commentTime).format("YYYY-MM-DD HH:mm")}
                            </span>
                        </Tooltip>
                        {isEdit && (
                            <p className="comment-user-edited">Edited</p>
                        )}
                    </div>
                    <div className="comment-user">
                        <EditOutlined
                            className="comment-edit"
                            onClick={() => {
                                if (isAuth) {
                                    setIsEditComment(true);
                                    setValueComment(content);
                                } else {
                                    dispatch(
                                        setErrorNotification(
                                            "Please authenticate to continue!"
                                        )
                                    );
                                }
                            }}
                        />
                        <DeleteOutlined
                            className="comment-delete"
                            onClick={handleDeleteComment}
                        />
                    </div>
                </div>
                {isEditComment ? (
                    <div className="comment-editor-text">
                        <Form.Item>
                            <TextArea
                                rows={3}
                                onChange={handleChangeComment}
                                value={valueComment}
                                className="comment-textarea"
                            />
                        </Form.Item>
                        <div className="comment-editor-submit">
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    loading={submitting}
                                    onClick={handleEditComment}
                                    className="comment-editor-button"
                                >
                                    Update
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    onClick={handleCancelComment}
                                    className="comment-editor-button-cancel"
                                >
                                    Cancel
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                ) : (
                    <p className="comment-sentence">{content}</p>
                )}
            </div>
        </div>
    );
};
