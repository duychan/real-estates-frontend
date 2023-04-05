import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetAllWishesListEstateState } from "./getAllWishEstateType";
import { GetAllWishListEstate } from "../../action/WishesListAction";

const initialState: IGetAllWishesListEstateState = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false
};
export const GetAllWishesListEstateSlice = createSlice({
    name: "getAllWishesList",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(GetAllWishListEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetAllWishListEstate.fulfilled, (state, action) => {
                const {
                    data = {
                        records: [],
                        total: 0
                    },
                    message = ""
                } = action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(GetAllWishListEstate.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default GetAllWishesListEstateSlice.reducer;
export const getAllWishesEstate = (state: RootState) =>
    state.getAllWishesList.data;
export const getAllWishesEstateData = (state: RootState) =>
    state.getAllWishesList.data.records;
