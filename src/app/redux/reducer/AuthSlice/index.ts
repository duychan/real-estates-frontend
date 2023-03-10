import { createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserProfile } from "../../action/AuthAction";
import { IAuthState } from "./AuthSliceType";

const initialState: IAuthState = {
    isLoading: false,
    message: "",
    user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        createAt: "",
        imgUser: ""
    }
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state: IAuthState) => {
            state.message = "";
            state.isLoading = false;
            state.user = initialState.user;
            localStorage.removeItem("loginToken");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(UserLogin.pending, state => {
                state.isLoading = true;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.isLoading = false;
                state.user = action.payload.data.user;
                state.user.imgUser = "";
            });

        builder.addCase(UserProfile.fulfilled, (state, action) => {
            state.message = action.payload.message;
            state.user = action.payload.data.record;
            state.user.imgUser = "";
        });
    }
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
