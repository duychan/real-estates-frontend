import React, { useState } from "react";
import "./navbar.css";
import { Menu, Row, Col, Avatar } from "antd";
import RicciCoLogo from "../../../assets/images/RicciCoLogo-crop.png";
import {
    FacebookOutlined,
    InstagramOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AvatarUser } from "./AvatarUser";
import { LoginUser } from "./LoginUser";

export const Navbar: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const languageList = { vn: "VN", en: "EN" };
    const currencyList = { vnd: "VND", usd: "USD" };

    const [currency, setCurrency] = useState<string>(currencyList.usd);
    const [language, setLanguage] = useState<string>(languageList.en);
    const navigate = useNavigate();

    return (
        <div className="nav">
            <Row justify="center" align="top">
                <Col span={3}>
                    <img
                        src={RicciCoLogo}
                        className="header-logo"
                        onClick={() => navigate("/")}
                    />
                </Col>
                <Col span={16} offset={2} className="col-menu">
                    <Menu className="menu" theme="light" mode="horizontal">
                        {["Rent", "Contact Us"].map(item => (
                            <Menu.Item key={`item-${item}`}>{item}</Menu.Item>
                        ))}
                        <SubMenu
                            title={
                                <div className="dropdown">
                                    <p className="dropdown-text">{`Language: ${language}`}</p>
                                    <CaretDownOutlined />
                                </div>
                            }
                            key="Language"
                        >
                            <MenuItemGroup>
                                {Object.keys(languageList).map(key => (
                                    <Menu.Item
                                        key={key}
                                        onClick={() =>
                                            setLanguage(
                                                languageList[
                                                    key as keyof typeof languageList
                                                ]
                                            )
                                        }
                                    >
                                        {
                                            languageList[
                                                key as keyof typeof languageList
                                            ]
                                        }
                                    </Menu.Item>
                                ))}
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu
                            title={
                                <div className="dropdown">
                                    <p className="dropdown-text">{`Currency: ${currency} `}</p>
                                    <CaretDownOutlined />
                                </div>
                            }
                            key="Currency"
                        >
                            <MenuItemGroup>
                                {Object.keys(currencyList).map(key => (
                                    <Menu.Item
                                        key={key}
                                        onClick={() =>
                                            setCurrency(
                                                currencyList[
                                                    key as keyof typeof currencyList
                                                ]
                                            )
                                        }
                                    >
                                        {
                                            currencyList[
                                                key as keyof typeof currencyList
                                            ]
                                        }
                                    </Menu.Item>
                                ))}
                            </MenuItemGroup>
                        </SubMenu>
                        <AvatarUser />
                        <Menu.Item>
                            <LoginUser />
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    );
};
