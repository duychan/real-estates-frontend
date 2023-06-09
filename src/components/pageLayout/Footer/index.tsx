import React from "react";
import "./footer.css";
import {
    RightOutlined,
    FacebookOutlined,
    InstagramOutlined,
    GithubOutlined,
    GoogleOutlined
} from "@ant-design/icons";
import CES from "../../../assets/images/CES.png";
export const Footer: React.FC = () => {
    const ourAgencyItem = ["Services", "Insurance", "Agency", "Payment"];
    const updateItem = [
        "Updated Estate",
        "Upcoming Available",
        "Updated Local Hightlight"
    ];
    const companyItem = [
        "Terms of Use",
        "Privacy Policy",
        "Cookie Policy",
        "Contact Form",
        "Email Us"
    ];
    return (
        <div className="row-footer">
            <div className="col footer-logo">
                <img src={CES} className="footer-logo__css" alt="CES" />
                <div className="footer-from">
                    <div>Phone: +1 516-900-4080</div>
                    <div>
                        Address: 32-34 Nguyễn Bá Học, Bình Thuận, Hải Châu, Đà
                        Nẵng
                    </div>
                </div>
            </div>
            <div className="col">
                <ul className="about">
                    <li className="about-header">OUR AGENCY</li>
                    {ourAgencyItem.map((item, key) => (
                        <li className="about-info" key={`update-item-${key}`}>
                            <RightOutlined />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col">
                <ul className="about">
                    <li className="about-header">Updated</li>
                    {updateItem.map((item, key) => (
                        <li className="about-info" key={`update-item-${key}`}>
                            <RightOutlined />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col">
                <ul className="about">
                    <li className="about-header">COMPANY</li>
                    {companyItem.map((item, key) => (
                        <li className="about-info" key={`update-item-${key}`}>
                            <RightOutlined />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col">
                <div className="about">
                    <div className="about-header">FOLLOW US</div>
                    <a href="/" className="follow-icon">
                        <FacebookOutlined />
                    </a>
                    <a href="/" className="follow-icon">
                        <InstagramOutlined />
                    </a>
                    <a href="/" className="follow-icon">
                        <GithubOutlined />
                    </a>
                    <a href="/" className="follow-icon">
                        <GoogleOutlined />
                    </a>
                </div>
            </div>
        </div>
    );
};
