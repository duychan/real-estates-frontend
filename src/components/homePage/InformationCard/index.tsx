import React from "react";
import "./InformationCard.css";
import { Row, Col, Button } from "antd";
import detailedImg from "../../../assets/images/detailedImg.jpg";
import styled from "styled-components";
import { IInforCard } from "./InforCardType";

export const Article = styled.div.attrs<IInforCard>(({ flexDir }) => ({
    flexDir: flexDir || ""
}))`
    flex-direction: ${({ flexDir }: { flexDir: string }) => flexDir};
`;

export const InformationCard: React.FC<IInforCard> = ({ flexDir }) => {
    return (
        <Article flexDir={flexDir ?? ""} className="row">
            <img src={detailedImg} className="info-image" />
            <div className="detail-info">
                <p className="title-news">How to buy property in VietNam</p>
                <p className="detail1">27 Nov 2022</p>
                <p className="detail1">Category: category 1</p>
                <p className="detail2">
                    This page shares my best articles to read on topics like
                    health, happiness, creativity, productivity and more. The
                    central question that drives my work is, “How can we live
                    better?” To answer that question, I like to write about
                    science-based ways to solve practical problems. This page
                    shares my best articles to read on topics like health,
                    happiness, creativity, productivity and more. The central
                    question that drives my work is, “How can we live better?”
                    To answer that question, I like to write about science-based
                    ways to solve practical problems.
                </p>
                <Button className="see-more">See more</Button>
            </div>
        </Article>
    );
};
