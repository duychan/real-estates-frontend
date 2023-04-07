import { UploadFile } from "antd/es/upload/interface";
import { IUserInformation } from "../AuthSlice/AuthSliceType";

export interface IUpdateUserInformationState {
    message: string;
    data: {
        user: IUserInformation;
    };
    isLoading: boolean;
    formData: FormData;
}

export interface IUserInformationAction {
    firstName: string;
    lastName: string;
    profileImage: File | undefined;
    address: string;
    phoneNumber: string;
    gender: string;
}

export interface IUserInformationShow {
    firstName: string;
    lastName: string;
    profileImage: string;
    address: string;
    phoneNumber: string;
    gender: string;
}
