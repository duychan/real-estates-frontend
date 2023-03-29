import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchPageState } from "./SearchPageType";
import { SearchPage } from "../../action/SearchPageAction";
import { SearchHomePage } from "../../action/SearchResultAction";
import { GetAllEstate } from "../../action/GetAllEstateAction";
const initialState: ISearchPageState = {
    message: "",
    data: {
        records: [],
        total: 0
    },
    isLoading: false,
    searchPageText: {
        address: "",
        type: { _id: "", name: "" },
        minPrice: 0,
        maxPrice: 0,
        bedRoom: 0,
        bathRoom: 0
    },
    searchHomePageText: {
        address: "",
        type: { _id: "", name: "" },
        price: 0
    }
};
export const SearchPageSlice = createSlice({
    name: "searchPage",
    initialState,
    reducers: {
        setSearchPage: (
            state,
            action: PayloadAction<{
                address: string;
                type: string;
                minPrice: number;
                maxPrice: number;
                area: number;
                bathRoom: number;
                bedRoom: number;
            }>
        ) => {
            const { type, ...rest } = action.payload;
            return {
                ...state,
                searchPageText: {
                    type: { _id: type || "", name: "" },
                    ...rest
                }
            };
        },
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
                    type: { _id: action.payload.type || "", name: "" },
                    price: action.payload.price
                }
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SearchPage.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(SearchPage.fulfilled, (state, action) => {
                const {
                    message = "",
                    data = { records: [], total: 0 },
                    query = {
                        address: "",
                        type: "",
                        minPrice: 0,
                        maxPrice: 0,
                        bathRoom: 0,
                        bedRoom: 0,
                        area: 0
                    }
                } = action.payload;
                const { ...rest } = query;
                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false,

                    searchPageText: {
                        ...rest
                    }
                };
            })
            .addCase(SearchPage.rejected, state => {
                return { ...state, message: "CANNOT CONNECT SERVER!" };
            });
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
        builder
            .addCase(GetAllEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(GetAllEstate.fulfilled, (state, action) => {
                const {
                    data = { records: [], total: 0 },
                    message = ""
                } = action.payload;

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
export default SearchPageSlice.reducer;
export const { setSearchPage, setSearchHomePage } = SearchPageSlice.actions;
export const getResultSearchPage = (state: RootState) => state.searchPage.data;
export const getDataSearchPage = (state: RootState) => state.searchPage;
