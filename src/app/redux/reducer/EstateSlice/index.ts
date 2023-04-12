import { createSlice } from "@reduxjs/toolkit";
import {
    GetEstateById,
    GetListOfNearestEstate
} from "../../action/EstateAction";
import { RootState } from "../../store";
import { IEstateState } from "./EstateSliceType";
import { EmptyEstate } from "../../../../common/constants";

const initialState: IEstateState = {
    message: "",
    data: {
        records: EmptyEstate
    },
    isLoading: false,
    nearestEstate: {
        messageNearestEstate: "",
        data: {
            records: []
        }
    }
};

export const GetEstateSlice = createSlice({
    name: "getEstate",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(GetEstateById.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetEstateById.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.data.records },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetEstateById.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
        builder
            .addCase(GetListOfNearestEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetListOfNearestEstate.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.nearestEstate.data.records },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    nearestEstate: {
                        messageNearestEstate: message,
                        data
                    }
                };
            })
            .addCase(GetListOfNearestEstate.rejected, state => {
                return {
                    ...state,
                    isLoading: false,
                    nearestEstate: {
                        messageNearestEstate: "CANNOT CONNECT SERVER!",
                        data: { records: [] }
                    }
                };
            });
    }
});
export default GetEstateSlice.reducer;
export const getEstateById = (state: RootState) => state.getEstate.data.records;
export const ListOfNearestEstate = (state: RootState) =>
    state.getEstate.nearestEstate.data.records;
