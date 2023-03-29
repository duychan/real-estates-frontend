import BaseApi from "../../BaseAPI";

export const searchHomePage = async (
    address: string,
    type: { _id: string; name: string },
    price: number
) => {
    try {
        const { data } = await BaseApi.get("/estates", {
            params: {
                address,
                type: type?._id,
                price
            }
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const searchHomePageApi = { searchHomePage };
