import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePassword } from "../../../api/ChangePasswordApi";
import { IChangePassword } from "../../../../components/UserProfile/ChangePassword/ChangePasswordType";

export const ChangePasswordAction = createAsyncThunk(
    "users/changePassword",
    async (changePassWordInPut: IChangePassword) => {
        try {
            const response = await changePassword(changePassWordInPut);
            return response;
        } catch (error) {
            return error;
        }
    }
);
