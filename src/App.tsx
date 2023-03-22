import React, { ReactNode } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./page/HomePage";
import { LoginPage } from "./page/Login";
import Register from "./page/Register";
import { ForgotPassword } from "./page/ForgotPassword";
import { MainLayout } from "./components/pageLayout";
import SearchProperty from "./components/SearchResultPage/SearchProperty";
import SideBar from "./components/UserProfile/SideBar/";
import { SingleEstate } from "./page/SingleEstate";
import { Page404 } from "./page/Page404";
import ProtectedRoute from "./common/ProtectedRoute";
import { useSelector } from "react-redux";
import { getUserToken } from "./app/redux/reducer/AuthSlice";
import UploadPage from "./page/UploadPage";
const UserAuth = (navigateComponent: ReactNode) => {
    const userToken = useSelector(getUserToken);
    const isAuth = userToken !== null;
    return isAuth ? <Navigate to={"/"} /> : navigateComponent;
};

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<HomePage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/search-page" element={<SearchProperty />} />
                    <Route path="/myprofile/*" element={<SideBar />} />
                    <Route path="/upload-estate" element={<UploadPage />} />
                </Route>
                <Route path="/single-estate" element={<SingleEstate />} />
            </Route>

            <Route path="/login" element={UserAuth(<LoginPage />)} />
            <Route path="/register" element={UserAuth(<Register />)} />
            <Route
                path="/forgot-password"
                element={UserAuth(<ForgotPassword />)}
            />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}

export default App;
