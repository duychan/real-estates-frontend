import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEstateApi } from "../../../api/AllEstateApi";

export const GetAllEstate = createAsyncThunk("estates/get", async () => {
    try {
        const response = await getAllEstateApi.getAllEstate();
        return response;
    } catch (error) {
        return error;
    }
});
