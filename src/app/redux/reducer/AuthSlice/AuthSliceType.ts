export interface IUserInformation {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    imgUser: string;
    nationalId: string;
    updatedAt: string;
}

export interface IAuthState {
    messageResponse: string;
    data: {
        user: IUserInformation;
        token: string | null;
    };
    isLoading: boolean;
}
