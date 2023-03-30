import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserLoginInput } from "../../../api/AuthenticationApi/AuthType";
import { LoginApi } from "../../../api/AuthenticationApi/LoginApi";
import { IUserRegisterInput } from "../../../api/AuthenticationApi/AuthType";
import { RegisterAPI } from "../../../api/AuthenticationApi/RegisterApi";
import { getUserById } from "../../../api/AuthenticationApi/UserApi";

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
export const SignupUser = createAsyncThunk(
    "users/signup",
    async (userData: IUserRegisterInput) => {
        try {
            const response = await RegisterAPI.getRegisterAPI(userData);
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
