import BaseApi from "../../BaseAPI";

export const searchHomePage = async (
    section: string,
    type: { _id: string; name: string },
    priceMin: number
) => {
    try {
        const { data } = await BaseApi.get("/estates?limit=1000", {
            params: {
                section,
                type: type?._id,
                priceMin
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const searchHomePageApi = { searchHomePage };
