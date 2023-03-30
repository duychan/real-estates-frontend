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
