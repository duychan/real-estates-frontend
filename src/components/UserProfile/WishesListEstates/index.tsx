import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/sharedComponent/Pagination";
import { ReactComponent as NoData } from "../../../assets/icon/No-data-pana.svg";
import { useAppDispatch } from "../../../app/redux/store";
import { usePagination } from "../../../common/hooks/Pagination/usePagination";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllWishListEstate } from "../../../app/redux/action/WishesListAction";
import { getAllWishesEstate } from "../../../app/redux/reducer/GetAllWishEstatesSlice";
import { WishesListResult } from "./WishesListResult";
import { IWishesEstate } from "../../../app/redux/reducer/GetAllWishEstatesSlice/getAllWishEstateType";

const PageSize = 4;
const HistoryEstate: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const { records = [], total = 0 } = useSelector(getAllWishesEstate);

    useEffect(() => {
        if (records.length === 0) {
            dispatch(GetAllWishListEstate());
        }
    }, [dispatch, records]);

    const currentData = usePagination<IWishesEstate>({
        arrayData: records,
        currentPage,
        pageSize: PageSize
    });

    return (
        <div className="history-estate">
            <div className="history-estate-product-list">
                {records.length > 0 ? (
                    currentData?.map(item => {
                        const { _id, estate } = item;
                        return (
                            <WishesListResult
                                key={_id}
                                estateResult={estate}
                                handleGetSingleEstate={() => {
                                    navigate(`/single-estate/${estate._id}`);
                                }}
                            />
                        );
                    })
                ) : (
                    <div className="search-result-no-data">
                        <NoData className="search-result-no-data-img" />
                        <p className="search-result-empty-content">
                            No real estate is found
                        </p>
                    </div>
                )}
            </div>
            <div className="search-result-content-pagination">
                {records.length > 0 && (
                    <PaginationComponent
                        pageSize={PageSize}
                        totalItem={total}
                        defaultCurrent={1}
                        handleGetCurrentPage={(page: number) => {
                            setCurrentPage(page);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default HistoryEstate;
