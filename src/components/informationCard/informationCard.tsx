import React from "react";
import "./informationCard.css";
import { Row, Col, Button } from "antd";
import detailedImg from "../../assets/images/detailedImg.jpg";
import styled from "styled-components";

export const InformationCard: React.FC<{ flexDir?: string }> = ({
    flexDir
}) => {
    const Article = styled.div`
         {
            flex-direction: ${flexDir};
        }
    `;
    return (
        <div className="info-card">
            <Article className="row">
                <img src={detailedImg} className="info-image" />
                <div className="detail-info">
                    <p className="title">How to buy property in VietNam</p>
                    <p className="detail1">27 Nov 2022</p>
                    <p className="detail1">Category: category 1</p>
                    <p>
                        This page shares my best articles to read on topics like
                        health, happiness, creativity, productivity and more.
                        The central question that drives my work is, “How can we
                        live better?” To answer that question, I like to write
                        about science-based ways to solve practical problems.
                        This page shares my best articles to read on topics like
                        health, happiness, creativity, productivity and more.
                        The central question that drives my work is, “How can we
                        live better?” To answer that question, I like to write
                        about science-based ways to solve practical problems.
                    </p>
                    <Button>See more</Button>
                </div>
            </Article>

            <Row justify={"center"} align="middle" className="row-view-btn">
                <Button className="view-btn">View more</Button>
            </Row>
        </div>
    );
};
