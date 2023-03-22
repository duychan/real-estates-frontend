import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { middleware } from "yargs";
import authReducer from "./reducer/AuthSlice";
import uploadEstateReducer from "./reducer/UploadSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        uploadEstate: uploadEstateReducer
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
