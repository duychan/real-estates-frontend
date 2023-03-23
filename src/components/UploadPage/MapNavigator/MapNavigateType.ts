export interface IAddressOption {
    value: string;
    label: string;
}

export interface IAddressSelect {
    arrayOption: IAddressOption[];
    handleChangeValue: (
        addressValue: IAddressOption | IAddressOption[]
    ) => void;
    placeholder: string;
    value: string;
}

export interface IEstateLocation {
    addressNumber: string;
    city: IAddressOption;
    district: IAddressOption;
    ward: IAddressOption;
}

export interface ICoordinates {
    lat: number;
    lng: number;
}
export interface IMapNavigate {
    handleGetEstateLocation: (coordinates: ICoordinates) => void;
}
