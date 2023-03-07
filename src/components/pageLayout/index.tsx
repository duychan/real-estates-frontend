import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./Layout.css";
import { Navbar } from "./Navbar";

const { Content } = Layout;

export const MainLayout: React.FC = () => {
    return (
        <Layout className="main-layout">
            <Navbar />
            <Content className="layout-content">
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
};
