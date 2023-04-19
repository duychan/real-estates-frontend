import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChangePassword } from "../../../../components/UserProfile/ChangePassword/ChangePasswordType";
import { AuthenticateApi } from "../../../api/AuthenticationApi/AuthenticationApi";

export const ChangePasswordAction = createAsyncThunk(
    "users/changePassword",
    async (changePassWordInPut: IChangePassword) => {
        try {
            const response = await AuthenticateApi.changePassword(
                changePassWordInPut
            );
            return response;
        } catch (error) {
            return error;
        }
    }
);
