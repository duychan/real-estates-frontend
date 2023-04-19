import React, { useEffect, useRef, useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Col,
    Row,
    Button,
    UploadFile,
    FormInstance
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./InputInformation.css";
import SelecType from "../SelectType";
const { TextArea } = Input;
import {
    AreaEstateRule,
    BathRoomRule,
    BedRoomRule,
    NameEstateRule,
    PriceEstateRule,
    TypeRule
} from "../../../common/helper/Validator";
import UploadImage from "../UploadImage";
import { IEstateUpload } from "./EstateUploadType";
import { useSelector } from "react-redux";
import { getUser } from "../../../app/redux/reducer/AuthSlice";
import { ISelectOption } from "../SelectType/SelectItemType";
import { RcFile } from "antd/es/upload";
import {
    deleteUploadFormData,
    getFormData,
    isLoading,
    setUploadFormData
} from "../../../app/redux/reducer/UploadSlice";
import { useAppDispatch } from "../../../app/redux/store";
import { IUploadAction } from "../../../app/redux/reducer/UploadSlice/UploadSliceType";
import { MapNavigator } from "../MapNavigator";
import { ICoordinates } from "../MapNavigator/MapNavigateType";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";
import { UploadNewEstate } from "../../../app/redux/action/UploadEstateAction";
import {
    GetEstateById,
    GetEstateStatus
} from "../../../app/redux/action/EstateAction";
import {
    deleteEstate,
    getEstateById,
    getEstateStatus
} from "../../../app/redux/reducer/EstateSlice";
import { EmptyEstate } from "../../../common/constants";
import { UpdateMyEstate } from "../../../app/redux/action/GetMyEstateAction";

const InputInformation = () => {
    const navigate = useNavigate();
    const { _id } = useSelector(getUser);
    const [form] = Form.useForm();
    const formEstateRef = useRef<FormInstance<IEstateUpload>>();
    const dispatch = useAppDispatch();
    const formDataEstate = useSelector(getFormData);

    const isLoadingUpload = useSelector(isLoading);
    const [addressEstate, setAddressEstate] = useState<ICoordinates>({
        lat: 0,
        lng: 0
    });
    const [detailAddressEstate, setDetailAddressEstate] = useState("");
    const estateStatus = useSelector(getEstateStatus);

    const [isUploadEstate, setIsUploadEstate] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetEstateStatus());
    }, [dispatch]);
    const estateById = useSelector(getEstateById);

    const location = useLocation();
    const locationPath = location?.pathname.split("/") ?? [];
    const _idSingleEstate =
        locationPath.length > 0 ? locationPath[locationPath.length - 1] : "";
    const estate_action =
        locationPath.length > 0 ? locationPath[locationPath.length - 2] : "";

    const {
        _id: _idEstate = "",
        owner = "",
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
    } = estateById;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [estateById]);

    const listFileThumbnail = thumbnail?.map((img, idx) => {
        let originFile = new File([], "", {});
        fetch(img)
            .then(response => response.blob())
            .then(blob => {
                originFile = new File([blob], img, { type: blob.type });
            });
        const file = {
            uid: `-${idx}`,
            name: img?.split("/")[img?.split("/").length - 1],
            url: img,
            status: "done",
            originFileObj: originFile
        };
        return file;
    });

    useEffect(() => {
        dispatch(deleteUploadFormData());
        if (estate_action === "update-estate") {
            setIsUploadEstate(false);
            if (_idSingleEstate) {
                dispatch(GetEstateById(_idSingleEstate)).then(res => {
                    const _idEstateFind = res.payload.data?.records?._id || "";

                    if (_idEstateFind === "") {
                        navigate("*");
                    }
                });
            } else {
                navigate("*");
            }
        } else if (_idSingleEstate === "upload-estate") {
            dispatch(deleteEstate());
            formEstateRef.current?.resetFields();
            setIsUploadEstate(true);
        }
    }, [dispatch, _idSingleEstate, navigate, estate_action, form]);

    useEffect(() => {
        if (estateById !== EmptyEstate && estate_action === "update-estate") {
            form.setFieldsValue({ name: titleEstate });
            form.setFieldsValue({
                type: {
                    value: _idType,
                    label: nameType
                } as ISelectOption
            });
            form.setFieldsValue({ area: area });
            form.setFieldsValue({ bathRoom: bathRoom });
            form.setFieldsValue({ bedRoom: bedRoom });
            form.setFieldsValue({ price: price });
            form.setFieldsValue({ description: description });
            form.setFieldsValue({
                thumbnail: listFileThumbnail
            });
        }
    }, [
        _idType,
        area,
        bathRoom,
        bedRoom,
        description,
        estateById,
        estate_action,
        form,
        nameType,
        price,
        titleEstate
    ]);

    const onFinish = (estate: IEstateUpload) => {
        if (estate.thumbnail === undefined) {
            dispatch(
                setErrorNotification(
                    "Please choose at least one photo about your real estate!"
                )
            );
        } else if (addressEstate.lat !== 0 && addressEstate.lng !== 0) {
            const [coverImg, ...rest] = estate.thumbnail;

            const fileList = estate.thumbnail?.map(
                (file: UploadFile) => file.originFileObj as RcFile
            );
            const fileThumbnailDeleted = listFileThumbnail?.filter(
                img1 => !estate.thumbnail?.some(img2 => img1.uid === img2.uid)
            );
            const listImageRemoved = fileThumbnailDeleted?.map(img => img.url);

            const estateAction: IUploadAction = {
                owner: _id,
                name: estate.name,
                address: detailAddressEstate,
                area: estate.area,
                price: estate.price,
                currentStatus:
                    estateStatus.find(status => status.name === "Available")
                        ?._id || "",
                type: estate.type.value,
                coverImg: coverImg,
                fileList: fileList,
                bedRoom: estate.bedRoom,
                bathRoom: estate.bathRoom,
                description: estate.description ?? "",
                _id: "",
                updateAt: "",
                createAt: "",
                coordinates: addressEstate,
                imagesRemoved:
                    estate_action === "update-estate" &&
                    listImageRemoved.length !== 0
                        ? listImageRemoved
                        : null
            };

            dispatch(setUploadFormData(estateAction));

            if (formDataEstate.values !== null) {
                if (estate_action === "update-estate") {
                    dispatch(
                        UpdateMyEstate({
                            idEstate: _idEstate,
                            formData: formDataEstate
                        })
                    ).then(res => {
                        const _idEstateUpload =
                            res.payload.data?.records?._id ?? "";
                        const message = res.payload?.message ?? "";
                        if (_idEstateUpload !== "") {
                            dispatch(deleteUploadFormData());
                            navigate(`/single-estate/${_idEstateUpload}`);
                            setIsUploadEstate(false);
                        } else if (message !== "") {
                            dispatch(setErrorNotification(message));
                        }
                    });
                } else if (_idSingleEstate === "upload-estate") {
                    dispatch(UploadNewEstate(formDataEstate)).then(res => {
                        const _idEstateUpload =
                            res.payload.data?.records?._id ?? "";
                        const message = res.payload?.message ?? "";

                        if (_idEstateUpload !== "") {
                            dispatch(deleteUploadFormData());
                            navigate(`/single-estate/${_idEstateUpload}`);
                            setIsUploadEstate(false);
                        } else if (message !== "") {
                            dispatch(setErrorNotification(message));
                        }
                    });
                }
            } else {
                dispatch(setErrorNotification("Error"));
            }
        } else {
            dispatch(setErrorNotification("Please choose your location!"));
        }
    };

    return (
        <div className="input-information">
            <div className="input-information-form">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    id="uploadForm"
                    ref={
                        formEstateRef as React.MutableRefObject<
                            FormInstance<IEstateUpload>
                        >
                    }
                    autoComplete="off"
                >
                    <Form.Item
                        name="thumbnail"
                        valuePropName="fileListThumbnail"
                    >
                        <UploadImage
                            handleChangeValue={(value: UploadFile[]) => {
                                form.setFieldsValue({
                                    thumbnail: value
                                });
                            }}
                            fileListThumbnail={formEstateRef.current?.getFieldValue(
                                "fileListThumbnail"
                            )}
                        />
                    </Form.Item>
                    <h1 className="input-infomation-h1">
                        Add Infomation Estate
                    </h1>
                    <Col xs={{ span: 18 }}>
                        <Form.Item
                            label="Title:"
                            name="name"
                            rules={NameEstateRule}
                        >
                            <Input size="large" placeholder="Title of estate" />
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 6 }}>
                        <Form.Item
                            label="Type:"
                            name="type"
                            rules={TypeRule}
                            valuePropName="valueSelectType"
                        >
                            <SelecType
                                handleChangeValue={(
                                    value: ISelectOption | ISelectOption[]
                                ) => {
                                    form.setFieldsValue({
                                        type: value as ISelectOption
                                    });
                                }}
                                valueSelectType={
                                    (formEstateRef.current?.getFieldValue(
                                        "valueSelectType"
                                    ) as ISelectOption)?.value
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Row>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Area:"
                                name="area"
                                rules={AreaEstateRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    size="large"
                                    min={0}
                                    placeholder="Area of estate"
                                    formatter={value =>
                                        ` ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Bathroom:"
                                name="bathRoom"
                                rules={BathRoomRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    min={0}
                                    size="large"
                                    placeholder="Bathroom of estate"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                label="Bedroom:"
                                name="bedRoom"
                                rules={BedRoomRule}
                            >
                                <InputNumber
                                    className="input-information-number"
                                    size="large"
                                    min={0}
                                    placeholder="Bedroom of estate"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Col xs={{ span: 6 }}>
                        <Form.Item
                            label="Price:"
                            name="price"
                            rules={PriceEstateRule}
                        >
                            <InputNumber
                                min={0}
                                size="large"
                                placeholder="Price of estate"
                                addonAfter="VND"
                                formatter={value =>
                                    ` ${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Form.Item name="description" label="Description:">
                        <TextArea rows={5} />
                    </Form.Item>
                </Form>
                <p className="address-title">Address:</p>
                <MapNavigator
                    handleGetEstateLocation={(
                        address: ICoordinates,
                        addressEstate: string
                    ) => {
                        setAddressEstate(address);
                        setDetailAddressEstate(addressEstate);
                    }}
                    estateCoordinates={[
                        coordinates[0] ?? 0,
                        coordinates[1] ?? 0
                    ]}
                    isUploadEstate={isUploadEstate}
                />
                <Button
                    className="input-information-button"
                    htmlType="submit"
                    form="uploadForm"
                    loading={isLoadingUpload}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default InputInformation;
