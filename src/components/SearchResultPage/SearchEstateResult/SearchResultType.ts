import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";
import { ReactNode } from "react";
import { IUploadEstate } from "../../../app/redux/reducer/UploadSlice/UploadSliceType";

export interface ISearchEstateResult {
    width?: string;
    estateResult: IEstate;
}
export interface IIconDetail {
    keyIcon: string;
    title: string;
    iconContent: string;
    icon: ReactNode;
}
