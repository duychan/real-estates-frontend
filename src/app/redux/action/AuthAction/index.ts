import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserLoginInput } from "../../../api/AuthenticationApi/AuthType";
import { IUserRegisterInput } from "../../../api/AuthenticationApi/AuthType";
import { getUserById } from "../../../api/AuthenticationApi/UserApi";
import { AuthenticateApi } from "../../../api/AuthenticationApi/AuthenticationApi";

export const UserLogin = createAsyncThunk(
    "users/login",
    async (userData: IUserLoginInput) => {
        try {
            const response = await AuthenticateApi.getLoginApi(userData);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const SignupUser = createAsyncThunk(
    "users/signup",
    async (userData: IUserRegisterInput) => {
        try {
            const response = await AuthenticateApi.getRegisterAPI(userData);
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const UserProfile = createAsyncThunk("users/profile", async () => {
    try {
        const response = await AuthenticateApi.getUserProfile();
        return response;
    } catch (error) {
        return error;
    }
});

export const GetUserById = createAsyncThunk(
    "users/getById",
    async (idUser: string) => {
        try {
            const response = await getUserById(idUser);
            return response;
        } catch (error) {
            return error;
        }
    }
);
