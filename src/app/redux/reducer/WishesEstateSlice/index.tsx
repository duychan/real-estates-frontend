import { createSlice } from "@reduxjs/toolkit";
import { PostWishesEstate } from "../../action/WishesListAction";
import { RootState } from "../../store";
import { IWishesEstateState } from "./WishesEstateType";

const initialState: IWishesEstateState = {
    message: "",
    data: {
        record: {
            user: "",
            estate: "",
            _id: "",
            createdAt: "",
            updatedAt: ""
        }
    },
    isLoading: false
};

export const PostWishesEstateSlice = createSlice({
    name: "postWishes",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(PostWishesEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(PostWishesEstate.fulfilled, (state, action) => {
                const {
                    data = { record: initialState.data.record },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false
                };
            })
            .addCase(PostWishesEstate.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default PostWishesEstateSlice.reducer;
export const getWishesEstate = (state: RootState) =>
    state.postWishes.data.record;
