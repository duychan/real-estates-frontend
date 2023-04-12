import { IEstate } from "../SearchPageSlice/SearchPageType";

export interface IEstateState {
    message: string;
    data: {
        records: IEstate;
    };
    isLoading: boolean;
    nearestEstate: {
        messageNearestEstate: string;
        data: {
            records: IEstate[];
        };
    };
}
