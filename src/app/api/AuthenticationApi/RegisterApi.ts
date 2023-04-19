import BaseApi from "../../BaseAPI";
import { IUserRegisterInput } from "./AuthType";

let authToken = "";
const userToken = localStorage.getItem("loginToken");

export const getRegisterAPI = async (userRegister: IUserRegisterInput) => {
    return await BaseApi.post("/users/signup", userRegister)
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

BaseApi.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${
        authToken !== "" ? authToken : userToken
    }`;
    return config;
});

export const RegisterAPI = { getRegisterAPI };
