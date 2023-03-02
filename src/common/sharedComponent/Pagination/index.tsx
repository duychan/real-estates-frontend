import { Pagination } from "antd";
import React from "react";
import "./Pagination.css";
import { IPagination } from "./PaginationType";

export const PaginationComponent: React.FC<IPagination> = ({
    pageSize,
    totalItem,
    defaultCurrent
}) => {
    return (
        <Pagination
            showSizeChanger={false}
            defaultCurrent={defaultCurrent}
            pageSize={pageSize}
            total={totalItem}
        />
    );
};
