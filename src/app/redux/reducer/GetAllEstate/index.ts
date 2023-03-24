import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllEstate } from "../../action/GetAllEstateAction";
import { IGetAllEstate } from "./GetAllEstateType";

const initialState: IGetAllEstate = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false
};
export const GetAllEstateSlice = createSlice({
    name: "getAllEstate",
    initialState,
    reducers: {
        setAllEstate: (state, action) => {
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
            .addCase(GetAllEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetAllEstate.fulfilled, (state, action) => {
                const { data = { records: [], total: 0 }, message = "" } =
                    action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetAllEstate.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default GetAllEstateSlice.reducer;
export const { setAllEstate } = GetAllEstateSlice.actions;
export const getEstate = (state: RootState) => state.getAllEstate.data;
