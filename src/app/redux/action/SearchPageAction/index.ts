import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchPageApi } from "../../../api/SearchPageApi";
import { ISearchPage } from "../../reducer/SearchPageSlice/SearchPageType";

export const SearchPage = createAsyncThunk(
    "estates/searchPage",
    async ({
        section,
        type,
        priceMin,
        priceMax,
        bathRoom,
        bedRoom,
        areaMin,
        areaMax
    }: ISearchPage) => {
        try {
            const data = await searchPageApi.searchPage({
                section,
                type,
                priceMin,
                priceMax,
                bathRoom,
                bedRoom,
                areaMin,
                areaMax
            });
            return {
                ...data,
                query: {
                    section: section,
                    type: type,
                    priceMin: priceMin,
                    priceMax: priceMax,
                    bathRoom: bathRoom,
                    bedRoom: bedRoom,
                    areaMin: areaMin,
                    areaMax: areaMax
                }
            };
        } catch (error) {
            return error;
        }
    }
);
