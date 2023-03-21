import { searchHomePage } from "./../../../api/SearchHomePageApi/index";
import { ISearchHomeState } from "./SearchHomePageType";
import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchHomePage } from "./SearchHomePageType";
import { SearchHomePage } from "../../action/SearchResultAction";
const initialState: ISearchHomeState = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false,
    searchHomePageText: {
        address: "",
        type: { key: "", value: "" },
        price: 0
    }
};
export const SearchHomePageSlice = createSlice({
    name: "searchHomePage",
    initialState,
    reducers: {
        setSearchHomePage: (
            state,
            action: PayloadAction<{
                address: string;
                type: string;
                price: number;
            }>
        ) => {
            return {
                ...state,
                searchHomePageText: {
                    address: action.payload.address || "",
                    type: { key: action.payload.type || "", value: "" },
                    price: action.payload.price
                }
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SearchHomePage.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(SearchHomePage.fulfilled, (state, action) => {
                const {
                    data = { records: [], total: 0 },
                    message = "",
                    query = { address: "", type: "", price: 0 }
                } = action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false,
                    searchHomePageText: {
                        address: query.address,
                        type: query.type,
                        price: query.price
                    }
                };
            })
            .addCase(SearchHomePage.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
    }
});
export default SearchHomePageSlice.reducer;
export const { setSearchHomePage } = SearchHomePageSlice.actions;
