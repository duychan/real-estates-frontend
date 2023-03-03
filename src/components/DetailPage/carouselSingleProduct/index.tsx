import React, { useState } from "react";
import "./carouselSingleProduct.css";
import { Image } from "antd";
import HeroSlider, { Slide, Nav } from "hero-slider";

const arrImg: string[] = [
    "https://i.imgur.com/PWYw2wn.jpg",
    "https://i.imgur.com/jxtxPMu.jpg",
    "https://i.imgur.com/jEdUeMb.jpg",
    "https://i.imgur.com/vZKOfl1.jpg"
];

const CarouselSingleProduct: React.FC = () => {
    return (
        <div className="carousel-product">
            <HeroSlider
                height="75vh"
                autoplay
                controller={{
                    initialSlide: 1,
                    slidingDuration: 500,
                    slidingDelay: 100
                }}
            >
                {arrImg.map((item, key) => (
                    <Slide
                        key={`update-item-${key}`}
                        background={{
                            backgroundImageSrc: item
                        }}
                    />
                ))}

                <Nav />
            </HeroSlider>
            <div className="list-img">
                <Image.PreviewGroup>
                    {arrImg.map((item, key) => (
                        <Image key={`update-item-${key}`} src={item} />
                    ))}
                </Image.PreviewGroup>
            </div>
        </div>
    );
};

export default CarouselSingleProduct;
