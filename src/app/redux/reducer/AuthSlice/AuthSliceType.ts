export interface IUserInformation {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createAt: string;
    imgUser: string;
}

export interface IAuthState {
    isLoading: boolean;
    message: string;
    user: IUserInformation;
}
