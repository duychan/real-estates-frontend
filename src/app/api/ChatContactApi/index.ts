import BaseApi from "../../BaseAPI";
import { IPostMessage } from "./ChatContactType";

export const postMessageApi = async ({
    conversationId,
    messageInput
}: IPostMessage) => {
    return await BaseApi.post(
        `conversations/${conversationId}/messages`,
        messageInput
    ).then(res => res.data);
};

export const getAllChatSingleApi = async (conversationId: string) => {
    return await BaseApi.get(`conversations/${conversationId}/messages`).then(
        res => res.data
    );
};
export const createNewContact = async (idEstate: string) => {
    return await BaseApi.post(`estates/${idEstate}/conversations`).then(
        res => res.data
    );
};

export const getMyConversation = async () => {
    return await BaseApi.get(`users/me/conversations`).then(res => res.data);
};

export const chatApi = {
    getAllChatSingleApi,
    postMessageApi,
    createNewContact,
    getMyConversation
};
