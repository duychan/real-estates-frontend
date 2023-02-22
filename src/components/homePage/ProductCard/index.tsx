import React, { useEffect } from "react";
import "./ProductCard.css";
import { Card, Avatar } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import Aos from "aos";
import "aos/dist/aos.css";
import img3 from "../../../assets/images/img3.jpg";
const ProductCard: React.FC = () => {
    useEffect(() => {
        Aos.init({ duration: 1800 });
    }, []);
    return (
        <div className="product-card">
            <div className="title">
                <h1>List Product</h1>
            </div>
            <div className="product-list">
                <Card
                    hoverable
                    className="single-card"
                    cover={<img alt="example" src={img3} />}
                >
                    <div className="product-info">
                        <h3 className="product-name">Hoi An Ancient Town</h3>
                        <h4 className="product-address">
                            <EnvironmentOutlined className="icon-address" />
                            Hai Chau
                        </h4>
                    </div>
                    <div className="product-fees">
                        <div className="product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="product-price">100</div>
                    </div>
                    <div className="product-sub">
                        <div className="product-bedroom">Bedrooms: 5</div>
                        <div className="product-bathroom">Bathrooms: 5</div>
                        <div className="product-area">Size: 500m^2</div>
                    </div>
                </Card>

                <Card
                    hoverable
                    className="single-card"
                    cover={<img alt="example" src={img3} />}
                >
                    <div className="product-info">
                        <h3 className="product-name">Hoi An Ancient Town</h3>
                        <h4 className="product-address">
                            <EnvironmentOutlined className="icon-address" />
                            Hai Chau
                        </h4>
                    </div>
                    <div className="product-fees">
                        <div className="product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="product-price">100</div>
                    </div>
                    <div className="product-sub">
                        <div className="product-bedroom">Bedrooms: 5</div>
                        <div className="product-bathroom">Bathrooms: 5</div>
                        <div className="product-area">Size: 500m^2</div>
                    </div>
                </Card>
                <Card
                    hoverable
                    className="single-card"
                    cover={<img alt="example" src={img3} />}
                >
                    <div className="product-info">
                        <h3 className="product-name">Hoi An Ancient Town</h3>
                        <h4 className="product-address">
                            <EnvironmentOutlined className="icon-address" />
                            Hai Chau
                        </h4>
                    </div>
                    <div className="product-fees">
                        <div className="product-type">
                            <p>Apartment</p>
                        </div>
                        <div className="product-price">100</div>
                    </div>
                    <div className="product-sub">
                        <div className="product-bedroom">Bedrooms: 5</div>
                        <div className="product-bathroom">Bathrooms: 5</div>
                        <div className="product-area">Size: 500m^2</div>
                    </div>
                </Card>
            </div>
            <div className="view-more">
                <button className="btn">View more </button>
            </div>
        </div>
    );
};

export default ProductCard;
