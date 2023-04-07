import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUpdateUserInformationState } from "./UpdateUserInforType";
import { UpdateUserInformationAction } from "../../action/UpdateUserInforAction";
const initialState: IUpdateUserInformationState = {
    isLoading: false,
    message: "",
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
        }
    },
    formData: new FormData()
};

export const UpdateUserInforSlice = createSlice({
    name: "updateUserInfor",
    initialState,
    reducers: {
        setUpdateFormData: (state, action) => {
            state.formData.append("profileImage", action.payload.profileImage);
            state.formData.append("firstName", action.payload.firstName);
            state.formData.append("lastName", action.payload.lastName);
            state.formData.append("gender", action.payload.gender);
            state.formData.append("address", action.payload.address);
            state.formData.append("phoneNumber", action.payload.phoneNumber);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(UpdateUserInformationAction.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(UpdateUserInformationAction.fulfilled, (state, action) => {
                const {
                    data = { user: initialState.data.user },
                    message = ""
                } = action.payload;
                state.formData = initialState.formData;

                return { ...state, message: message, data, isLoading: false };
            })
            .addCase(UpdateUserInformationAction.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default UpdateUserInforSlice.reducer;
export const { setUpdateFormData } = UpdateUserInforSlice.actions;
export const getFormDataUpdate = (state: RootState) =>
    state.updateUserInfor.formData;
