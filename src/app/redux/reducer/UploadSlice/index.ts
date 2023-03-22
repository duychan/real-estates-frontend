import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RcFile } from "rc-upload/lib/interface";
import { IUploadEstateState } from "./UploadSliceType";

const initialState: IUploadEstateState = {
    isLoading: false,
    message: "",
    data: {
        records: {
            _id: "",
            owner: "",
            name: "",
            address: "",
            area: 0,
            price: 0,
            currentStatus: "",
            type: { key: "", value: "" },
            coverImg: "",
            thumbnail: [],
            bedRoom: 0,
            bathRoom: 0,
            description: "",
            createAt: "",
            updateAt: ""
        }
    },
    total: 0,
    formData: null
};
export const UploadSlice = createSlice({
    name: "uploadEstate",
    initialState,
    reducers: {
        setUploadFormData: (state, action) => {
            const formData = new FormData();
            formData.append("owner", action.payload._id);
            formData.append("name", action.payload.name);
            formData.append("address", "192 Nguyen Luong Bang");
            formData.append("area", String(action.payload.area));
            formData.append("price", String(action.payload.price));
            formData.append("type", action.payload.type);
            formData.append("currentStatus", "641805bed27ac809a60a9cd3");
            formData.append(
                "coverImg",
                action.payload.coverImg.originFileObj as RcFile
            );
            formData.append("bedRoom", String(action.payload.bedRoom));
            formData.append("bathRoom", String(action.payload.bathRoom));
            formData.append("description", action.payload.description);
            state.formData = formData;
        }
    },
    extraReducers: builder => {}
});
export default UploadSlice.reducer;
export const { setUploadFormData } = UploadSlice.actions;
