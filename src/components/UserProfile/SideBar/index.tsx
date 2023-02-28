import React from "react";
import "./SideBar.css";
import { Menu, Row, Col } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserInformation from "../UserInfomation";
import { routesSideBar } from "./SideBar";
import {
    IdcardOutlined,
    AuditOutlined,
    PhoneOutlined,
    LockOutlined,
    LogoutOutlined
} from "@ant-design/icons";

const SideBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <Row justify={"center"}>
                <Col span={5}>
                    <Menu
                        className="sidebar-menu"
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={["/myprofile"]}
                        defaultOpenKeys={["sub1"]}
                        onClick={({ key }) => {
                            navigate(key);
                        }}
                    >
                        {routesSideBar.map(({ key, icon, label }) => (
                            <Menu.Item
                                key={key}
                                icon={icon}
                                className="sidebar-title"
                            >
                                {label}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Col>
                <Col span={14}>
                    <Routes>
                        <Route
                            path="/user-profile"
                            element={<UserInformation />}
                        />
                        <Route
                            path="/history-estate"
                            element={<div>hisorty estate</div>}
                        />
                        <Route
                            path="/contact-detail"
                            element={<div>contact</div>}
                        />
                        <Route
                            path="/change-password"
                            element={<div>change password</div>}
                        />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
};

export default SideBar;
