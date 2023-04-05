import React from "react";

export interface IEditor {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onReset: () => void;
    submitting: boolean;
    value: string | number | string[];
}

export interface IComment {
    _id: string;
    author: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    avatar: string;
    content: string;
    commentTime: string;
    isEdit: boolean;
}
export interface ICommentList {
    comments: IComment[];
}

export interface ICommentProps {
    commentList: IComment[];
}
