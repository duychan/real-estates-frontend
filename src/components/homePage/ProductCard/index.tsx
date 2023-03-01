import React, { useEffect } from "react";
import "./ProductCard.css";
import { Card, Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import area from "../../../assets/images/area.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const ProductCard: React.FC = () => {
    useEffect(() => {
        Aos.init({ duration: 1800 });
    }, []);
    return (
        <Card
            hoverable
            className="product-card-single"
            cover={<img alt="example" src={area} />}
        >
            <div className="product-card-info">
                <h3 className="product-card-name">Hoi An Ancient Town</h3>
                <p className="product-card-address">
                    <EnvironmentOutlined className="product-card-icon-address" />
                    Hai Chau
                </p>
            </div>
            <div className="product-card-fees">
                <div className="product-card-type">
                    <p>Apartment</p>
                </div>
                <div className="product-card-price">100</div>
            </div>
            <div className="product-card-sub">
                <div className="product-bedroom">Bedrooms: 5</div>
                <div className="product-bathroom">Bathrooms: 5</div>
                <div className="product-area">Size: 500m^2</div>
            </div>
        </Card>
    );
};
export default ProductCard;
