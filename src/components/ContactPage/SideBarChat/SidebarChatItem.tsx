import { Avatar } from "antd";
import React, { useEffect } from "react";
import "./SideBarChat.css";
import { IUserInformation } from "../../../app/redux/reducer/AuthSlice/AuthSliceType";
import { useAppDispatch } from "../../../app/redux/store";
import { GetAllChatSingle } from "../../../app/redux/action/ChatContactAction";
import {
    getIdConversation,
    handleChatUserInfoOfConversationClicked
} from "../../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUser } from "../../../app/redux/reducer/AuthSlice";

interface ISidebarChatItem {
    _idEstate: string;
    coverImg: string;
    name: string;
    owner: IUserInformation;
    _idConversation: string;
    buyer: IUserInformation;
}

export const SidebarChatItemStyle = styled.div.attrs<string>(
    ({ backgroundColor }: { backgroundColor: string }) => ({
        backgroundColor: backgroundColor
    })
)`
    background-color: ${({ backgroundColor }: { backgroundColor: string }) =>
        backgroundColor};
`;

export const SidebarChatItem: React.FC<ISidebarChatItem> = ({
    coverImg = "",
    name: nameEstate = "",
    _idEstate = "",
    owner: {
        firstName = "",
        lastName = "",
        profileImage = "",
        _id: _idOwner = ""
    },
    _idConversation = "",
    buyer: {
        firstName: firstNameBuyer = "",
        lastName: lastNameBuyer = "",
        profileImage: imgBuyer = "",
        _id: idBuyer = ""
    }
}) => {
    const nameSeller = `${firstName ?? ""} ${lastName ?? ""}`;
    const dispatch = useAppDispatch();
    const conversationId = useSelector(getIdConversation);
    const navigate = useNavigate();
    const { _id: idUserAuth = "" } = useSelector(getUser);
    useEffect(() => {
        if (conversationId === _idConversation) {
            if (idUserAuth === idBuyer) {
                dispatch(
                    handleChatUserInfoOfConversationClicked({
                        chatUserInfo: {
                            profileImage: profileImage,
                            firstName: firstName,
                            lastName: lastName,
                            idUser: _idOwner
                        }
                    })
                );
            } else if (idUserAuth === _idOwner) {
                dispatch(
                    handleChatUserInfoOfConversationClicked({
                        chatUserInfo: {
                            profileImage: imgBuyer,
                            firstName: firstNameBuyer,
                            lastName: lastNameBuyer,
                            idUser: idBuyer
                        }
                    })
                );
            }

            dispatch(GetAllChatSingle(_idConversation));
        }
    }, [
        _idConversation,
        _idOwner,
        conversationId,
        dispatch,
        firstName,
        firstNameBuyer,
        idBuyer,
        idUserAuth,
        imgBuyer,
        lastName,
        lastNameBuyer,
        profileImage
    ]);

    const handleMessageChatWithOwnerByIdEstate = () => {
        navigate(`/contact-page/${_idConversation}`);
    };
    return (
        <SidebarChatItemStyle
            backgroundColor={
                conversationId === _idConversation ? "#d1d5db" : ""
            }
            className="sidebar-chatcard-item"
            onClick={handleMessageChatWithOwnerByIdEstate}
        >
            <div className="sidebar-chatcard-item-avatar">
                <Avatar
                    size={67}
                    className="sidebar-chatcard-avatar"
                    src={coverImg}
                    alt=""
                    shape="square"
                />
            </div>

            <div className="sidebar-chatcard-infor">
                <p className="sidebar-chatcard-username">{nameEstate}</p>
                <p className="sidebar-chatcard-lastmessage">{nameSeller}</p>
            </div>
        </SidebarChatItemStyle>
    );
};
