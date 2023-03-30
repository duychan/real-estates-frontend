import BaseApi from "../../BaseAPI";

export const getUserById = async (idUser: string) => {
    return await BaseApi.get(`/users/${idUser}`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return error;
        });
};
