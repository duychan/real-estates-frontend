import { createSlice } from "@reduxjs/toolkit";
import { GetUserById } from "../../action/AuthAction";
import { RootState } from "../../store";
import { IUserState } from "./UserSliceType";

const initialState: IUserState = {
    isLoading: false,
    messageResponse: "",
    data: {
        record: {
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
        }
    }
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetUserById.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetUserById.fulfilled, (state, action) => {
                const {
                    data = { record: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    messageResponse: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetUserById.rejected, state => {
                return {
                    ...state,
                    messageResponse: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});

export default UserSlice.reducer;
export const getUserById = (state: RootState) => state.user.data.record;
export const getMessage = (state: RootState) => state.user.messageResponse;
