import { Menu } from "antd";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import MenuDivider from "antd/es/menu/MenuDivider";
import { useNavigate } from "react-router-dom";
import { routesSideBar } from "../../UserProfile/SideBar/SideBar";
import { useAppDispatch } from "../../../app/redux/store";
import { getUser, logout } from "../../../app/redux/reducer/AuthSlice";
import { useSelector } from "react-redux";
import { AvatarComponent } from "./AvatarComponent";

export const AvatarUser: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { firstName = "", lastName = "", imgUser = "" } = useSelector(
        getUser
    );
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <SubMenu
            title={
                <AvatarComponent
                    imgUser={imgUser}
                    firstName={firstName}
                    lastName={lastName}
                />
            }
            key="avatar-user"
        >
            <MenuItemGroup>
                {routesSideBar.map(({ key, icon, label }) => (
                    <Menu.Item
                        key={key}
                        icon={icon}
                        className="sidebar-title"
                        onClick={() => navigate(key)}
                    >
                        {label}
                    </Menu.Item>
                ))}
                <MenuDivider />
                <Menu.Item
                    key={"user-logout"}
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Logout
                </Menu.Item>
            </MenuItemGroup>
        </SubMenu>
    );
};
