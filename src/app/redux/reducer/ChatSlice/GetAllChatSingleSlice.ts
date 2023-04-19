import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IGetAllChatRecord, IGetAllChatSingle } from "./ChatSliceType";
import { GetAllChatSingle } from "../../action/ChatContactAction";

const initialState: IGetAllChatSingle = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false,
    _idConversation: "",
    chatUserInfo: {
        profileImage: "",
        firstName: "",
        lastName: "",
        idUser: ""
    }
};

export const GetAllMessageSlice = createSlice({
    name: "getAllMessage",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.data.records.push(action.payload);
        },
        handleIdConversationClicked: (state, action) => {
            return {
                ...state,
                _idConversation: action.payload
            };
        },
        handleChatUserInfoOfConversationClicked: (state, action) => {
            const {
                chatUserInfo = {
                    profileImage: "",
                    firstName: "",
                    lastName: "",
                    idUser: ""
                }
            } = action.payload;
            return {
                ...state,
                chatUserInfo
            };
        },
        addNewContact: (state, action: PayloadAction<IGetAllChatRecord>) => {
            state.data.records?.unshift(action.payload);
            state.data.total += 1;
        },
        deleteCurrentUserChat: state => {
            return {
                ...state,
                _idConversation: "",
                chatUserInfo: initialState.chatUserInfo
            };
        }
    },

    extraReducers: builder => {
        builder
            .addCase(GetAllChatSingle.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetAllChatSingle.fulfilled, (state, action) => {
                const {
                    data: dataAllMessage = {
                        records: initialState.data.records,
                        total: 0
                    },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data: {
                        records: (
                            dataAllMessage.records as IGetAllChatRecord[]
                        )?.reverse(),
                        total: dataAllMessage.total
                    },
                    isLoading: false
                };
            })
            .addCase(GetAllChatSingle.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default GetAllMessageSlice.reducer;
export const {
    addMessage,
    handleIdConversationClicked,
    handleChatUserInfoOfConversationClicked,
    addNewContact,
    deleteCurrentUserChat
} = GetAllMessageSlice.actions;
export const getAllMessage = (state: RootState) => state.getAllMessage.data;
export const getIdConversation = (state: RootState) =>
    state.getAllMessage._idConversation;
export const getSellerInfo = (state: RootState) =>
    state.getAllMessage.chatUserInfo;
