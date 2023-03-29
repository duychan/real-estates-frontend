import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchPageApi } from "../../../api/SearchPageApi";
import { ISearchPage } from "../../reducer/SearchPageSlice/SearchPageType";

export const SearchPage = createAsyncThunk(
    "estates/searchPage",
    async ({
        address,
        type,
        minPrice,
        maxPrice,
        bathRoom,
        bedRoom
    }: ISearchPage) => {
        try {
            const data = await searchPageApi.searchPage({
                address,
                type,
                minPrice,
                maxPrice,
                bathRoom,
                bedRoom
            });
            return {
                ...data,
                query: {
                    address: address,
                    type: type,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    bathRoom: bathRoom,
                    bedRoom: bedRoom
                }
            };
        } catch (error) {
            return error;
        }
    }
);
