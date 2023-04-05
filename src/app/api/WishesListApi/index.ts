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

export const getAllWishesList = async () => {
    return await BaseApi.get(`/users/me/wishesList?limit=1000`).then(
        res => res.data
    );
};

export const deleteWishesApi = { deleteWishes };
export const postWishesApi = { postWishes };
export const getAllWishesListApi = { getAllWishesList };
