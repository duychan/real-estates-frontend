import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";

export interface IMyEstateResult {
    estateResult: IEstate;
    handleGetSingleEstate: () => void;
}
