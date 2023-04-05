import BaseApi from "../../BaseAPI";
import { IUserLoginInput } from "./AuthType";

export const getLoginApi = async (userLogin: IUserLoginInput) => {
    return await BaseApi.post("/users/login", userLogin)
        .then(response => {
            if (response.data.message === "success") {
                localStorage.setItem("loginToken", response.data?.data?.token);
                BaseApi.interceptors.request.use(config => {
                    config.headers.Authorization = `Bearer ${response.data?.data?.token}`;
                    return config;
                });
            }
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getUserProfile = async () => {
    return await BaseApi.get("users/profile")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const LoginApi = { getLoginApi, getUserProfile };
