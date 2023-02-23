import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./Layout.css";
import { Navbar } from "./Navbar";

export const MainLayout: React.FC = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="layout-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
