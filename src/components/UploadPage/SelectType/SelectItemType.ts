export interface ISelectOption {
    value: string;
    label: string;
}

export interface ISelectItemType {
    _id: string;
    name: string;
    createAt: string;
    updateAt: string;
}

export interface ISelectType {
    message: string;
    data: {
        records: ISelectItemType[];
    };
    total: number;
}

export interface ISelect {
    handleChangeValue: (value: ISelectOption | ISelectOption[]) => void;
}
