import { createAsyncThunk } from "@reduxjs/toolkit";
import { INearestEstateInput } from "../../../api/MapApi/MapType";
import { MapAPI } from "../../../api/MapApi";
import { EstateApi } from "../../../api/EstateApi";

export const GetEstateById = createAsyncThunk(
    "estates/getById",
    async (idEstate: string) => {
        try {
            const response = await EstateApi.getEstateById(idEstate);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const GetEstateStatus = createAsyncThunk(
    "estates/getStatus",
    async () => {
        try {
            const response = await EstateApi.getEstateStatus();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const GetListOfNearestEstate = createAsyncThunk(
    "estate/nearestEstate",
    async (estateInput: INearestEstateInput) => {
        try {
            const response = await MapAPI.getListOfNearestEstate(estateInput);
            return response;
        } catch (error) {
            return error;
        }
    }
);
