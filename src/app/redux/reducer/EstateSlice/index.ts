import { createSlice } from "@reduxjs/toolkit";
import { GetEstateById } from "../../action/EstateAction";
import { RootState } from "../../store";
import { IEstateState } from "./EstateSliceType";

const initialState: IEstateState = {
    message: "",
    data: {
        records: {
            _id: "",
            owner: "",
            name: "",
            address: "",
            area: "",
            price: "",
            currentStatus: { _id: "", name: "" },
            type: { _id: "", name: "" },
            coverImg: "",
            thumbnail: [],
            bedRoom: 0,
            bathRoom: 0,
            description: "",
            updateAt: "",
            createAt: ""
        }
    },
    isLoading: false
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
    }
});
export default GetEstateSlice.reducer;
export const getEstateById = (state: RootState) => state.getEstate.data.records;
