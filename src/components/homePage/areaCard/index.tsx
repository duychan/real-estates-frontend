import React from "react";
import "./areaCard.css";
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
import { IAreaSlider } from "./AreaCardType";
import { AreaCard } from "./AreaCard";
import { AreaList } from "../../../common/constants";

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

export const AreaSlider: React.FC<IAreaSlider> = ({ arrayArea }) => {
    return (
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
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                reverseDirection: false
            }}
            grabCursor={true}
            className="area-swiper"
        >
            {arrayArea &&
                arrayArea?.map(({ code, name }, _index) => (
                    <SwiperSlide key={code}>
                        <AreaCard
                            key={code}
                            width="90%"
                            height="400px"
                            imageCard={AreaList[_index]}
                            contentCard={name}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
    );
};
