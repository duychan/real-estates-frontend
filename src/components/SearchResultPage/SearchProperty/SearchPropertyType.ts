export interface ISearchPage {
    address: string;
    type: { _id: string; name: string };
    minPrice: number;
    maxPrice: number;
    bathRoom: number;
    bedRoom: number;
    area: number;
}
