import { UploadFile } from "antd/es/upload/interface";
import { ICoordinates } from "../MapNavigator/MapNavigateType";
export interface IEstateUpload {
    owner: string;
    name: string;
    address: string;
    area: number;
    price: number;
    currentStatus: string;
    type: { value: string; label: string };
    coverImg: string;
    thumbnail: UploadFile[] | [UploadFile, ...UploadFile[]];
    bedRoom: number;
    bathRoom: number;
    description: string;
    coordinates: ICoordinates;
}
