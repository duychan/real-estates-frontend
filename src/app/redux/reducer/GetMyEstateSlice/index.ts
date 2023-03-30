import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetMyEstateState } from "./GetMyEstateType";
import { GetMyEstate } from "../../action/GetMyEstateAction";

const initialState: IGetMyEstateState = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false
};
export const GetMyEstateSlice = createSlice({
    name: "getMyEstate",
    initialState,
    reducers: {
        setMyEstate: (state, action) => {
            return {
                ...state,
                message: action.payload.message,
                data: {
                    records: action.payload?.data?.records,
                    total: action.payload?.data?.total
                }
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(GetMyEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetMyEstate.fulfilled, (state, action) => {
                const { data = { records: [], total: 0 }, message = "" } =
                    action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetMyEstate.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default GetMyEstateSlice.reducer;
export const { setMyEstate } = GetMyEstateSlice.actions;
export const getMyEstateData = (state: RootState) => state.getMyEstate.data;
