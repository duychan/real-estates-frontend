import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserProfile } from "../../action/AuthAction";
import { IAuthState } from "./AuthSliceType";
import { SignupUser } from "../../action/AuthAction";
import { RootState } from "../../store";

const userToken = localStorage.getItem("loginToken") ?? null;
const initialState: IAuthState = {
    isLoading: false,
    messageResponse: "",
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

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: IAuthState) => {
            localStorage.removeItem("loginToken");
            return {
                ...state,
                messageResponse: "",
                data: {
                    user: initialState.data.user,
                    token: null
                },
                isLoading: false
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(UserLogin.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                const { data = { user: {}, token: null }, message = "" } =
                    action.payload;

                return {
                    ...state,
                    messageResponse: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(UserLogin.rejected, state => {
                return { ...state, messageResponse: "CANNOT CONNECT SERVER!" };
            });

        builder
            .addCase(UserProfile.fulfilled, (state, action) => {
                const {
                    payload: { message = "" }
                } = action;

                return {
                    ...state,
                    messageResponse: message,
                    data: {
                        ...state.data,
                        user: action.payload.data?.record ?? {}
                    }
                };
            })
            .addCase(UserProfile.rejected, state => {
                return { ...state, messageResponse: "CANNOT CONNECT SERVER!" };
            });
        builder
            .addCase(SignupUser.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                const { data = { user: {}, token: null }, message = "" } =
                    action.payload;

                return {
                    ...state,
                    messageResponse: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(SignupUser.rejected, state => {
                return { ...state, messageResponse: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
export const getUserToken = (state: RootState) => state.auth.data.token;
export const getUser = (state: RootState) => state.auth.data.user;
export const getUserInfo = (state: RootState) => state.auth.data;
export const getMessageResponse = (state: RootState) =>
    state.auth.messageResponse;
