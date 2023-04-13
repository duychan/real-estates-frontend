import BaseApi from "../../BaseAPI";

export const getEstateById = async (idEstate: string) => {
    return await BaseApi.get(`/estates/${idEstate}`).then(res => res.data);
};

export const getEstateStatus = async () => {
    return await BaseApi.get(`/estate-status`).then(res => res.data);
};

export const EstateApi = { getEstateById, getEstateStatus };
