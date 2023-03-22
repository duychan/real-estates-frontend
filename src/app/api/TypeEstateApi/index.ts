import BaseApi from "../../BaseAPI";

export const getListType = async () => {
    return await BaseApi.get("/estate-types/")
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};
