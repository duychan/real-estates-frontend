import { IChangePassword } from "../../../components/UserProfile/ChangePassword/ChangePasswordType";
import BaseApi from "../../BaseAPI";

let authToken = "";
const userToken = localStorage.getItem("loginToken");

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

BaseApi.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${
        authToken !== "" ? authToken : userToken
    }`;
    return config;
});
