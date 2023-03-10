import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserLoginInput } from "../../../api/AuthenticationApi/AuthType";
import { LoginApi } from "../../../api/AuthenticationApi/LoginApi";

export const UserLogin = createAsyncThunk(
    "users/login",
    async (userData: IUserLoginInput) => {
        try {
            const response = await LoginApi.getLoginApi(userData);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const UserProfile = createAsyncThunk("users/profile", async () => {
    try {
        const response = await LoginApi.getUserProfile();
        return response;
    } catch (error) {
        return error;
    }
});
