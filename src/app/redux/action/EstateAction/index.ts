import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEstateApi } from "../../../api/EstateApi";

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
