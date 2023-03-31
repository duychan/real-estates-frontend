import React, { useState, useEffect, useCallback } from "react";
import "./SearchProperty.css";
import { Layout, Menu, Select, Input, theme, InputNumber } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;
import {
    EnvironmentOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FilterOutlined,
    SettingOutlined,
    HomeOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import { sortOptions } from "../../../common/constants";
import { Content } from "antd/es/layout/layout";
import { SearchEstateResult } from "../SearchEstateResult";
import { PaginationComponent } from "../../../common/sharedComponent/Pagination";
import { usePagination } from "../../../common/hooks/Pagination/usePagination";
import { ReactComponent as NoData } from "../../../assets/icon/No-data-pana.svg";
import { ISelectItemType } from "../../UploadPage/SelectType/SelectItemType";
import { useAppDispatch } from "../../../app/redux/store";
import { useSelector } from "react-redux";
import { SearchPage } from "../../../app/redux/action/SearchPageAction";
import { ISearchPage } from "./SearchPropertyType";
import {
    getResultSearchPage,
    getDataSearchPage,
    setSearchHomePage
} from "../../../app/redux/reducer/SearchPageSlice";
import { IEstate } from "../../../app/redux/reducer/SearchPageSlice/SearchPageType";
import { GetAllEstate } from "../../../app/redux/action/GetAllEstateAction";
import RadioType from "../RadioType";
import useDebounce from "../../../common/hooks/Debounce";
import { useNavigate } from "react-router-dom";

const StyleCollapsedIn = styled(MenuFoldOutlined)`
    font-size: var(--font-sz9);
`;
const StyleCollapsedOut = styled(MenuUnfoldOutlined)`
    font-size: var(--font-sz9);
`;
const PageSize = 4;
const DebounceTime = 500;
const SearchProperty: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState<ISearchPage>({
        address: "",
        minPrice: 0,
        maxPrice: 0,
        area: 0,
        bathRoom: 0,
        bedRoom: 0,
        type: { _id: "", name: "" }
    });

    const debouncedSearchText: ISearchPage = useDebounce<ISearchPage>(
        searchText,
        DebounceTime
    );

    const { records: recordsSearchPage, total: totalSearchPage } =
        useSelector(getResultSearchPage);
    const { searchHomePageText } = useSelector(getDataSearchPage);
    const isCheckSearchHomPageText = useCallback(() => {
        return (
            searchHomePageText?.address === "" &&
                searchHomePageText?.type === undefined,
            searchHomePageText?.price === 0
        );
    }, [
        searchHomePageText?.address,
        searchHomePageText?.price,
        searchHomePageText?.type
    ]);

    const isCheckSearchText = useCallback(() => {
        return (
            debouncedSearchText.address === "" &&
            debouncedSearchText.area === 0 &&
            debouncedSearchText.bathRoom === 0 &&
            debouncedSearchText.bedRoom === 0 &&
            debouncedSearchText.maxPrice === 0 &&
            debouncedSearchText.minPrice === 0 &&
            debouncedSearchText.type._id === "" &&
            debouncedSearchText.type.name === ""
        );
    }, [
        debouncedSearchText.address,
        debouncedSearchText.area,
        debouncedSearchText.bathRoom,
        debouncedSearchText.bedRoom,
        debouncedSearchText.maxPrice,
        debouncedSearchText.minPrice,
        debouncedSearchText.type._id,
        debouncedSearchText.type.name
    ]);

    useEffect(() => {
        if (!searchHomePageText) {
            dispatch(GetAllEstate());
            return;
        }
        if (isCheckSearchText() && isCheckSearchHomPageText()) {
            dispatch(GetAllEstate());
        }
    }, [
        dispatch,
        isCheckSearchHomPageText,
        isCheckSearchText,
        searchHomePageText
    ]);

    useEffect(() => {
        if (!isCheckSearchText()) {
            dispatch(SearchPage(debouncedSearchText));
            dispatch(setSearchHomePage({ address: "", type: "", price: 0 }));
        }
    }, [debouncedSearchText]);

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchText({
            ...searchText,
            address: event.target.value
        });
    };
    const handleBedRoomChange = (value: number | null) => {
        setSearchText(prevState => ({
            ...prevState,
            bedRoom: value || 0
        }));
    };

    const handleBathRoomChange = (value: number | null) => {
        setSearchText(prevState => ({
            ...prevState,
            bathRoom: value || 0
        }));
    };

    const handleMinPriceChange = (value: number | null) => {
        setSearchText(prevState => ({
            ...prevState,
            minPrice: value || 0
        }));
    };

    const handleMaxPriceChange = (value: number | null) => {
        setSearchText(prevState => ({
            ...prevState,
            maxPrice: value || 0
        }));
    };

    const handleTypeChange = (selectedType: ISelectItemType) => {
        setSearchText(prevState => ({
            ...prevState,
            type: { _id: selectedType._id, name: selectedType.name }
        }));
    };

    const currentData = usePagination<IEstate>({
        arrayData: recordsSearchPage,
        currentPage,
        pageSize: PageSize
    });

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <div className="search-property">
            <Layout>
                <Sider
                    width={280}
                    theme="light"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <h1 className="search-property-filter">
                        <FilterOutlined className="search-property-icon-filter" />
                        Filter Estate
                    </h1>
                    <hr className="search-property-hr" />
                    <Menu
                        className="search-property-menu"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["location"]}
                    >
                        <SubMenu
                            key="location"
                            title={
                                <span className="search-property-title">
                                    Location
                                </span>
                            }
                            icon={
                                <EnvironmentOutlined className="search-property-menu-icon" />
                            }
                        >
                            <Input.Search
                                onChange={handleChangeAddress}
                                value={searchText.address}
                                className="search-property-input-location"
                            />
                        </SubMenu>
                        <hr className="search-property-hr" />
                        <SubMenu
                            key="price"
                            title={
                                <span className="search-property-title">
                                    Price
                                </span>
                            }
                            icon={
                                <DollarCircleOutlined className="search-property-menu-icon" />
                            }
                        >
                            <div className="search-property-min-price">
                                <p className="search-property-price-title">
                                    Minimum price
                                </p>
                                <InputNumber
                                    onChange={handleMinPriceChange}
                                    formatter={value =>
                                        ` ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    className="search-property-input-price"
                                    min={0}
                                ></InputNumber>
                            </div>
                            <div className="search-property-max-price">
                                <p className="search-property-price-title">
                                    Maximum price
                                </p>
                                <InputNumber
                                    onChange={handleMaxPriceChange}
                                    formatter={value =>
                                        ` ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    className="search-property-input-price"
                                    min={0}
                                />
                            </div>
                        </SubMenu>
                        <hr className="search-property-hr" />
                        <SubMenu
                            key="facilities"
                            title={
                                <span className="search-property-title">
                                    Facilities
                                </span>
                            }
                            icon={
                                <HomeOutlined className="search-property-menu-icon" />
                            }
                        >
                            <div className="search-property-facilities">
                                <p className="search-property-bedroom-title">
                                    Bedroom:
                                </p>
                                <InputNumber
                                    value={searchText.bedRoom}
                                    onChange={handleBedRoomChange}
                                    className="search-property-input-facilities"
                                    min={0}
                                />
                            </div>
                            <div className="search-property-facilities">
                                <p className="search-property-bathroom-title">
                                    Bathroom:
                                </p>
                                <InputNumber
                                    value={searchText.bathRoom}
                                    onChange={handleBathRoomChange}
                                    className="search-property-input-facilities"
                                    min={0}
                                />
                            </div>
                        </SubMenu>
                        <hr className="search-property-hr" />
                        <SubMenu
                            key="property"
                            title={
                                <span className="search-property-title">
                                    Type
                                </span>
                            }
                            icon={
                                <SettingOutlined className="search-property-menu-icon" />
                            }
                        >
                            <div className="search-property-type-select">
                                <RadioType setValueOption={handleTypeChange} />
                            </div>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <div className="search-property-header">
                        <div className="search-property-header-collapsed">
                            {React.createElement(
                                collapsed
                                    ? StyleCollapsedIn
                                    : StyleCollapsedOut,
                                {
                                    className: "trigger",
                                    onClick: () => setCollapsed(!collapsed)
                                }
                            )}
                        </div>

                        <div className="search-property-header-sort">
                            <Select
                                className="search-property-sort-title"
                                placeholder="SORT BY"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={sortOptions}
                            />
                        </div>
                    </div>
                    <Content className="search-result-content">
                        <div className="search-result-content-card">
                            {recordsSearchPage.length > 0 ? (
                                currentData.map(item => {
                                    const { _id } = item;
                                    return (
                                        <SearchEstateResult
                                            handleGetSingleEstate={() => {
                                                navigate(
                                                    `/single-estate/${_id}`
                                                );
                                            }}
                                            width="45%"
                                            key={_id}
                                            estateResult={item}
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
                            {recordsSearchPage.length > 0 && (
                                <PaginationComponent
                                    pageSize={PageSize}
                                    totalItem={totalSearchPage}
                                    defaultCurrent={1}
                                    handleGetCurrentPage={(page: number) => {
                                        setCurrentPage(page);
                                    }}
                                />
                            )}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default SearchProperty;
