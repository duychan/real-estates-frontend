import { IUploadEstate } from "../UploadSlice/UploadSliceType";

export interface ISearchHomePage {
    address: string;
    type: { key: string; value: string };
    price: number;
}

export interface ISearchHomeState {
    message: string;
    data: {
        records: IUploadEstate[];
        total: number;
    };
    isLoading: boolean;
    searchHomePageText: ISearchHomePage;
}
