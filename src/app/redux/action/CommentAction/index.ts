import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentApi } from "../../../api/CommentApi";
import {
    ICommentInput,
    IUpdateCommentInput
} from "../../../api/CommentApi/CommentApiType";

export const GetAllCommentByEstate = createAsyncThunk(
    "comment/getAllByEstate",
    async (idEstate: string) => {
        try {
            const response = await commentApi.getAllCommentByEstate(idEstate);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const CreateComment = createAsyncThunk(
    "comment/create",
    async (commentInput: ICommentInput) => {
        try {
            const response = await commentApi.createComment(commentInput);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const DeleteComment = createAsyncThunk(
    "comment/delete",
    async (idComment: string) => {
        try {
            const response = await commentApi.deleteComment(idComment);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const UpdateComment = createAsyncThunk(
    "comment/update",
    async (commentInput: IUpdateCommentInput) => {
        try {
            const response = await commentApi.updateComment(commentInput);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetCommentById = createAsyncThunk(
    "comment/getById",
    async (idComment: string) => {
        try {
            const response = await commentApi.getCommentById(idComment);
            return response;
        } catch (error) {
            return error;
        }
    }
);
