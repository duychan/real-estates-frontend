export interface IPaginationHook<T> {
    currentPage: number;
    pageSize: number;
    arrayData: T[];
}
