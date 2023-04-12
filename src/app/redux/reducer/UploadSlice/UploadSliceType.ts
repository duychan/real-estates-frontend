import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";
import { ICoordinates } from "../../../../components/UploadPage/MapNavigator/MapNavigateType";
import { IEstate } from "../SearchPageSlice/SearchPageType";

export interface IUploadAction {
    _id: string;
    owner: string;
    name: string;
    address: string;
    area: number;
    price: number;
    currentStatus: string;
    type: string;
    coverImg: UploadFile;
    bedRoom: number;
    bathRoom: number;
    description: string;
    updateAt: string;
    createAt: string;
    fileList: RcFile[];
    coordinates: ICoordinates;
}

export interface IUploadEstateState {
    message: string;
    data: {
        records: IEstate;
    };
    total: number;
    isLoading: boolean;
    formData: FormData;
}
