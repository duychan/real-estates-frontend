import { Button, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GetAllCommentByEstate } from "../../app/redux/action/CommentAction";
import { getAllCommentByEstate } from "../../app/redux/reducer/CommentSlice/AllCommentSlice";
import {
    GetEstateById,
    GetListOfNearestEstate
} from "../../app/redux/action/EstateAction";
import {
    ListOfNearestEstate,
    getEstateById
} from "../../app/redux/reducer/EstateSlice";
import { useAppDispatch } from "../../app/redux/store";
import CarouselSingleProduct from "../../components/DetailPage/carouselSingleProduct";
import { CommentComponent } from "../../components/DetailPage/CommentComponent";
import { IComment } from "../../components/DetailPage/CommentComponent/CommentType";
import DetailInfomation from "../../components/DetailPage/DetailInfomation";
import { EstateDescription } from "../../components/DetailPage/EstateDescription";
import { EstateMap } from "../../components/DetailPage/EstateMap";
import { RelatedEstate } from "../../components/DetailPage/RelatedEstate";
import "./SingleEstate.css";
import { EstateMapPopup } from "../../components/DetailPage/EstateMap/EstateMapPopup";
import { IEstate } from "../../app/redux/reducer/SearchPageSlice/SearchPageType";
import { EmptyEstate } from "../../common/constants";
import { getEstateUpload } from "../../app/redux/reducer/UploadSlice";
import { ReactComponent as NoData } from "../../assets/icon/No-data-pana.svg";
import _pick from "lodash.pick";

const ZOOM_LEVEL = 15;

export const SingleEstate: React.FC = () => {
    const [estate, setEstate] = useState<IEstate>(EmptyEstate);
    const {
        _id: _idEstate = "",
        owner: {
            _id: _idOwner = "",
            firstName = "",
            lastName = "",
            profileImage = ""
        },
        name: titleEstate = "",
        address = "",
        area = "",
        price = "",
        type: { _id: _idType = "", name: nameType = "" },
        coverImg = "",
        thumbnail = [],
        bedRoom = 0,
        bathRoom = 0,
        description = "",
        location: { coordinates = [0, 0] }
    } = estate;
    const location = useLocation();
    const locationPath = location?.pathname?.split("/") ?? [];
    const _idSingleEstate =
        locationPath.length > 0 ? locationPath[locationPath.length - 1] : "";

    const dispatch = useAppDispatch();
    const estateById = useSelector(getEstateById);
    const estateUpload = useSelector(getEstateUpload);

    const navigate = useNavigate();
    const mapRef = useRef<L.Map>();
    const { records: listOfNearestEstate } = useSelector(ListOfNearestEstate);
    const nearestEstateData = listOfNearestEstate?.filter(
        estate => estate._id !== _idEstate
    );

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
    const nameOwner = `${firstName || ""} ${lastName || ""}`;

    useEffect(() => {
        if (
            estateUpload !== EmptyEstate &&
            _idSingleEstate === estateUpload._id
        ) {
            setEstate(estateUpload);
        } else {
            setEstate(estateById);
        }
    }, [_idSingleEstate, estateById, estateUpload]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [estate]);

    useEffect(() => {
        if (estateUpload._id !== _idSingleEstate) {
            if (_idSingleEstate) {
                dispatch(GetEstateById(_idSingleEstate)).then(res => {
                    const _idEstateFind = res.payload.data?.records?._id || "";
                    if (_idEstateFind === "") {
                        navigate("*");
                    } else {
                        setEstate(res.payload.data?.records || EmptyEstate);
                        dispatch(GetAllCommentByEstate(_idEstateFind));
                    }
                });
            } else {
                navigate("*");
            }
        }
    }, [dispatch, _idSingleEstate, navigate, estateUpload._id]);

    useEffect(() => {
        if (coordinates[0] !== 0 && coordinates[1] !== 0) {
            mapRef.current?.flyTo(
                [coordinates[1], coordinates[0]],
                ZOOM_LEVEL,
                {
                    animate: true
                }
            );
            dispatch(
                GetListOfNearestEstate({
                    longitude: String(coordinates[0]),
                    latitude: String(coordinates[1]),
                    radius: "1000"
                })
            );
        }
    }, [coordinates]);

    return (
        <div className="single-estate">
            <CarouselSingleProduct arrayImg={thumbnail} />
            <DetailInfomation
                nameType={nameType}
                nameUser={nameOwner}
                _idOwner={_idOwner}
                imgOwner={profileImage}
                {..._pick(estate, [
                    "_id",
                    "name",
                    "address",
                    "price",
                    "bedRoom",
                    "bathRoom",
                    "area"
                ])}
            />
            <EstateDescription description={description} />
            <div className="estate-map">
                <EstateMap
                    positionCenter={[coordinates[1], coordinates[0]]}
                    mapRef={mapRef}
                    estateNearCenter={nearestEstateData}
                    radius={1000}
                    popupMarker={
                        <EstateMapPopup
                            imgEstate={coverImg}
                            titleEstate={titleEstate}
                            addressEstate={address}
                        />
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
                    {nearestEstateData.length > 0 ? (
                        nearestEstateData?.slice(0, 3).map(estate => {
                            return (
                                <RelatedEstate
                                    key={estate._id}
                                    width="27%"
                                    {..._pick(estate, [
                                        "_id",
                                        "name",
                                        "address",
                                        "bedRoom",
                                        "bathRoom",
                                        "area",
                                        "coverImg"
                                    ])}
                                />
                            );
                        })
                    ) : (
                        <div className="search-result-no-data">
                            <NoData className="search-result-no-data-img" />
                            <p className="search-result-empty-content">
                                No real estate is found
                            </p>
                        </div>
                    )}
                </div>
                {nearestEstateData.length > 3 && (
                    <Row
                        justify={"center"}
                        align="middle"
                        className="row-view-btn"
                    >
                        <Button
                            className="view-btn"
                            onClick={() => navigate("/search-page")}
                        >
                            View more
                        </Button>
                    </Row>
                )}
            </div>
        </div>
    );
};
