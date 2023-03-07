import React, { useMemo, useState } from "react";
import "./SearchProperty.css";
import {
    Layout,
    Menu,
    Select,
    Input,
    Checkbox,
    theme,
    Radio,
    InputNumber
} from "antd";
import type { RadioChangeEvent } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;
import {
    SearchOutlined,
    EnvironmentOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FilterOutlined,
    SettingOutlined,
    ShrinkOutlined,
    HomeOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import { typeArr } from "../../../common/constants";
import { sizeArr } from "../../../common/constants";
import { sortOptions } from "../../../common/constants";
import { Content } from "antd/es/layout/layout";
import { SearchEstateResult } from "../SearchEstateResult";
import { PaginationComponent } from "../../../common/sharedComponent/Pagination";
import { ISearchEstateResult } from "../SearchEstateResult/SearchResultType";
import { usePagination } from "../../../common/hooks/Pagination/usePagination";
import { ReactComponent as NoData } from "../../../assets/icon/No-data-pana.svg";

const StyleCollapsedIn = styled(MenuFoldOutlined)`
    font-size: var(--font-sz9);
`;
const StyleCollapsedOut = styled(MenuUnfoldOutlined)`
    font-size: var(--font-sz9);
`;
const PageSize = 4;
const SearchProperty: React.FC = () => {
    const [value, setValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const estateResultList: ISearchEstateResult[] = [
        {
            estateId: "1",
            estateName: "Toa nha ABC",
            estateAddress: "52 Hoang Dieu, Hai Chau, Da Nang",
            estatePrice: "2500",
            estateBedroom: 2,
            estateBathroom: 2,
            estateArea: 100,
            estateType: "Apartment"
        },
        {
            estateId: "2",
            estateName: "Toa nha ABC",
            estateAddress: "52 Hoang Dieu, Hai Chau, Da Nang",
            estatePrice: "2500",
            estateBedroom: 2,
            estateBathroom: 2,
            estateArea: 100,
            estateType: "Apartment"
        },
        {
            estateId: "3",
            estateName: "Toa nha ABC",
            estateAddress: "52 Hoang Dieu, Hai Chau, Da Nang",
            estatePrice: "2500",
            estateBedroom: 2,
            estateBathroom: 2,
            estateArea: 100,
            estateType: "Apartment"
        },
        {
            estateId: "4",
            estateName: "Toa nha ABC",
            estateAddress: "52 Hoang Dieu, Hai Chau, Da Nang",
            estatePrice: "2500",
            estateBedroom: 2,
            estateBathroom: 2,
            estateArea: 100,
            estateType: "Apartment"
        },
        {
            estateId: "5",
            estateName: "Toa nha ABC",
            estateAddress: "52 Hoang Dieu, Hai Chau, Da Nang",
            estatePrice: "2500",
            estateBedroom: 2,
            estateBathroom: 2,
            estateArea: 100,
            estateType: "Apartment"
        }
    ];

    const currentData = usePagination<ISearchEstateResult>({
        arrayData: estateResultList,
        currentPage,
        pageSize: PageSize
    });
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    return (
        <div className="search-property">
            <Layout>
                <Sider
                    width={250}
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
                            <Input
                                prefix={<SearchOutlined />}
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
                            <div className="search-property-price">
                                <p className="search-property-price-title">
                                    Minimum price
                                </p>
                                <Input className="search-property-input-price"></Input>
                            </div>
                            <div className="search-property-price">
                                <p className="search-property-price-title">
                                    Maximum price
                                </p>
                                <Input className="search-property-input-price" />
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
                                    className="search-property-input-facilities"
                                    min={0}
                                />
                            </div>
                            <div className="search-property-facilities">
                                <p className="search-property-bathroom-title">
                                    Bathroom:
                                </p>
                                <InputNumber
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
                            {typeArr.map((item, index) => {
                                return (
                                    <div
                                        className="search-property-type-checkbox"
                                        key={`update-item-${index}`}
                                    >
                                        <Checkbox value={item}>{item}</Checkbox>
                                    </div>
                                );
                            })}
                        </SubMenu>
                        <hr className="search-property-hr" />
                        <SubMenu
                            key="size"
                            title={
                                <span className="search-property-title">
                                    Size
                                </span>
                            }
                            icon={
                                <ShrinkOutlined className="search-property-menu-icon" />
                            }
                        >
                            <Radio.Group onChange={onChange} value={value}>
                                {sizeArr.map((item, index) => {
                                    return (
                                        <Radio
                                            className="search-property-type-radio"
                                            key={`update-item-${index}`}
                                            value={item}
                                        >
                                            {item}
                                        </Radio>
                                    );
                                })}
                            </Radio.Group>
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
                            {estateResultList.length > 0 ? (
                                currentData.map(item => {
                                    const { estateId } = item;
                                    return (
                                        <SearchEstateResult
                                            width="45%"
                                            key={estateId}
                                            {...item}
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
                            {estateResultList.length > 0 && (
                                <PaginationComponent
                                    pageSize={PageSize}
                                    totalItem={estateResultList.length}
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
