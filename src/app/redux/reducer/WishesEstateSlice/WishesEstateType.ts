export interface IWishEstate {
    user: string;
    estate: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IWishesEstateState {
    message: string;
    data: {
        record: IWishEstate;
    };
    isLoading: boolean;
}
