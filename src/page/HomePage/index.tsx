import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { InformationCard } from "../../components/homePage/InformationCard";
import ProductCard from "../../components/homePage/ProductCard";
import Search from "../../components/homePage/Search";
import "./HomePage.css";
import { AreaSlider } from "../../components/homePage/AreaCard";
import { getDistricts } from "../../app/api/MapApi";
import { ILocation } from "../../app/api/MapApi/MapType";

const DaNangCode = "48";

export const HomePage: React.FC = () => {
    const [areaData, setAreaData] = useState<ILocation[]>([]);
    useEffect(() => {
        getDistricts(DaNangCode)
            .then(response => {
                setAreaData(response?.data?.records || []);
            })
            .catch(error => {
                alert(error);
            });
    }, []);

    return (
        <div>
            <Search />
            <div className="info-card">
                <h1 className="info-card-header">Explore Our Estate</h1>
                <div className="info-card-area-card">
                    <AreaSlider arrayArea={areaData} />
                </div>
            </div>
            <div className="list-estate">
                <div className="title-productcard">
                    <h1 className="info-card-header">List Product</h1>
                </div>
                <div className="list-estate-card">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <div className="view-more">
                    <Button className="view-btn">View more </Button>
                </div>
            </div>

            <div className="info-card">
                <h1 className="info-card-header">News</h1>
                <InformationCard />
                <InformationCard flexDir="row-reverse" />
                <Row justify={"center"} align="middle" className="row-view-btn">
                    <Button className="view-btn">View more</Button>
                </Row>
            </div>
        </div>
    );
};
