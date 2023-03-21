import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchHomePageApi } from "../../../api/SearchHomePageApi";
import { ISearchHomePage } from "../../reducer/SearchHomePageSlice/SearchHomePageType";

export const SearchHomePage = createAsyncThunk(
    "estates/search",
    async ({ address, type, price }: ISearchHomePage) => {
        try {
            const data = await searchHomePageApi.searchHomePage(
                address,
                type,
                price
            );
            return {
                ...data,
                query: { address: address, type: type, price: price }
            };
        } catch (error) {
            return error;
        }
    }
);
