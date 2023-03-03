import React, { useState } from "react";
import "./DetailInfomation.css";
import { Button, Col, Row, Avatar } from "antd";
import { ReactComponent as BedIcon } from "../../../assets/icon/bed.svg";
import { ReactComponent as BathIcon } from "../../../assets/icon/bath.svg";
import {
    EnvironmentOutlined,
    HeartOutlined,
    FacebookOutlined,
    MailOutlined,
    InstagramOutlined,
    TwitterOutlined,
    UserOutlined,
    MoneyCollectOutlined,
    DollarCircleOutlined,
    SearchOutlined,
    FullscreenExitOutlined
} from "@ant-design/icons";

const DetailInfomation: React.FC = () => {
    const [favorite, setfavorite] = React.useState("favorite-icon");

    return (
        <div className="detail-product">
            <div className="detail-product-content">
                <div className="product-name">
                    <h2>Ba Huyen Thanh Quan Street</h2>
                    <div className="favorite">
                        <Button
                            className="button-favorite"
                            icon={<HeartOutlined className={favorite} />}
                            onClick={() => setfavorite("favorite1-icon")}
                        ></Button>
                        Favorite
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-address">
                        <h3>215 Vo Nguyen Giap, Da Nang</h3>
                        <h4>Type: Apartment</h4>
                    </div>
                    <div className="product-fee">
                        <h1>$25000</h1>
                    </div>
                </div>
                <div className="product-share">
                    <p className="share">Share: </p>
                    <FacebookOutlined className="icon-share" />
                    <MailOutlined className="icon-share" />
                    <InstagramOutlined className="icon-share" />
                    <TwitterOutlined className="icon-share" />
                </div>
                <div className="detail-info">
                    <Row>
                        <Col xs={{ span: 8, offset: 0 }}>
                            <p className="detail-product-p">
                                <BedIcon className="icon-detail__svg" />
                                Bedroom: 2
                            </p>

                            <p className="detail-product-p">
                                <SearchOutlined className="icon-detail" />
                                Neighborhood: Near New Phuong Dong{" "}
                            </p>
                        </Col>
                        <Col
                            xs={{ span: 9, offset: 2 }}
                            lg={{ span: 6, offset: 3 }}
                        >
                            <p className="detail-product-p">
                                <FullscreenExitOutlined className="icon-detail" />
                                Area: 100m^2
                            </p>
                            <p className="detail-product-p">
                                <BathIcon className="icon-detail__svg" />
                                Bathroom: 2
                            </p>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <Button type="primary" className="button-contact">
                                Contact Owner
                            </Button>
                            <Avatar
                                className="user"
                                size={50}
                                icon={<UserOutlined />}
                            />{" "}
                            username
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default DetailInfomation;
