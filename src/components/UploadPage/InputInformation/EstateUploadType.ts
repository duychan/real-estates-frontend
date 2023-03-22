import { UploadFile } from "antd/es/upload/interface";
export interface IEstateUpload {
    owner: string;
    name: string;
    address: string;
    area: number;
    price: number;
    currentStatus: string;
    type: { key: string; value: string };
    coverImg: string;
    thumbnail: UploadFile[] | [UploadFile, ...UploadFile[]];
    bedRoom: number;
    bathRoom: number;
    description: string;
}
