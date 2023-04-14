import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RcFile } from "rc-upload/lib/interface";
import { UploadNewEstate } from "../../action/UploadEstateAction";
import { RootState } from "../../store";
import { IUploadAction, IUploadEstateState } from "./UploadSliceType";
import { EmptyEstate } from "../../../../common/constants";
import { UpdateMyEstate } from "../../action/GetMyEstateAction";

const initialState: IUploadEstateState = {
    isLoading: false,
    message: "",
    data: {
        records: EmptyEstate
    },
    total: 0,
    formData: new FormData()
};

export const UploadSlice = createSlice({
    name: "uploadEstate",
    initialState,
    reducers: {
        setUploadFormData: (state, action) => {
            if (action.payload.fileList) {
                action.payload.fileList?.map((file: RcFile) => {
                    state.formData.append("thumbnail", file);
                });
            }

            state.formData.append("owner", action.payload.owner);
            state.formData.append("name", action.payload.name);
            state.formData.append("address", action.payload.address);
            state.formData.append("area", String(action.payload.area));
            state.formData.append("price", String(action.payload.price));
            state.formData.append("type", action.payload.type);
            state.formData.append(
                "currentStatus",
                action.payload.currentStatus
            );
            state.formData.append(
                "coverImg",
                action.payload.coverImg.originFileObj as RcFile
            );
            state.formData.append("bedRoom", String(action.payload.bedRoom));
            state.formData.append("bathRoom", String(action.payload.bathRoom));
            state.formData.append("description", action.payload.description);
            state.formData.append(
                "location[coordinates]",
                `${action.payload.coordinates.lng},${action.payload.coordinates.lat}`
            );
            if (action.payload.imagesRemoved !== null) {
                state.formData.append(
                    "imagesRemoved",
                    action.payload.imagesRemoved
                );
            }
        },
        deleteUploadFormData: state => {
            state.formData.delete("thumbnail");
            state.formData.delete("owner");
            state.formData.delete("name");
            state.formData.delete("address");
            state.formData.delete("area");
            state.formData.delete("price");
            state.formData.delete("type");
            state.formData.delete("currentStatus");
            state.formData.delete("coverImg");
            state.formData.delete("bedRoom");
            state.formData.delete("bathRoom");
            state.formData.delete("description");
            state.formData.delete("location[coordinates]");
            state.formData.delete("imagesRemoved");
        }
    },
    extraReducers: builder => {
        builder
            .addCase(UploadNewEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(UploadNewEstate.fulfilled, (state, action) => {
                const { data = { records: [] }, message = "" } = action.payload;
                state.formData = initialState.formData;

                return { ...state, message: message, data, isLoading: false };
            })
            .addCase(UploadNewEstate.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
        builder
            .addCase(UpdateMyEstate.pending, state => {
                return { ...state, isLoading: true };
            })
            .addCase(UpdateMyEstate.fulfilled, (state, action) => {
                const {
                    data = { records: initialState.data.records },
                    message = ""
                } = action.payload;
                return {
                    ...state,
                    data,
                    message,
                    isLoading: false
                };
            })
            .addCase(UpdateMyEstate.rejected, state => {
                return {
                    ...state,
                    message: "CANNOT CONNECT SERVER!",
                    isLoading: false
                };
            });
    }
});
export default UploadSlice.reducer;
export const { setUploadFormData, deleteUploadFormData } = UploadSlice.actions;
export const getEstateUpload = (state: RootState) =>
    state.uploadEstate.data.records;
export const getFormData = (state: RootState) => state.uploadEstate.formData;
export const getMessageUpload = (state: RootState) =>
    state.uploadEstate.message;
export const isLoading = (state: RootState) => state.uploadEstate.isLoading;
