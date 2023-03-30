import { IUserInformation } from "../AuthSlice/AuthSliceType";

export interface IUserState {
    messageResponse: string;
    data: {
        record: IUserInformation;
    };
    isLoading: boolean;
}
