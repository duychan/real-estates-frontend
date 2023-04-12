import { ICoordinates } from "../../../components/UploadPage/MapNavigator/MapNavigateType";
import BaseApi from "../../BaseAPI";
import { INearestEstateInput } from "./MapType";

export const getProvinces = async () => {
    return await BaseApi.get("/maps/provinces").then(response => response.data);
};

export const getDistricts = async (provinceCode: string) => {
    return await BaseApi.get(
        `/maps/districts?provinceCode=${provinceCode}`
    ).then(response => response.data);
};

export const getWards = async (districtCode: string) => {
    return await BaseApi.get(`/maps/wards?districtCode=${districtCode}`).then(
        response => response.data
    );
};

export const getCoordinatesByAddress = async (address: string) => {
    return await BaseApi.get(`/maps/coordinates?address=${address}`).then(
        response => response.data
    );
};

export const getAddressByCoordinates = async ({ lat, lng }: ICoordinates) => {
    return await BaseApi.get(`/maps/location/?lat=${lat}&lng=${lng}`).then(
        response => {
            return response.data;
        }
    );
};
export const getListOfNearestEstate = async (
    estateInput: INearestEstateInput
) => {
    return await BaseApi.post("/estates/nearestEstate", estateInput).then(
        response => response.data
    );
};

export const MapAPI = {
    getProvinces,
    getDistricts,
    getWards,
    getCoordinatesByAddress,
    getListOfNearestEstate,
    getAddressByCoordinates
};
