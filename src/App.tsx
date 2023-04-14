import React, { ReactNode, useEffect } from "react";
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
import { message } from "antd";
import { RootState, useAppDispatch } from "./app/redux/store";
import {
    removeErrorNotification,
    removeSuccessNotification,
    removeWarnNotification
} from "./app/redux/reducer/NotificationSlice";
import { ContactChatPage } from "./page/ContactChatPage";
const UserAuth = (navigateComponent: ReactNode) => {
    const userToken = useSelector(getUserToken);
    const isAuth = userToken !== null;
    return isAuth ? <Navigate to={"/"} /> : navigateComponent;
};

function App() {
    const [messageApi, contextHolder] = message.useMessage();
    const { successMessage, errorMessage, warnMessage } = useSelector(
        (state: RootState) => state.notification
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (successMessage) {
            messageApi.open({
                type: "success",
                content: successMessage,
                duration: 2.5,
                onClose: () => {
                    dispatch(removeSuccessNotification());
                }
            });
        }
    }, [dispatch, messageApi, successMessage]);
    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: "error",
                content: errorMessage,
                duration: 2.5,
                onClose: () => {
                    dispatch(removeErrorNotification());
                }
            });
        }
    }, [dispatch, errorMessage, messageApi]);
    useEffect(() => {
        if (warnMessage) {
            messageApi.open({
                type: "warning",
                content: warnMessage,
                duration: 2.5,
                onClose: () => {
                    dispatch(removeWarnNotification());
                }
            });
        }
    }, [dispatch, messageApi, warnMessage]);
    return (
        <>
            {contextHolder}
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/search-page" element={<SearchProperty />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/myprofile/*" element={<SideBar />} />
                        <Route path="/upload-estate" element={<UploadPage />} />
                        <Route
                            path="/contact-page"
                            element={<ContactChatPage />}
                        />
                        <Route
                            path="/update-estate/:id"
                            element={<UploadPage />}
                        />
                    </Route>
                    <Route
                        path="/single-estate/:id"
                        element={<SingleEstate />}
                    />
                </Route>

                <Route path="/login" element={UserAuth(<LoginPage />)} />
                <Route path="/register" element={UserAuth(<Register />)} />
                <Route
                    path="/forgot-password"
                    element={UserAuth(<ForgotPassword />)}
                />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default App;
