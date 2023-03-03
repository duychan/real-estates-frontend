import { Avatar, Menu } from "antd";
import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import MenuDivider from "antd/es/menu/MenuDivider";
import { useNavigate } from "react-router-dom";
import { routesSideBar } from "../../UserProfile/SideBar/SideBar";
export const AvatarUser: React.FC = () => {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const navigate = useNavigate();
    return (
        <SubMenu
            title={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    size={40}
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
                <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
            </MenuItemGroup>
        </SubMenu>
    );
};
