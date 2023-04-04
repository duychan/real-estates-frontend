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
        section: "",
        type: { _id: "", name: "" },
        priceMin: 0,
        priceMax: 0,
        bedRoom: 0,
        bathRoom: 0,
        areaMin: 0,
        areaMax: 0,
        sort: ""
    },
    searchHomePageText: {
        section: "",
        type: { _id: "", name: "" },
        priceMin: 0
    }
};
export const SearchPageSlice = createSlice({
    name: "searchPage",
    initialState,
    reducers: {
        setSearchPage: (
            state,
            action: PayloadAction<{
                section: string;
                type: string;
                priceMin: number;
                priceMax: number;
                areaMin: number;
                areaMax: number;
                bathRoom: number;
                bedRoom: number;
                sort: string;
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
                section: string;
                type: string;
                priceMin: number;
            }>
        ) => {
            return {
                ...state,
                searchHomePageText: {
                    section: action.payload.section || "",
                    type: { _id: action.payload.type || "", name: "" },
                    priceMin: action.payload.priceMin
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
                        section: "",
                        type: "",
                        priceMin: 0,
                        priceMax: 0,
                        bathRoom: 0,
                        bedRoom: 0,
                        areaMin: 0,
                        areaMax: 0
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
                    query = { section: "", type: "", priceMin: 0 }
                } = action.payload;

                return {
                    ...state,
                    message: message,
                    data,
                    isLoading: false,
                    searchHomePageText: {
                        section: query.section,
                        type: query.type,
                        priceMin: query.priceMin
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
