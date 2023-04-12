import { ICoordinates } from "../../../../components/UploadPage/MapNavigator/MapNavigateType";
import { ISearchHomePage } from "../../../../components/homePage/Search/SearchType";
import { IUserInformation } from "../AuthSlice/AuthSliceType";

export interface IEstate {
    _id: string;
    owner: IUserInformation;
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
    updatedAt: string;
    createdAt: string;
    location: {
        coordinates: [number, number]; //[lng,lat]
    };
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
    sort: string;
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
