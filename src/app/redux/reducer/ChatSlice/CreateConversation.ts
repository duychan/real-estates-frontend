import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IPostChatState } from "./ChatSliceType";
import { CreateNewContact } from "../../action/ChatContactAction";
import { EmptyEstate } from "../../../../common/constants";

const initialState: IPostChatState = {
    message: "",
    data: {
        record: {
            isNew: false,
            message: "",
            conversation: {
                seller: {
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
                _id: "",
                buyer: "",
                estate: "",
                createdAt: "",
                updatedAt: ""
            }
        }
    },
    isLoading: false
};

export const CreateConversationSlice = createSlice({
    name: "createConversation",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(CreateNewContact.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(CreateNewContact.fulfilled, (state, action) => {
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
            .addCase(CreateNewContact.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default CreateConversationSlice.reducer;
