import { IUserInformation } from "../AuthSlice/AuthSliceType";

export interface IChangeState {
    message: string;
    data: {
        user: IUserInformation;
        token: string | null;
    };
    isLoading: boolean;
}
