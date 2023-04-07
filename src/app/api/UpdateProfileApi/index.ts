import BaseApi from "../../BaseAPI";

export const updateUserInfor = async (formData: FormData) => {
    return await BaseApi.patch("/users/profile", formData).then(
        res => res.data
    );
};
