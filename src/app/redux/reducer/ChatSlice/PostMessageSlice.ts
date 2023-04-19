import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IPostMessage } from "./ChatSliceType";
import { PostMessageChat } from "../../action/ChatContactAction";

const initialState: IPostMessage = {
    message: "",
    data: {
        conversation: "",
        postedByUser: {
            _id: "",
            firstName: "",
            lastName: "",
            nationalId: "",
            email: "",
            createdAt: "",
            updatedAt: "",
            profileImage: "",
            address: "",
            phoneNumber: "",
            passwordChangedAt: "",
            gender: ""
        },
        messageContent: "",
        type: "",
        isRecall: false,
        _id: "",
        createdAt: "",
        updatedAt: ""
    },
    isLoading: false
};

export const PostMessageSlice = createSlice({
    name: "postMessage",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(PostMessageChat.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(PostMessageChat.fulfilled, (state, action) => {
                const { data = initialState.data, message = "" } =
                    action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(PostMessageChat.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default PostMessageSlice.reducer;
export const getPostMessageByUser = (state: RootState) =>
    state.postMessage.data.postedByUser;
