import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IChatInformation, IGetAllChatState } from "./ChatSliceType";
import { GetMyConversation } from "../../action/ChatContactAction";

const initialState: IGetAllChatState = {
    message: "",
    data: {
        records: []
    },
    isLoading: false
};

export const MyConversationSlice = createSlice({
    name: "myConversation",
    initialState,
    reducers: {
        resetListMyConversation: state => {
            return {
                ...state,
                message: "",
                data: { records: initialState.data.records }
            };
        }
    },

    extraReducers: builder => {
        builder
            .addCase(GetMyConversation.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetMyConversation.fulfilled, (state, action) => {
                const {
                    data: dataConversation = {
                        records: initialState.data.records
                    },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data: {
                        records: (dataConversation.records as IChatInformation[])?.reverse()
                    },
                    isLoading: false
                };
            })
            .addCase(GetMyConversation.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default MyConversationSlice.reducer;
export const { resetListMyConversation } = MyConversationSlice.actions;
export const getAllMyConversation = (state: RootState) =>
    state.myConversation.data.records;
