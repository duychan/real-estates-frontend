import React, { useEffect } from "react";
import "./Search.css";
import { Input, Col, Row } from "antd";
import {
    SearchOutlined,
    EnvironmentOutlined,
    ProfileOutlined,
    ToolOutlined
} from "@ant-design/icons";
import img1 from "../../assets/images/img2.avif";
const Search: React.FC = () => {
    return (
        <div className="search">
            <div className="image">
                <img
                    src="https://images.unsplash.com/photo-1445272727255-681d14e89af1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    alt=""
                />
            </div>

            <div className="search-content container">
                <div className="text-div">
                    <h1 data-aos="fade-up" className="search-title">
                        Wellcome to Code Engine Studio!
                    </h1>
                </div>

                <div data-aos="fade-up" className="card-div grid">
                    <Row>
                        <Col
                            xs={{ span: 6, offset: 1 }}
                            lg={{ span: 6, offset: 2 }}
                        >
                            <label htmlFor="date">Search by location:</label>
                            <Input
                                placeholder="search location"
                                suffix={<EnvironmentOutlined />}
                            ></Input>
                        </Col>
                        <Col
                            xs={{ span: 5, offset: 1 }}
                            lg={{ span: 6, offset: 1 }}
                        >
                            <label htmlFor="date">Search by properties:</label>
                            <Input
                                placeholder="search properties"
                                suffix={<ProfileOutlined />}
                            ></Input>
                        </Col>
                        <Col
                            xs={{ span: 5, offset: 1 }}
                            lg={{ span: 6, offset: 1 }}
                        >
                            <label htmlFor="date">Search by features:</label>
                            <Input
                                placeholder="search features"
                                suffix={<ToolOutlined />}
                            ></Input>
                        </Col>
                    </Row>
                    <div className="search-options flex">
                        <SearchOutlined className="search-icon" />

                        <span>SEARCH</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
