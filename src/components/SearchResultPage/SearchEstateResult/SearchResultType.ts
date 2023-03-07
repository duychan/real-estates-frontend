import { ReactNode } from "react";

export interface ISearchEstateResult {
    width?: string;
    estateId: string;
    estateName: string;
    estateAddress: string;
    estatePrice: string;
    estateType: string;
    estateBedroom: number;
    estateBathroom: number;
    estateArea: number;
}
export interface IIconDetail {
    keyIcon: string;
    title: string;
    iconContent: string;
    icon: ReactNode;
}
