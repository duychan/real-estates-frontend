import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { LoginPage } from "./page/Login";
import Register from "./page/Register";
import { ForgotPassword } from "./page/ForgotPassword";
import { MainLayout } from "./components/pageLayout";
import SearchProperty from "./components/SearchResultPage/SearchProperty";
function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search-page" element={<SearchProperty />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}

export default App;
