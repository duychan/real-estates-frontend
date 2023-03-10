export interface IUserInformation {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createAt: string;
    imgUser: string;
    nationalId: string;
    updateAt: string;
}

export interface IAuthState {
    messageResponse: string;
    data: {
        user: IUserInformation;
        token: string;
    };
    isLoading: boolean;
}
