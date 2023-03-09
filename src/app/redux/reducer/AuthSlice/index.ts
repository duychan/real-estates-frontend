import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserProfile } from "../../action/AuthAction";
import { IAuthState } from "./AuthSliceType";
import { SignupUser } from "../../action/AuthAction";

const userToken = localStorage.getItem("userToken") ?? "";
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
            createAt: "",
            updateAt: "",
            imgUser: ""
        },
        token: userToken
    }
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: IAuthState) => {
            state.messageResponse = "";
            state.isLoading = false;
            state.data.user = initialState.data.user;
            localStorage.removeItem("loginToken");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(UserLogin.pending, state => {
                state.isLoading = true;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.messageResponse = action.payload.message;
                state.isLoading = false;
                state.data.user = action.payload.data.user;
                state.data.user.imgUser = "";
            });

        builder.addCase(UserProfile.fulfilled, (state, action) => {
            state.messageResponse = action.payload.message;
            state.data.user = action.payload.data.record;
            state.data.user.imgUser = "";
        });
        builder.addCase(SignupUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SignupUser.fulfilled, (state, action) => {
            state.messageResponse = action.payload.message;
            state.data = action.payload.data;
            state.isLoading = false;
        });
    }
});
export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
