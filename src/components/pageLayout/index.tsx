import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Navbar } from "./Navbar";
import "./Layout.css";

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
