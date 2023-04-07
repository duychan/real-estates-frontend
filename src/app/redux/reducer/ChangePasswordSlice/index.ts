import { message } from "antd";
import { createSlice } from "@reduxjs/toolkit";
import { IChangeState } from "./ChangePasswordType";
import { ChangePasswordAction } from "../../action/ChangePasswordAction";

const userToken = localStorage.getItem("loginToken") ?? null;
const initialState: IChangeState = {
    message: "",
    isLoading: false,
    data: {
        user: {
            _id: "",
            firstName: "",
            lastName: "",
            nationalId: "",
            email: "",
            createdAt: "",
            updatedAt: "",
            profileImage: "",
            address: "",
            phoneNumber: "",
            passwordChangedAt: "",
            gender: ""
        },
        token: userToken
    }
};

export const ChangePasswordSlice = createSlice({
    name: "changePassword",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(ChangePasswordAction.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(ChangePasswordAction.fulfilled, (state, action) => {
                const { data = { user: {}, token: null }, message = "" } =
                    action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(ChangePasswordAction.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
