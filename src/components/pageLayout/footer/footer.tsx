import React from "react";
import "./footer.css";
import {
    RightOutlined,
    FacebookOutlined,
    InstagramOutlined,
    GithubOutlined,
    GoogleOutlined
} from "@ant-design/icons";
import logo from "../../../assets/images/logo.jpg";
const Footer: React.FC = () => {
    const ourAgencyItem = ["Services", "Insurance", "Agency", "Payment"];
    const updateItem = [
        "Updated Market",
        "Upcoming Available",
        "Local Hightlight"
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
                <img src={logo} className="footer-logo__css" alt="logo" />
                <div className="footer-from">
                    <div>Phone: 094 346 99 46</div>
                    <div>
                        Address: 9th floor, Duong Viet Building, 30 Nguyen Huu
                        Tho Street, Hai Chau District, Da Nang City
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

export default Footer;
