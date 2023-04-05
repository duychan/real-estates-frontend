import { createSlice } from "@reduxjs/toolkit";
import { GetAllCommentByEstate } from "../../action/CommentAction";
import { RootState } from "../../store";
import { IGetComment, ICommentState } from "./CommentSliceType";

const initialState: ICommentState<IGetComment[]> = {
    message: "",
    data: {
        record: []
    },
    isLoading: false
};

export const AllCommentSlice = createSlice({
    name: "AllComment",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.data.record.push(action.payload);
        },
        deleteComment: (state, action) => {
            return {
                ...state,
                data: {
                    record: state.data.record.filter(
                        item => item._id !== action.payload
                    )
                }
            };
        },
        editComment: (state, action) => {
            return {
                ...state,
                data: {
                    record: state.data.record.map(item =>
                        item._id === action.payload._id
                            ? (item = action.payload.comment)
                            : item
                    )
                }
            };
        }
    },

    extraReducers: builder => {
        builder
            .addCase(GetAllCommentByEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetAllCommentByEstate.fulfilled, (state, action) => {
                const {
                    data = { record: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetAllCommentByEstate.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default AllCommentSlice.reducer;
export const {
    addComment,
    deleteComment,
    editComment
} = AllCommentSlice.actions;
export const getAllCommentByEstate = (state: RootState) =>
    state.AllComment.data.record;
