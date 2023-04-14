import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteMyEstate } from "../../action/GetMyEstateAction";
import { IDeleteMyEstateState } from "./DeleteMyEstateType";

const initialState: IDeleteMyEstateState = {
    message: "",
    data: {
        records: false
    },
    isLoading: false
};
export const DeleteMyEstateSlice = createSlice({
    name: "deleteMyEstate",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(DeleteMyEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(DeleteMyEstate.fulfilled, (state, action) => {
                const {
                    data = { records: false },
                    message = ""
                } = action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(DeleteMyEstate.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default DeleteMyEstateSlice.reducer;
