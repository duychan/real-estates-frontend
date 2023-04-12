import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEstateApi } from "../../../api/EstateApi";
import { INearestEstateInput } from "../../../api/MapApi/MapType";
import { MapAPI } from "../../../api/MapApi";

export const GetEstateById = createAsyncThunk(
    "estates/getById",
    async (idEstate: string) => {
        try {
            const response = await getEstateApi.getEstateById(idEstate);
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
