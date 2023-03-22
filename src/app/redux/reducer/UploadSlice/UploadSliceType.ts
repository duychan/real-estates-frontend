import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";

export interface IUploadEstate {
    _id: string;
    owner: string;
    name: string;
    address: string;
    area: number;
    price: number;
    currentStatus: string;
    type: { key: string; value: string };
    coverImg: string;
    thumbnail: string[];
    bedRoom: number;
    bathRoom: number;
    description: string;
    updateAt: string;
    createAt: string;
}

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
}

export interface IUploadEstateState {
    message: string;
    data: {
        records: IUploadEstate;
    };
    total: number;
    isLoading: boolean;
    formData: FormData | null;
}
