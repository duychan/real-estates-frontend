import { Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export const LoginUser: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="user-button">
            <p className="user-button-p" onClick={() => navigate("/login")}>
                LOGIN
            </p>
            <Divider type="vertical" className="user-button-divider" />
            <p className="user-button-p" onClick={() => navigate("/register")}>
                SIGN UP
            </p>
        </div>
    );
};
