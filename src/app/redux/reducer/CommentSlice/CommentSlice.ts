import { createSlice } from "@reduxjs/toolkit";
import {
    CreateComment,
    GetCommentById,
    UpdateComment
} from "../../action/CommentAction";
import { RootState } from "../../store";
import { IGetComment, ICommentState } from "./CommentSliceType";

const initialState: ICommentState<IGetComment> = {
    message: "",
    data: {
        record: {
            _id: "",
            author: {
                _id: "",
                firstName: "",
                lastName: ""
            },
            estate: "",
            content: "",
            createdAt: "",
            updatedAt: "",
            isEdit: false
        }
    },
    isLoading: false
};

export const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(CreateComment.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(CreateComment.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(CreateComment.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
        builder
            .addCase(UpdateComment.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(UpdateComment.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(UpdateComment.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
        builder
            .addCase(GetCommentById.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetCommentById.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetCommentById.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default CommentSlice.reducer;
export const getCommentByEstate = (state: RootState) =>
    state.comment.data.record;
