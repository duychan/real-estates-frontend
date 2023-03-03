import React, { useState } from "react";
import "./navbar.css";
import { Menu, Row, Col } from "antd";
import RicciCoLogo from "../../../assets/images/RicciCoLogo-crop.png";
import {
    FacebookOutlined,
    InstagramOutlined,
    CaretDownOutlined
} from "@ant-design/icons";

export const Navbar: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const languageList = { vn: "VN", en: "EN" };
    const currencyList = { vnd: "VND", usd: "USD" };

    const [currency, setCurrency] = useState<string>(currencyList.usd);
    const [language, setLanguage] = useState<string>(languageList.en);

    return (
        <div className="nav">
            <Row justify="center" align="top">
                <Col span={3}>
                    <img src={RicciCoLogo} className="header-logo" />
                </Col>
                <Col span={16} offset={2} className="col-menu">
                    <Menu className="menu" theme="light" mode="horizontal">
                        {["Buy", "Rent", "Sell", "Contact"].map(item => (
                            <Menu.Item key={`item-${item}`}>{item}</Menu.Item>
                        ))}
                        <SubMenu
                            title={
                                <div className="dropdown">
                                    <p className="dropdown-p">{`Language: ${language}`}</p>
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
                                    <p className="dropdown-p">{`Currency: ${currency} `}</p>
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
                        <Menu.Item key="facebookLink" className="facebook-link">
                            <FacebookOutlined className="link" />
                        </Menu.Item>
                        <Menu.Item key="instagramLink">
                            <InstagramOutlined className="link" />
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    );
};
