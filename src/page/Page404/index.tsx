import React from "react";
import "./Page404.css";
import { Link } from "react-router-dom";

export const Page404: React.FC = () => {
    return (
        <div className="page404">
            <div className="page404-title">
                <h1 className="page404-h1">404</h1>
            </div>
            <div className="page404-content">
                <h2 className="page404-h2">Page not found!</h2>
                <p className="page404-p">
                    The page you are looking for is not available!
                </p>
                <Link to={"/"} className="page404-link">
                    Go to home
                </Link>
            </div>
        </div>
    );
};
