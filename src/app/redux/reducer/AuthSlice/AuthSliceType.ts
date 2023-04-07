export interface IUserInformation {
    _id: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    address: string;
    phoneNumber: string;
    passwordChangedAt: string;
    gender: string;
}

export interface IAuthState {
    messageResponse: string;
    data: {
        user: IUserInformation;
        token: string | null;
    };
    isLoading: boolean;
}
