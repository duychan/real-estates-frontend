import { postWishesApi } from "../../../api/WishesListApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const PostWishesEstate = createAsyncThunk(
    "wishes/post",
    async (idEstate: string) => {
        try {
            const response = await postWishesApi.postWishes(idEstate);
            return response;
        } catch (error) {
            return error;
        }
    }
);
