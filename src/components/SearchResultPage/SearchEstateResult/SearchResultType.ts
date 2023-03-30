import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";
import { ReactNode } from "react";

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
