import React, { useCallback, useState } from "react";
import "./navbar.css";
import { Menu } from "antd";
import CES from "../../../assets/images/CES.png";
import { CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AvatarUser } from "./AvatarUser";
import { LoginUser } from "./LoginUser";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/redux/reducer/AuthSlice";
import { NavbarItems } from "../../../common/constants";
import { deleteCurrentUserChat } from "../../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { resetListMyConversation } from "../../../app/redux/reducer/ChatSlice/MyConversationSlice";

export const Navbar: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const languageList = { vn: "VN", en: "EN" };
    const currencyList = { vnd: "VND", usd: "USD" };
    const userToken = localStorage.getItem("loginToken");

    const [currency, setCurrency] = useState<string>(currencyList.usd);
    const [language, setLanguage] = useState<string>(languageList.en);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UserAuth = useCallback(() => {
        if (userToken !== null) {
            return <AvatarUser />;
        } else {
            dispatch(logout());
            dispatch(deleteCurrentUserChat());
            dispatch(resetListMyConversation());
            return (
                <Menu.Item>
                    <LoginUser />
                </Menu.Item>
            );
        }
    }, [dispatch, userToken]);

    return (
        <div className="nav">
            <img
                src={CES}
                className="header-logo"
                onClick={() => navigate("/")}
            />
            <div className="nav-menu">
                <Menu className="menu" theme="light" mode="horizontal">
                    {NavbarItems.map(({ label, key }) => (
                        <Menu.Item
                            key={key}
                            className="nav-text"
                            onClick={() => {
                                navigate(key);
                            }}
                        >
                            {label}
                        </Menu.Item>
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
                    <UserAuth />
                </Menu>
            </div>
        </div>
    );
};
