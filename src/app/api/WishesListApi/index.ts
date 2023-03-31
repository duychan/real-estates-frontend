import BaseApi from "../../BaseAPI";

export const postWishes = async (idEstate: string) => {
    return await BaseApi.post(`/estates/${idEstate}/wishesLists`).then(
        res => res.data
    );
};

export const deleteWishes = async (idWishesList: string) => {
    return await BaseApi.delete(`/wishesLists/${idWishesList}`).then(
        res => res.data
    );
};

export const deleteWishesApi = { deleteWishes };
export const postWishesApi = { postWishes };
