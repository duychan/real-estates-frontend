import BaseApi from "../../BaseAPI";

export const getEstateById = async (idEstate: string) => {
    return await BaseApi.get(`/estates/${idEstate}`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};

export const getEstateApi = { getEstateById };
