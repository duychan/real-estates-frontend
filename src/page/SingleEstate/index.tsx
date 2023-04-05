import { Button, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GetUserById } from "../../app/redux/action/AuthAction";
import { GetAllCommentByEstate } from "../../app/redux/action/CommentAction";
import { GetEstateById } from "../../app/redux/action/EstateAction";
import { getAllCommentByEstate } from "../../app/redux/reducer/CommentSlice/AllCommentSlice";
import { getEstateById } from "../../app/redux/reducer/EstateSlice";
import { getUserById } from "../../app/redux/reducer/UserSlice";
import { useAppDispatch } from "../../app/redux/store";
import CarouselSingleProduct from "../../components/DetailPage/carouselSingleProduct";
import { CommentComponent } from "../../components/DetailPage/CommentComponent";
import { IComment } from "../../components/DetailPage/CommentComponent/CommentType";
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

    const location = useLocation();
    const locationPath = location?.pathname.split("/") ?? [];
    const _idSingleEstate =
        locationPath.length > 0 ? locationPath[locationPath.length - 1] : "";

    const dispatch = useAppDispatch();
    const {
        _id: _idEstate,
        name: titleEstate,
        address,
        area,
        price,
        type: { _id: _idType, name: nameType },
        coverImg,
        thumbnail,
        bedRoom,
        bathRoom,
        description
    } = useSelector(getEstateById);
    const { firstName, lastName } = useSelector(getUserById);
    const navigate = useNavigate();

    const ListCommentByEstate = useSelector(getAllCommentByEstate);
    const commentList: IComment[] = ListCommentByEstate.map(
        ({ _id, author, content, estate, createdAt, updatedAt, isEdit }) => {
            return {
                _id,
                content,
                commentTime: updatedAt,
                author,
                avatar: "",
                isEdit: createdAt !== updatedAt
            };
        }
    );

    const nameOwner = firstName && lastName ? `${firstName} ${lastName}` : "";

    useEffect(() => {
        if (_idSingleEstate) {
            dispatch(GetEstateById(_idSingleEstate)).then(res => {
                const _idEstateFind = res.payload.data?.records?._id || "";
                const _idOwner = res.payload.data?.records?.owner || "";
                if (_idEstateFind === "") {
                    navigate("*");
                } else {
                    dispatch(GetUserById(_idOwner));
                    dispatch(GetAllCommentByEstate(_idEstateFind));
                }
            });
        } else {
            navigate("*");
        }
    }, [dispatch, _idSingleEstate, navigate]);

    return (
        <div className="single-estate">
            <CarouselSingleProduct arrayImg={thumbnail} />
            <DetailInfomation
                _id={_idEstate}
                estateName={titleEstate}
                address={address}
                type={nameType}
                price={price}
                bedroom={bedRoom}
                bathroom={bathRoom}
                area={area}
                nameUser={nameOwner}
            />
            <EstateDescription description={description} />
            <div className="estate-map">
                <EstateMap
                    positionCenter={estateAddressLatLng}
                    estateNearCenter={estateNearCenter}
                    radius={100}
                    popupMarker={
                        <div>
                            Latitude: ${estateAddressLatLng[0]} <br />{" "}
                            Longitude: ${estateAddressLatLng[1]}
                        </div>
                    }
                />
            </div>

            <div className="single-estate-comment">
                <h1 className="related-estate-title">Comment</h1>
                <CommentComponent commentList={commentList} />
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
