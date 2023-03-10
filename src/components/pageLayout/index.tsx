import { Layout } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProfile } from "../../app/redux/action/AuthAction";
import { getUser } from "../../app/redux/reducer/AuthSlice";
import { useAppDispatch } from "../../app/redux/store";
import Footer from "./Footer";
import "./Layout.css";
import { Navbar } from "./Navbar";

const { Content } = Layout;

export const MainLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const userToken = localStorage.getItem("loginToken");
    const { _id } = useSelector(getUser);

    useEffect(() => {
        if (_id === "" && userToken !== null) {
            dispatch(UserProfile());
        }
    }, [dispatch, _id, userToken]);
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
