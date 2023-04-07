export interface IUserInformation {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    nationalId: string;
    updatedAt: string;
    gender: string;
    address: string;
    phoneNumber: string;
    profileImage: string;
    passwordChangedAt: string;
}

export interface IAuthState {
    messageResponse: string;
    data: {
        user: IUserInformation;
        token: string | null;
    };
    isLoading: boolean;
}
