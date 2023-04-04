import BaseApi from "../../BaseAPI";
import { ISearchPage } from "../../redux/reducer/SearchPageSlice/SearchPageType";
export const searchPage = async ({
    section,
    type,
    priceMin,
    priceMax,
    bathRoom,
    bedRoom,
    areaMin,
    areaMax,
    sort
}: ISearchPage) => {
    try {
        const { data } = await BaseApi.get("/estates?limit=1000", {
            params: {
                section,
                type: type?._id,
                priceMin,
                priceMax,
                bathRoom,
                bedRoom,
                areaMin,
                areaMax,
                sort
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const searchPageApi = { searchPage };
