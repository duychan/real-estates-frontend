import React, { useEffect, useState } from "react";
import "./DetailInfomation.css";
import { Button, Col, Row, Avatar } from "antd";
import { ReactComponent as BedIcon } from "../../../assets/icon/bed.svg";
import { ReactComponent as BathIcon } from "../../../assets/icon/bath.svg";
import { useNavigate } from "react-router-dom";
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
import { useConvertPriceEstate } from "../../../common/hooks/PriceEstate";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import {
    CreateNewContact,
    GetMyConversation
} from "../../../app/redux/action/ChatContactAction";
import {
    setErrorNotification,
    setWarnNotification
} from "../../../app/redux/reducer/NotificationSlice";

interface IDetailInformation {
    _id: string;
    name: string;
    address: string;
    nameType: string;
    price: string;
    bedRoom: number;
    bathRoom: number;
    area: string;
    nameUser: string;
    _idOwner: string;
}

const DetailInfomation: React.FC<IDetailInformation> = ({
    _id: _idEstate = "",
    name: titleEstate = "",
    address = "",
    nameType = "",
    price = "",
    bedRoom = "",
    bathRoom = "",
    area = "",
    nameUser = "",
    _idOwner = ""
}) => {
    const dispatch = useAppDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const { _id: idWishesList } = useSelector(getWishesEstate);
    const { _id: idUser } = useSelector(getUser);
    const handleClick = () => {
        if (idUser !== "") {
            setIsLiked(!isLiked);
            if (!isLiked) {
                dispatch(PostWishesEstate(_idEstate));
                localStorage.setItem(`estate-${_idEstate}`, true.toString());
            } else {
                deleteWishes(idWishesList);
                localStorage.removeItem(`estate-${_idEstate}`);
            }
        } else {
            dispatch(setWarnNotification("Please login to use this feature!"));
        }
    };

    useEffect(() => {
        const storedEstate = localStorage.getItem(`estate-${_idEstate}`);
        if (storedEstate) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [_idEstate]);

    const likeStatus = <HeartOutlined className="favorite1-icon" />;
    const unLikeStatus = <HeartOutlined className="favorite-icon" />;
    const { _id: idOwner } = useSelector(getUser);

    const handleClickContactOwner = () => {
        dispatch(CreateNewContact(_idEstate)).then(response => {
            const isCreated = response.payload?.data?.record?.isNew;
            const message = response.payload?.message || "";
            let conversationId = "";

            if (isCreated) {
                conversationId =
                    response.payload?.data?.record?.conversationId._id || "";
                navigate(`/contact-page/${conversationId}`);
            } else {
                conversationId =
                    response.payload?.data?.record?.conversationId || "";
                navigate(`/contact-page/${conversationId}`);
            }
        });
    };

    return (
        <div className="detail-product">
            <div className="detail-product-content">
                <div className="product-name">
                    <h2>{titleEstate}</h2>
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
                        <h4 className="product-address-type">
                            Type: {nameType}
                        </h4>
                    </div>
                    <div className="product-fee">
                        <h1 className="product-fee-price">
                            {useConvertPriceEstate(price)}
                        </h1>
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
                                Bedroom: {bedRoom}
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
                                Bathroom: {bathRoom}
                            </p>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            {_idOwner !== idOwner && (
                                <Button
                                    type="primary"
                                    className="button-contact"
                                    onClick={handleClickContactOwner}
                                >
                                    Contact Owner
                                </Button>
                            )}
                            <div className="detail-owner">
                                <Avatar
                                    className="user"
                                    size={50}
                                    icon={<UserOutlined />}
                                />
                                <p className="detail-owner-name">{nameUser}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default DetailInfomation;
