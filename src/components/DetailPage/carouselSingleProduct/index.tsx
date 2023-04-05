import React, { useState } from "react";
import "./carouselSingleProduct.css";
import { Image } from "antd";
import HeroSlider, { Slide, Nav } from "hero-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    EffectCoverflow,
    Autoplay
} from "swiper";

import "swiper/swiper.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

interface ICarouselSingleProduct {
    arrayImg: string[];
}

const CarouselSingleProduct: React.FC<ICarouselSingleProduct> = ({
    arrayImg
}) => {
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
                {arrayImg?.map((item, key) => (
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
                {arrayImg.length > 2 ? (
                    <Image.PreviewGroup>
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            effect="coverflow"
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 10,
                                modifier: 0.5,
                                slideShadows: false
                            }}
                            slidesPerView={3}
                            centeredSlides={true}
                            loop={true}
                            grabCursor={true}
                            className="list-img-swiper"
                        >
                            {arrayImg?.map((item, key) => (
                                <SwiperSlide key={`update-item-${key}`}>
                                    <Image
                                        key={`update-item-${key}`}
                                        src={item}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Image.PreviewGroup>
                ) : arrayImg.length > 0 ? (
                    <Image.PreviewGroup>
                        {arrayImg?.map((item, key) => (
                            <Image key={`update-item-${key}`} src={item} />
                        ))}
                    </Image.PreviewGroup>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default CarouselSingleProduct;
