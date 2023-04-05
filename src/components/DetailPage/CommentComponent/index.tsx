import React, { useEffect, useState } from "react";
import { CommentEditor } from "./CommentEditor";
import { IComment, ICommentProps } from "./CommentType";
import { CommentList } from "./CommentList";
import "./Comment.css";
import { useAppDispatch } from "../../../app/redux/store";
import { addComment } from "../../../app/redux/reducer/CommentSlice/AllCommentSlice";
import { CreateComment } from "../../../app/redux/action/CommentAction";
import { useSelector } from "react-redux";
import { getEstateById } from "../../../app/redux/reducer/EstateSlice";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";

export const CommentComponent: React.FC<ICommentProps> = ({
    commentList = []
}) => {
    useEffect(() => {
        setComments(commentList.reverse());
    }, [commentList]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [valueComment, setValueComment] = useState<string>("");
    const dispatch = useAppDispatch();
    const { _id: _idEstate } = useSelector(getEstateById);
    const isAuth = localStorage.getItem("loginToken") !== null;

    const handleSubmitComment = (): void => {
        if (isAuth) {
            if (!valueComment) {
                return;
            }

            setSubmitting(true);

            setTimeout(() => {
                setSubmitting(false);

                dispatch(
                    CreateComment({
                        idEstate: _idEstate,
                        commentInput: { content: valueComment }
                    })
                ).then(res => {
                    const comment = res.payload.data?.record ?? null;
                    if (comment !== null) {
                        dispatch(addComment(comment));
                    } else {
                        dispatch(
                            setErrorNotification(
                                "Sorry, Your comment cannot be sent.Please try again!"
                            )
                        );
                    }
                    setValueComment("");
                });
            }, 1000);
        } else {
            dispatch(setErrorNotification("Please authenticate to continue!"));
        }
    };
    const handleChangeComment = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValueComment(event.target.value);
    };
    const handleCancelComment = () => {
        setValueComment("");
    };
    return (
        <div className="comment-component-style">
            <CommentEditor
                onChange={handleChangeComment}
                onSubmit={handleSubmitComment}
                submitting={submitting}
                value={valueComment}
                onReset={handleCancelComment}
            />
            {comments.length > 0 && <CommentList comments={comments} />}
        </div>
    );
};
