import React, { useEffect, useState } from "react";
import "./DetailInfomation.css";
import { Button, Col, Row, Avatar } from "antd";
import { ReactComponent as BedIcon } from "../../../assets/icon/bed.svg";
import { ReactComponent as BathIcon } from "../../../assets/icon/bath.svg";
import { useAppDispatch } from "../../../app/redux/store";
import {
    HeartOutlined,
    FacebookOutlined,
    MailOutlined,
    InstagramOutlined,
    TwitterOutlined,
    UserOutlined,
    SearchOutlined,
    FullscreenExitOutlined
} from "@ant-design/icons";
import { PostWishesEstate } from "../../../app/redux/action/WishesListAction";
import { useSelector } from "react-redux";
import { getWishesEstate } from "../../../app/redux/reducer/WishesEstateSlice";
import { deleteWishes } from "../../../app/api/WishesListApi";

interface IDetailInformation {
    _id: string;
    estateName: string;
    address: string;
    type: string;
    price: string;
    bedroom: number;
    bathroom: number;
    area: string;
    nameUser: string;
}

const DetailInfomation: React.FC<IDetailInformation> = ({
    _id,
    estateName,
    address,
    type,
    price,
    bedroom,
    bathroom,
    area,
    nameUser
}) => {
    const dispatch = useAppDispatch();
    const [isLiked, setIsLiked] = useState(false);

    const { _id: idWishesList } = useSelector(getWishesEstate);
    const handleClick = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            dispatch(PostWishesEstate(_id));
            localStorage.setItem(`estate-${_id}`, true.toString());
        } else {
            deleteWishes(idWishesList);
            localStorage.removeItem(`estate-${_id}`);
        }
    };

    useEffect(() => {
        const storedEstate = localStorage.getItem(`estate-${_id}`);
        if (storedEstate) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [_id]);

    const likeStatus = <HeartOutlined className="favorite1-icon" />;
    const unLikeStatus = <HeartOutlined className="favorite-icon" />;

    return (
        <div className="detail-product">
            <div className="detail-product-content">
                <div className="product-name">
                    <h2>{estateName}</h2>
                    <div className="favorite">
                        <Button
                            className="button-favorite"
                            icon={isLiked ? likeStatus : unLikeStatus}
                            onClick={handleClick}
                        ></Button>
                        Favorite
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-address">
                        <h3>{address}</h3>
                        <h4 className="product-address-type">Type: {type}</h4>
                    </div>
                    <div className="product-fee">
                        <h1>${price}</h1>
                    </div>
                </div>
                <div className="product-share">
                    <p className="share">Share: </p>
                    <FacebookOutlined className="icon-share" />
                    <MailOutlined className="icon-share" />
                    <InstagramOutlined className="icon-share" />
                    <TwitterOutlined className="icon-share" />
                </div>
                <div className="detail-info">
                    <Row>
                        <Col xs={{ span: 8, offset: 0 }}>
                            <p className="detail-product-p">
                                <BedIcon className="icon-detail__svg" />
                                Bedroom: {bedroom}
                            </p>

                            <p className="detail-product-p">
                                <SearchOutlined className="icon-detail" />
                                Neighborhood: Near New Phuong Dong{" "}
                            </p>
                        </Col>
                        <Col
                            xs={{ span: 9, offset: 2 }}
                            lg={{ span: 6, offset: 3 }}
                        >
                            <p className="detail-product-p-area">
                                <FullscreenExitOutlined className="icon-detail" />
                                <p className="detail-product-p-area-text">
                                    Area: {area} m<sup>2</sup>
                                </p>
                            </p>
                            <p className="detail-product-p">
                                <BathIcon className="icon-detail__svg" />
                                Bathroom: {bathroom}
                            </p>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <Button type="primary" className="button-contact">
                                Contact Owner
                            </Button>
                            <Avatar
                                className="user"
                                size={50}
                                icon={<UserOutlined />}
                            />{" "}
                            {nameUser}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default DetailInfomation;
