import { Avatar, Menu } from "antd";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import MenuDivider from "antd/es/menu/MenuDivider";
import { useNavigate } from "react-router-dom";
import { routesSideBar } from "../../UserProfile/SideBar/SideBar";
import { useAppDispatch } from "../../../app/redux/store";
import { getUser, logout } from "../../../app/redux/reducer/AuthSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AvatarNameStyle = styled.p`
    color: var(--bg1-color);
    margin: auto 0;
    line-height: 2.2;
    font-size: var(--font-sz19);
    background-color: var(--cardBG);
`;

export const AvatarUser: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { firstName, lastName, imgUser } = useSelector(getUser);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const avatarName =
        firstName && lastName
            ? firstName[0].toUpperCase() + lastName[0].toUpperCase()
            : "";

    return (
        <SubMenu
            title={
                <Avatar
                    src={
                        imgUser ? (
                            imgUser
                        ) : (
                            <AvatarNameStyle>{avatarName}</AvatarNameStyle>
                        )
                    }
                    alt=""
                    size={45}
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
                <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </MenuItemGroup>
        </SubMenu>
    );
};
