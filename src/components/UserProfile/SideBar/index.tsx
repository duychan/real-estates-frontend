import React from "react";
import "./SideBar.css";
import { Menu, Row, Col } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserInformation from "../UserInfomation";
import { routesSideBar } from "./SideBar";
import HistoryEstate from "../HistoryEstate";
import ContactDetail from "../ContactDetail";
import { ChangePassword } from "../ChangePassword";

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
                            element={<HistoryEstate />}
                        />
                        <Route
                            path="/contact-detail"
                            element={<ContactDetail />}
                        />
                        <Route
                            path="/change-password"
                            element={<ChangePassword />}
                        />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
};

export default SideBar;
