import { ISearchHomePage } from "../../../../components/homePage/Search/SearchType";
import { IUploadEstate } from "../UploadSlice/UploadSliceType";

export interface IEstate {
    _id: string;
    owner: string;
    name: string;
    address: string;
    area: string;
    price: string;
    currentStatus: { _id: string; name: string };
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
    section: string;
    type: { _id: string; name: string };
    priceMin: number | null;
    priceMax: number | null;
    bathRoom: number | null;
    bedRoom: number | null;
    areaMin: number | null;
    areaMax: number | null;
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
