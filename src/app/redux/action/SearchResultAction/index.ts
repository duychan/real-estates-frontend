import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearchHomePage } from "../../../../components/homePage/Search/SearchType";
import { searchHomePageApi } from "../../../api/SearchHomePageApi";

export const SearchHomePage = createAsyncThunk(
    "estates/search",
    async ({ section, type, priceMin }: ISearchHomePage) => {
        try {
            const data = await searchHomePageApi.searchHomePage(
                section,
                type,
                priceMin
            );
            return {
                ...data,
                query: { section: section, type: type, priceMin: priceMin }
            };
        } catch (error) {
            return error;
        }
    }
);
