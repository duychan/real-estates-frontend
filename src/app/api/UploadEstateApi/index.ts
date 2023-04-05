import BaseApi from "../../BaseAPI";

export const uploadEstate = async (formData: FormData) => {
    return await BaseApi.post("/estates/", formData)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};

export const getAllEstateStatus = async () => {
    return await BaseApi.get("/estates/")
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};
