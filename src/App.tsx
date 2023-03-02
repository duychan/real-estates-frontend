import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { LoginPage } from "./page/Login";
import { ForgotPassword } from "./page/ForgotPassword";
import { MainLayout } from "./components/pageLayout";
import SearchProperty from "./components/SearchResultPage/SearchProperty";
import UserInformation from "./components/UserProfile/UserInfomation";
import SideBar from "./components/UserProfile/SideBar/";
import Register from "./page/Register";
import { SearchEstateResult } from "./components/SearchResultPage/SearchEstateResult";
function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search-page" element={<SearchProperty />} />
                <Route path="/myprofile/*" element={<SideBar />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}

export default App;
