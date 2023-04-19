import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "../../../api/ChatContactApi";
import { IPostMessage } from "../../../api/ChatContactApi/ChatContactType";

export const CreateNewContact = createAsyncThunk(
    "chat/newContact",
    async (idEstate: string) => {
        try {
            const response = await chatApi.createNewContact(idEstate);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetMyConversation = createAsyncThunk(
    "chat/myContact",
    async () => {
        try {
            const response = await chatApi.getMyConversation();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const PostMessageChat = createAsyncThunk(
    "chat/postMessageChat",
    async (messageContent: IPostMessage) => {
        try {
            const response = await chatApi.postMessageApi(messageContent);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetAllChatSingle = createAsyncThunk(
    "chat/getAllChatSingle",
    async (conversationId: string) => {
        try {
            const response = await chatApi.getAllChatSingleApi(conversationId);
            return response;
        } catch (error) {
            return error;
        }
    }
);
