import BaseApi from "../../BaseAPI";

export const getProvinces = async () => {
    return await BaseApi.get("/maps/provinces")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getDistricts = async (provinceCode: string) => {
    return await BaseApi.get(`/maps/districts?provinceCode=${provinceCode}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getWards = async (districtCode: string) => {
    return await BaseApi.get(`/maps/wards?districtCode=${districtCode}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getCoordinatesByAddress = async (address: string) => {
    return await BaseApi.get(`/maps/corrdinates/${address}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const MapAPI = {
    getProvinces,
    getDistricts,
    getWards,
    getCoordinatesByAddress
};
