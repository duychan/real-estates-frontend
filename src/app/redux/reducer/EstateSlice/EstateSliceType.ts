import { IEstate } from "../SearchPageSlice/SearchPageType";
export interface IEstateState {
    message: string;
    data: {
        records: IEstate;
    };
    isLoading: boolean;
    nearestEstate: {
        records: IEstate[];
        total: number;
    };
    allEstateStatus: { _id: string; name: string }[];
}
