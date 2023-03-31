import React, { useEffect, useState } from "react";
import "./HistoryEstate.css";
import { ListMyEstate } from "./ListMyEstate";
import { PaginationComponent } from "../../../common/sharedComponent/Pagination";
import { ReactComponent as NoData } from "../../../assets/icon/No-data-pana.svg";
import { useAppDispatch } from "../../../app/redux/store";
import { GetMyEstate } from "../../../app/redux/action/GetMyEstateAction";
import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";
import { usePagination } from "../../../common/hooks/Pagination/usePagination";
import { useSelector } from "react-redux";
import { getMyEstateData } from "../../../app/redux/reducer/GetMyEstateSlice";
import { useNavigate } from "react-router-dom";

const PageSize = 4;
const HistoryEstate: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(GetMyEstate());
    }, [dispatch]);

    const { records, total } = useSelector(getMyEstateData);
    const currentData = usePagination<IEstate>({
        arrayData: records,
        currentPage,
        pageSize: PageSize
    });

    return (
        <div className="history-estate">
            <div className="history-estate-product-list">
                {records.length > 0 ? (
                    currentData.map(item => {
                        const { _id } = item;
                        return (
                            <ListMyEstate
                                key={_id}
                                estateResult={item}
                                handleGetSingleEstate={() => {
                                    navigate(`/single-estate/${_id}`);
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
