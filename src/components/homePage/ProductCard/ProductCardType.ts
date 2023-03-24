export interface IProductCard {
    _id: string;
    name: string;
    address: string;
    type: { name: string };
    price: string;
    bedRoom: number;
    bathRoom: number;
    area: string;
    coverImg: string;
    handleGetSingleEstate: () => void;
}
