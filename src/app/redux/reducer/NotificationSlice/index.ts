import { createSlice } from "@reduxjs/toolkit";
import { INotification } from "./NotificationType";

const initialState: INotification = {
    successMessage: "",
    errorMessage: "",
    warnMessage: ""
};

export const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setSuccessNotification: (state, action) => {
            return { ...state, successMessage: action.payload };
        },
        setErrorNotification: (state, action) => {
            return { ...state, errorMessage: action.payload };
        },
        setWarnNotification: (state, action) => {
            return { ...state, warnMessage: action.payload };
        },
        removeSuccessNotification: state => {
            return { ...state, successMessage: "" };
        },
        removeErrorNotification: state => {
            return { ...state, errorMessage: "" };
        },
        removeWarnNotification: state => {
            return { ...state, warnMessage: "" };
        }
    },
    extraReducers: builder => {}
});
export default NotificationSlice.reducer;
export const {
    setSuccessNotification,
    setErrorNotification,
    setWarnNotification,
    removeWarnNotification,
    removeSuccessNotification,
    removeErrorNotification
} = NotificationSlice.actions;
