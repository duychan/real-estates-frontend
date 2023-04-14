import BaseApi from "../../BaseAPI";

export const getMyEstate = async () => {
    return await BaseApi.get(`/users/me/estates?limit=1000`).then(
        res => res.data
    );
};
export const deleteMyEstate = async (idMyEstate: string) => {
    return await BaseApi.delete(`estates/${idMyEstate}`).then(res => res.data);
};
export const updateMyEstate = async ({
    idEstate,
    formData
}: {
    idEstate: string;
    formData: FormData;
}) => {
    return await BaseApi.patch(`/estates/${idEstate}`, formData).then(
        res => res.data
    );
};

export const getMyEstateApi = { getMyEstate, deleteMyEstate, updateMyEstate };
