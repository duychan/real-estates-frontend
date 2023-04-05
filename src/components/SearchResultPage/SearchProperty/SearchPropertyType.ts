export interface ISearchPage {
    section: string;
    type: { _id: string; name: string };
    priceMin: number | null;
    priceMax: number | null;
    bathRoom: number | null;
    bedRoom: number | null;
    areaMin: number | null;
    areaMax: number | null;
    sort: string;
}
