import { Button, Col, Row } from "antd";
import React from "react";
import { AreaCard } from "../../components/homePage/AreaCard";
import { InformationCard } from "../../components/homePage/InformationCard";
import ProductCard from "../../components/homePage/ProductCard";
import Search from "../../components/homePage/Search";
import "./HomePage.css";
import area from "../../../assets/images/area.jpg";

export const HomePage: React.FC = () => {
    return (
        <div>
            <Search />
            <div className="info-card">
                <h1>Our Estate</h1>
                <Row justify={"start"} align="middle">
                    <Col
                        xs={{ span: 10, offset: 1 }}
                        lg={{ span: 10, offset: 1 }}
                        className="col-1-card-1"
                    >
                        <AreaCard
                            width="115%"
                            imageCard={area}
                            contentCard="Wyndham"
                        />
                    </Col>
                    <Col
                        xs={{ span: 10, offset: 3 }}
                        lg={{ span: 10, offset: 3 }}
                    >
                        <AreaCard
                            width="115%"
                            imageCard={area}
                            contentCard="Wyndham"
                        />
                    </Col>
                </Row>
                <Row justify={"space-between"} align="middle">
                    <Col
                        xs={{ span: 7, offset: 0 }}
                        lg={{ span: 7, offset: 0 }}
                        className="col-1-card-2"
                    >
                        <AreaCard
                            width="105%"
                            imageCard={area}
                            contentCard="Wyndham"
                        />
                    </Col>
                    <Col
                        xs={{ span: 7, offset: 0 }}
                        lg={{ span: 7, offset: 0 }}
                        className="col-2-card-2"
                    >
                        <AreaCard
                            width="105%"
                            imageCard={area}
                            contentCard="Wyndham"
                        />
                    </Col>
                    <Col
                        xs={{ span: 7, offset: 1 }}
                        lg={{ span: 7, offset: 1 }}
                        className="col-3-card-2"
                    >
                        <AreaCard
                            width="105%"
                            imageCard={area}
                            contentCard="Wyndham"
                        />
                    </Col>
                </Row>
            </div>
            <ProductCard />
            <div className="info-card">
                <h1>News</h1>
                <InformationCard />
                <InformationCard flexDir="row-reverse" />
                <Row justify={"center"} align="middle" className="row-view-btn">
                    <Button className="view-btn">View more</Button>
                </Row>
            </div>
        </div>
    );
};
