import BaseApi from "../../BaseAPI";
import { IUserRegisterInput } from "./AuthType";

export const getRegisterAPI = async (userRegister: IUserRegisterInput) => {
    return await BaseApi.post("/users/signup", userRegister)
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

export const RegisterAPI = { getRegisterAPI };
