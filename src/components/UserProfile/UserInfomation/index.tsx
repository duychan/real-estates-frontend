import React, { useEffect, useState } from "react";
import "./UserInformation.css";
import {
    Input,
    Form,
    Col,
    Row,
    Radio,
    Divider,
    Button,
    Upload,
    RadioChangeEvent
} from "antd";
import {
    EmailRule,
    FirstNameRule,
    IDCard,
    LastNameRule,
    PhoneNumberRule
} from "../../../common/helper/Validator";
import { getUserInfo } from "../../../app/redux/reducer/AuthSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/redux/store";
import { IUserInformation } from "../../../app/redux/reducer/AuthSlice/AuthSliceType";
import {
    IUserInformationAction,
    IUserInformationShow
} from "../../../app/redux/reducer/UpdateUserInforSlice/UpdateUserInforType";
import { UpdateUserInformationAction } from "../../../app/redux/action/UpdateUserInforAction";
import {
    getFormDataUpdate,
    setUpdateFormData
} from "../../../app/redux/reducer/UpdateUserInforSlice";
import {
    setErrorNotification,
    setSuccessNotification
} from "../../../app/redux/reducer/NotificationSlice";
import { useNavigate } from "react-router-dom";

const UserInformation: React.FC = () => {
    const { user } = useSelector(getUserInfo);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [avatarUrl, setAvatarUrl] = useState<File | undefined>();
    const [userInfor, setUserInfor] = useState<IUserInformationShow>({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        gender: user.gender
    });
    const formDataUser = useSelector(getFormDataUpdate);

    useEffect(() => {
        if (user) setUserInfor({ ...user });
    }, [user]);

    const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.files) {
            setAvatarUrl(event.target.files[0]);
            const url = URL.createObjectURL(event.target.files[0]);
            setUserInfor({
                ...userInfor,
                profileImage: url
            });
        }
    };

    const handleChangeFirstName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserInfor({
            ...userInfor,
            firstName: event.target.value
        });
    };

    const handleChangeLastName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserInfor({
            ...userInfor,
            lastName: event.target.value
        });
    };

    const handleChangePhoneNumber = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserInfor({
            ...userInfor,
            phoneNumber: event.target.value
        });
    };

    const handleChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserInfor({
            ...userInfor,
            address: event.target.value
        });
    };

    const onChangeRadio = (event: RadioChangeEvent) => {
        setUserInfor({
            ...userInfor,
            gender: event.target.value
        });
    };

    const onFinish = (query: IUserInformation) => {
        const userAction: IUserInformationAction = {
            firstName: query.firstName ?? userInfor.firstName,
            lastName: query.lastName ?? userInfor.lastName,
            address: query.address ?? userInfor.address,
            gender: query.gender ?? userInfor.gender,
            profileImage: avatarUrl,
            phoneNumber: query.phoneNumber ?? userInfor.phoneNumber
        };

        dispatch(setUpdateFormData(userAction));
        if (formDataUser.values !== null) {
            dispatch(UpdateUserInformationAction(formDataUser)).then(() => {
                dispatch(
                    setSuccessNotification(
                        "Update user information successfully!"
                    )
                );
                location.reload();
            });
        } else {
            dispatch(setErrorNotification("Error!"));
        }
    };
    return (
        <div className="user-profile">
            <h1 className="user-profile-title">Personal information</h1>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="profileImage">
                    <Col xs={{ offset: 1 }}>
                        <div className="user-profile-avatar">
                            <img
                                className="user-profile-img"
                                src={userInfor.profileImage}
                                alt=""
                                id="profile-image"
                            />
                            <div className="user-profile-input-avatar">
                                <label
                                    htmlFor="avatar-user"
                                    className="user-profile-label-img"
                                >
                                    Change your avatar
                                </label>
                                <input
                                    accept="image/*"
                                    id="avatar-user"
                                    className="user-profile-input-img"
                                    type="file"
                                    onChange={handleChangeAvatar}
                                />
                            </div>
                        </div>
                    </Col>
                </Form.Item>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Form.Item label="First Name:" name="firstName">
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input"
                                    placeholder="First Name"
                                    value={userInfor.firstName}
                                    size="large"
                                    onChange={handleChangeFirstName}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 10, offset: 2 }}>
                        <Form.Item label="Last Name:" name="lastName">
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input"
                                    placeholder="Last Name"
                                    value={userInfor.lastName}
                                    size="large"
                                    onChange={handleChangeLastName}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Form.Item label="Your Gender:" name="gender">
                            <div className="user-profile-name">
                                <Radio.Group
                                    value={userInfor.gender}
                                    onChange={onChangeRadio}
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Form.Item label="Email:" name="email">
                            <div className="user-profile-name">
                                <Input
                                    disabled
                                    className="user-profile-input"
                                    placeholder="Email"
                                    value={user.email}
                                    size="large"
                                />
                            </div>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 10, offset: 2 }}>
                        <Form.Item label="National ID:" name="nationalId">
                            <div className="user-profile-name">
                                <Input
                                    disabled
                                    placeholder="ID National"
                                    className="user-profile-input"
                                    size="large"
                                    value={user.nationalId}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }}>
                        <Form.Item label="Current Address:" name="address">
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input-address"
                                    placeholder="Current Address"
                                    size="large"
                                    value={userInfor.address}
                                    onChange={handleChangeAddress}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={{ span: 10, offset: 2 }}>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <div className="user-profile-name">
                                <Input
                                    className="user-profile-input"
                                    placeholder="Phone Number"
                                    size="large"
                                    value={userInfor.phoneNumber}
                                    onChange={handleChangePhoneNumber}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Col xs={{ offset: 1 }}>
                    <Button className="user-profile-button" htmlType="submit">
                        SAVE CHANGES
                    </Button>
                </Col>
            </Form>
        </div>
    );
};

export default UserInformation;
