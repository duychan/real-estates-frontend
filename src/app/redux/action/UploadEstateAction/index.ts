import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadEstate } from "../../../api/UploadEstateApi";

export const UploadNewEstate = createAsyncThunk(
    "estate/upload",
    async (formData: FormData) => {
        try {
            const response = await uploadEstate(formData);
            return response;
        } catch (error) {
            return error;
        }
    }
);
