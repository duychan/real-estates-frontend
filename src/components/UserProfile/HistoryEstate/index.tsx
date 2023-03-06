import React, { useEffect } from "react";
import "./HistoryEstate.css";
import { Card, Avatar } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import area from "../../../assets/images/area.jpg";
import { PaginationComponent } from "../../../common/sharedComponent/Pagination";

const HistoryEstate: React.FC = () => {
    return (
        <div className="history-estate">
            <div className="history-estate-product-list">
                <Card
                    hoverable
                    className="history-estate-single-card"
                    cover={<img alt="example" src={area} />}
                >
                    <div className="history-estate-product-info">
                        <h3 className="history-estate-product-name">
                            Hoi An Ancient Town
                        </h3>
                        <p className="history-estate-product-address">
                            <EnvironmentOutlined className="history-estate-icon-address" />
                            192 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da
                            Nang
                        </p>
                    </div>
                    <div className="history-estate-product-fees">
                        <div className="history-estate-product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="history-estate-product-price">100</div>
                    </div>
                    <div className="history-estate-product-sub">
                        <div className="history-estate-product-bedroom">
                            Bedrooms: 5
                        </div>
                        <div className="history-estate-product-bathroom">
                            Bathrooms: 5
                        </div>
                        <div className="history-estate-product-area">
                            Size: 500m^2
                        </div>
                    </div>
                </Card>
                <Card
                    hoverable
                    className="history-estate-single-card"
                    cover={<img alt="example" src={area} />}
                >
                    <div className="history-estate-product-info">
                        <h3 className="history-estate-product-name">
                            Hoi An Ancient Town
                        </h3>
                        <p className="history-estate-product-address">
                            <EnvironmentOutlined className="history-estate-icon-address" />
                            192 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da
                            Nang
                        </p>
                    </div>
                    <div className="history-estate-product-fees">
                        <div className="history-estate-product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="history-estate-product-price">100</div>
                    </div>
                    <div className="history-estate-product-sub">
                        <div className="history-estate-product-bedroom">
                            Bedrooms: 5
                        </div>
                        <div className="history-estate-product-bathroom">
                            Bathrooms: 5
                        </div>
                        <div className="history-estate-product-area">
                            Size: 500m^2
                        </div>
                    </div>
                </Card>
                <Card
                    hoverable
                    className="history-estate-single-card"
                    cover={<img alt="example" src={area} />}
                >
                    <div className="history-estate-product-info">
                        <h3 className="history-estate-product-name">
                            Hoi An Ancient Town
                        </h3>
                        <p className="history-estate-product-address">
                            <EnvironmentOutlined className="history-estate-icon-address" />
                            192 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da
                            Nang
                        </p>
                    </div>
                    <div className="history-estate-product-fees">
                        <div className="history-estate-product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="history-estate-product-price">100</div>
                    </div>
                    <div className="history-estate-product-sub">
                        <div className="history-estate-product-bedroom">
                            Bedrooms: 5
                        </div>
                        <div className="history-estate-product-bathroom">
                            Bathrooms: 5
                        </div>
                        <div className="history-estate-product-area">
                            Size: 500m^2
                        </div>
                    </div>
                </Card>
            </div>
            <div className="history-estate-pagination">
                <PaginationComponent
                    pageSize={4}
                    totalItem={50}
                    defaultCurrent={1}
                />
            </div>
        </div>
    );
};

export default HistoryEstate;
