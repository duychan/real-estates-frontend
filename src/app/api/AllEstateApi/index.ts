import BaseApi from "../../BaseAPI";

export const getAllEstate = async () => {
    return await BaseApi.get("/estates")
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};

export const getAllEstateApi = { getAllEstate };
