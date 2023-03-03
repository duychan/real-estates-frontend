import { Button, Row } from "antd";
import React from "react";
import CarouselSingleProduct from "../../components/DetailPage/carouselSingleProduct";
import { CommentComponent } from "../../components/DetailPage/CommentComponent";
import DetailInfomation from "../../components/DetailPage/DetailInfomation";
import { EstateDescription } from "../../components/DetailPage/EstateDescription";
import { EstateMap } from "../../components/DetailPage/EstateMap";
import { RelatedEstate } from "../../components/DetailPage/RelatedEstate";
import "./SingleEstate.css";

export const SingleEstate: React.FC = () => {
    const estateAddressLatLng: [number, number] = [16.0546935, 108.2207096];
    const estateNearCenter: [number, number][] = [
        [16.054503453397675, 108.22082692238062],
        [16.05440734647295, 108.22072808797749],
        [16.055061458754004, 108.22120724717237],
        [16.054698781983102, 108.22100287279979],
        [16.05506010920506, 108.22075202999645],
        [16.05560081672723, 108.22085814338341],
        [16.055479588302024, 108.21860473103041]
    ];
    return (
        <div className="single-estate">
            <CarouselSingleProduct />
            <DetailInfomation />
            <EstateDescription />
            <EstateMap
                positionCenter={estateAddressLatLng}
                estateNearCenter={estateNearCenter}
                radius={100}
            />

            <div className="single-estate-comment">
                <h1 className="related-estate-title">Comment</h1>
                <CommentComponent />
            </div>

            <div className="related-estate">
                <h1 className="related-estate-title">Related Estate</h1>
                <div className="related-estate-list">
                    <RelatedEstate width="27%" />
                    <RelatedEstate width="27%" />
                    <RelatedEstate width="27%" />
                </div>
                <Row justify={"center"} align="middle" className="row-view-btn">
                    <Button className="view-btn">View more</Button>
                </Row>
            </div>
        </div>
    );
};
