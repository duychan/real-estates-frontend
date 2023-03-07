export interface IPagination {
    pageSize: number;
    totalItem: number;
    defaultCurrent: number;
    handleGetCurrentPage: (page: number) => void;
}
