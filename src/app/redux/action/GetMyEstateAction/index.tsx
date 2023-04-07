import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyEstateApi } from "../../../api/GetMyEstate";

export const GetMyEstate = createAsyncThunk("estates/getMyEstate", async () => {
    try {
        const response = await getMyEstateApi.getMyEstate();
        return response;
    } catch (error) {
        return error;
    }
});

export const DeleteMyEstate = createAsyncThunk(
    "estates/deleteMyEstate",
    async (idEstate: string) => {
        try {
            const response = await getMyEstateApi.deleteMyEstate(idEstate);
            return response;
        } catch (error) {
            return error;
        }
    }
);
