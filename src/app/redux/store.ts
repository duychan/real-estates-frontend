import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { middleware } from "yargs";
import authReducer from "./reducer/AuthSlice";
import uploadEstateReducer from "./reducer/UploadSlice";
import notificationReducer from "./reducer/NotificationSlice";
import searchPageReducer from "./reducer/SearchPageSlice";
import getEstateReducer from "./reducer/EstateSlice";
import userReducer from "./reducer/UserSlice";
import getMyEstateReducer from "./reducer/GetMyEstateSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        uploadEstate: uploadEstateReducer,
        notification: notificationReducer,
        searchPage: searchPageReducer,
        getEstate: getEstateReducer,
        user: userReducer,
        getMyEstate: getMyEstateReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
