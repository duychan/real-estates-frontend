import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserInfor } from "../../../api/UpdateProfileApi";

export const UpdateUserInformationAction = createAsyncThunk(
    "users/update",
    async (formData: FormData) => {
        try {
            const response = await updateUserInfor(formData);
            return response;
        } catch (error) {
            return error;
        }
    }
);
