export interface IEstate {
    _id: string;
    owner: string;
    name: string;
    address: string;
    area: string;
    price: string;
    currentStatus: string;
    type: { name: string };
    coverImg: string;
    thumbnail: string[];
    bedRoom: number;
    bathRoom: number;
    description: string;
    updateAt: string;
    createAt: string;
}
export interface IGetAllEstate {
    message: string;
    data: {
        records: IEstate[];
        total: number;
    };
    isLoading: boolean;
}
