import BaseApi from "../../BaseAPI";

export const getMyEstate = async () => {
    return await BaseApi.get(`/users/me/estates?limit=1000`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};

export const getMyEstateApi = { getMyEstate };
