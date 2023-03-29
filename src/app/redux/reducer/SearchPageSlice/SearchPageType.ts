import { ISearchHomePage } from "../../../../components/homePage/Search/SearchType";
import { IUploadEstate } from "../UploadSlice/UploadSliceType";

export interface IEstate {
    _id: string;
    owner: string;
    name: string;
    address: string;
    area: string;
    price: string;
    currentStatus: string;
    type: { _id: string; name: string };
    coverImg: string;
    thumbnail: string[];
    bedRoom: number;
    bathRoom: number;
    description: string;
    updateAt: string;
    createAt: string;
}

export interface ISearchPage {
    address: string;
    type: { _id: string; name: string };
    minPrice: number;
    maxPrice: number;
    bathRoom: number;
    bedRoom: number;
}

export interface ISearchPageState {
    message: string;
    data: {
        records: IEstate[];
        total: number;
    };
    isLoading: boolean;
    searchPageText: ISearchPage;
    searchHomePageText: ISearchHomePage;
}
