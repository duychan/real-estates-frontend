import BaseApi from "../../BaseAPI";

export const getAllEstate = async () => {
    return await BaseApi.get(`/estates?limit=1000`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};

export const getAllEstateApi = { getAllEstate };
