import { IEstate } from "../SearchPageSlice/SearchPageType";

export interface IWishesEstate {
    user: string;
    estate: IEstate;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IGetAllWishesListEstateState {
    message: string;
    data: {
        records: IWishesEstate[];
        total: number;
    };
    isLoading: boolean;
}
