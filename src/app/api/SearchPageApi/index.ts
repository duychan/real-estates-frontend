import BaseApi from "../../BaseAPI";
import { ISearchPage } from "../../redux/reducer/SearchPageSlice/SearchPageType";
export const searchPage = async ({
    address,
    type,
    minPrice,
    maxPrice,
    bathRoom,
    bedRoom
}: ISearchPage) => {
    try {
        const { data } = await BaseApi.get("/estates", {
            params: {
                address,
                type: type?._id,
                minPrice,
                maxPrice,
                bathRoom,
                bedRoom
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const searchPageApi = { searchPage };
