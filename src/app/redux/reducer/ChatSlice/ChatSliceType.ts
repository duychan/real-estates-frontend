import { IUserInformation } from "../AuthSlice/AuthSliceType";
import { IEstate } from "../SearchPageSlice/SearchPageType";

export interface IChatInformation {
    seller: IUserInformation;
    buyer: IUserInformation;
    estate: IEstate;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPostChat {
    isNew: boolean;
    message: string;
    conversation: {
        seller: IUserInformation;
        buyer: string;
        estate: string;
        _id: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IPostMessage {
    message: string;
    data: {
        conversation: string;
        postedByUser: IUserInformation;
        messageContent: string;
        type: string;
        isRecall: boolean;
        _id: string;
        createdAt: string;
        updatedAt: string;
    };
    isLoading: boolean;
}

export interface IGetAllChatRecord {
    _id: string;
    conversation: string;
    postedByUser: IUserInformation;
    messageContent: string;
    type: string;
    isRecall: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IMessageResponse {
    message: {
        _id: string;
        conversation: string;
        postedByUser: IUserInformation;
        messageContent: string;
        type: string;
        isRecall: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IGetAllChatSingle {
    message: string;
    data: {
        records: IGetAllChatRecord[];
        total: number;
    };
    isLoading: boolean;
    _idConversation: string;
    chatUserInfo: {
        profileImage: string;
        firstName: string;
        lastName: string;
        idUser: string;
    };
}

export interface IPostChatState {
    message: string;
    data: {
        record: IPostChat;
    };
    isLoading: boolean;
}
export interface IGetAllChatState {
    message: string;
    data: {
        records: IChatInformation[];
    };
    isLoading: boolean;
}
