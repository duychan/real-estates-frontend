import { IChangePassword } from "../../../components/UserProfile/ChangePassword/ChangePasswordType";
import BaseApi from "../../BaseAPI";
import { IUserLoginInput, IUserRegisterInput } from "./AuthType";

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

export const changePassword = async (changePassWordInput: IChangePassword) => {
    return await BaseApi.patch(
        "/users/updateMyPassword",
        changePassWordInput
    ).then(response => {
        if (response.data.message === "success") {
            localStorage.setItem("loginToken", response.data?.data?.token);
            authToken = response.data?.data?.token ?? "";
        }
        return response.data;
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

export const AuthenticateApi = {
    getLoginApi,
    getUserProfile,
    getRegisterAPI,
    changePassword
};
