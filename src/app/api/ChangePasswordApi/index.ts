import { IChangePassword } from "../../../components/UserProfile/ChangePassword/ChangePasswordType";
import BaseApi from "../../BaseAPI";

export const changePassword = async (changePassWordInput: IChangePassword) => {
    return await BaseApi.patch(
        "/users/updateMyPassword",
        changePassWordInput
    ).then(response => {
        if (response.data.message === "success") {
            localStorage.setItem("loginToken", response.data?.data?.token);
            BaseApi.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${response.data?.data?.token}`;
                return config;
            });
        }
        return response.data;
    });
};
