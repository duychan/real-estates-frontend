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
export const deleteMyEstate = async (idMyEstate: string) => {
    return await BaseApi.delete(`estates/${idMyEstate}`).then(res => res.data);
};

export const getMyEstateApi = { getMyEstate, deleteMyEstate };
