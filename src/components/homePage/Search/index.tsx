import React, { useEffect } from "react";
import "./Search.css";
import { Input, Col, Row, Form, Button, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import {
    SearchOutlined,
    EnvironmentOutlined,
    ProfileOutlined,
    ToolOutlined,
    MoneyCollectOutlined
} from "@ant-design/icons";
import SelecType from "../../UploadPage/SelectType";
import { ISelectOption } from "../../UploadPage/SelectType/SelectItemType";
import { useDispatch, useSelector } from "react-redux";
import { ISearchHomePage } from "./SearchType";
import { useAppDispatch } from "../../../app/redux/store";
import { SearchHomePage } from "../../../app/redux/action/SearchResultAction";

const Search: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onFinish = (query: ISearchHomePage) => {
        dispatch(SearchHomePage(query));
        navigate("/search-page");
    };
    const [form] = Form.useForm();

    return (
        <div className="search">
            <div className="image">
                <img
                    src="https://images.unsplash.com/photo-1445272727255-681d14e89af1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                    alt=""
                />
            </div>

            <div className="search-content">
                <div className="text-div">
                    <h1 data-aos="fade-up" className="search-title">
                        Welcome to CES Estate!
                    </h1>
                </div>

                <div data-aos="fade-up" className="card-div">
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Row>
                            <Col
                                xs={{ span: 6, offset: 1 }}
                                lg={{ span: 6, offset: 2 }}
                            >
                                <Form.Item
                                    label="Search by location:"
                                    name="address"
                                >
                                    <Input
                                        size="large"
                                        placeholder="search location"
                                        suffix={<EnvironmentOutlined />}
                                    ></Input>
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 6, offset: 1 }}>
                                <Form.Item label="Search by types:" name="type">
                                    <SelecType
                                        handleChangeValue={(
                                            value:
                                                | ISelectOption
                                                | ISelectOption[]
                                        ) => {
                                            form.setFieldValue("type", value);
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col
                                xs={{ span: 6, offset: 2 }}
                                lg={{ span: 6, offset: 1 }}
                            >
                                <Form.Item
                                    label="Search by minimum price:"
                                    name="price"
                                >
                                    <InputNumber
                                        size="large"
                                        className="input-search"
                                        addonAfter="VNĐ"
                                        formatter={value =>
                                            ` ${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        min={0}
                                    ></InputNumber>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button
                            htmlType="submit"
                            className="search-options flex"
                            icon={<SearchOutlined />}
                        >
                            SEARCH
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Search;
