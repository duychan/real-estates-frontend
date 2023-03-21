import BaseApi from "../../BaseAPI";

type SearchHomePageParams = {
    address: string;
    type: { key: string; value: string };
    price: number;
};
export const searchHomePage = async (
    address: string,
    type: { key: string; value: string },
    price: number
) => {
    try {
        const { data } = await BaseApi.get("/estates", {
            params: {
                address,
                type: type?.key,
                price
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const searchHomePageApi = { searchHomePage };
