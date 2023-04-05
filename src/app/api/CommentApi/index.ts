import BaseApi from "../../BaseAPI";
import { ICommentInput, IUpdateCommentInput } from "./CommentApiType";

export const getAllCommentByEstate = async (idEstate: string) => {
    return await BaseApi.get(`estates/${idEstate}/comments`).then(
        res => res.data
    );
};

export const getCommentById = async (idComment: string) => {
    return await BaseApi.get(`comments/${idComment}`).then(res => res.data);
};

export const createComment = async ({
    idEstate,
    commentInput
}: ICommentInput) => {
    return await BaseApi.post(
        `estates/${idEstate}/comments`,
        commentInput
    ).then(res => res.data);
};

export const deleteComment = async (idComment: string) => {
    return await BaseApi.delete(`comments/${idComment}`).then(res => res.data);
};

export const updateComment = async ({
    idComment,
    commentInput
}: IUpdateCommentInput) => {
    return await BaseApi.patch(`comments/${idComment}`, commentInput).then(
        res => res.data
    );
};

export const commentApi = {
    getAllCommentByEstate,
    createComment,
    deleteComment,
    updateComment,
    getCommentById
};
