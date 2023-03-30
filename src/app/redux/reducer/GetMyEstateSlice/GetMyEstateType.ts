import { IEstate } from "../SearchPageSlice/SearchPageType";

export interface IGetMyEstateState {
    message: string;
    data: {
        records: IEstate[];
        total: number;
    };
    isLoading: boolean;
}
