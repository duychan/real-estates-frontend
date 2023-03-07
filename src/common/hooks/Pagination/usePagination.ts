import React, { useMemo } from "react";
import { IPaginationHook } from "./PaginationHookType";

export const usePagination = <T>({
    currentPage,
    pageSize,
    arrayData
}: IPaginationHook<T>) => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    const currentData = useMemo(() => {
        return arrayData.slice(firstPageIndex, lastPageIndex);
    }, [arrayData, firstPageIndex, lastPageIndex]);

    return currentData;
};
