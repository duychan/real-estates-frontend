import BaseApi from "../../BaseAPI";
import { IUserLoginInput } from "./AuthType";

let authToken = "";
const userToken = localStorage.getItem("loginToken");

export const getLoginApi = async (userLogin: IUserLoginInput) => {
    return await BaseApi.post("/users/login", userLogin)
        .then(response => {
            if (response.data.message === "success") {
                localStorage.setItem("loginToken", response.data?.data?.token);
                authToken = response.data?.data?.token ?? "";
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

BaseApi.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${
        authToken !== "" ? authToken : userToken
    }`;
    return config;
});

export const LoginApi = { getLoginApi, getUserProfile };
