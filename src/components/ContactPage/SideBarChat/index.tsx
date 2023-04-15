import React, { useEffect, useState } from "react";
import "./SideBarChat.css";
import { useAppDispatch } from "../../../app/redux/store";
import { GetMyConversation } from "../../../app/redux/action/ChatContactAction";
import { useSelector } from "react-redux";
import { getAllMyConversation } from "../../../app/redux/reducer/ChatSlice/MyConversationSlice";
import { SidebarChatItem } from "./SidebarChatItem";
import { EmptyEstate } from "../../../common/constants";
import { SidebarSearchItem } from "./SidebarSearchItem";
import { handleIdConversationClicked } from "../../../app/redux/reducer/ChatSlice/GetAllChatSingleSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { IChatInformation } from "../../../app/redux/reducer/ChatSlice/ChatSliceType";

export const SideBarChat: React.FC = () => {
    const dispatch = useAppDispatch();
    const ListOfMyConversation = useSelector(getAllMyConversation);
    const location = useLocation();
    const locationPath = location?.pathname?.split("/") ?? [];
    const conversationId =
        locationPath.length > 0 ? locationPath[locationPath.length - 1] : "";
    const navigate = useNavigate();
    const [listAllChat, setListAllChat] = useState<IChatInformation[]>([]);
    useEffect(() => {
        setListAllChat(ListOfMyConversation);
    }, [ListOfMyConversation]);

    const ListOptionEstateSearch: string[] = [];
    const ListOptionOwnerSearch: string[] = [];

    ListOfMyConversation.length > 0
        ? ListOfMyConversation?.map(chatItem => {
              ListOptionEstateSearch?.push(chatItem.estate?.name || "");
              const nameOwner = `${chatItem.estate.owner.firstName} ${chatItem.estate.owner.lastName}`;
              if (!ListOptionOwnerSearch.includes(nameOwner)) {
                  ListOptionOwnerSearch.push(nameOwner);
              }
          })
        : [];

    useEffect(() => {
        dispatch(GetMyConversation());
    }, [dispatch]);

    useEffect(() => {
        if (conversationId === "id") {
            if (ListOfMyConversation.length > 0) {
                const firstConversation = ListOfMyConversation[0];
                const { _id: _idConversation = "" } = firstConversation;
                navigate(`/contact-page/${_idConversation}`);
                dispatch(handleIdConversationClicked(_idConversation));
            }
        } else if (conversationId !== "id") {
            if (conversationId !== "contact-page") {
                dispatch(handleIdConversationClicked(conversationId));
            }
        }
    }, [ListOfMyConversation, conversationId, dispatch, navigate]);

    return (
        <div className="sidebar-chat">
            <div className="siderbar-chat-title">
                <h1 className="siderbar-chat-h1">Messages</h1>
            </div>

            <SidebarSearchItem
                optionEstateSearch={ListOptionEstateSearch}
                optionOwnerSearch={ListOptionOwnerSearch}
                handleSearch={(valueSearch: string) => {
                    if (valueSearch !== "") {
                        setListAllChat(
                            [...ListOfMyConversation].filter(item => {
                                const nameOwner = `${item.estate.owner.firstName} ${item.estate.owner.lastName}`;
                                return (
                                    item.estate.name
                                        ?.toLowerCase()
                                        .includes(valueSearch?.toLowerCase()) ||
                                    nameOwner
                                        ?.toLowerCase()
                                        .includes(valueSearch?.toLowerCase())
                                );
                            })
                        );
                    } else {
                        setListAllChat(ListOfMyConversation);
                    }
                }}
            />
            <div className="sidebar-chatcard">
                {ListOfMyConversation.length > 0 &&
                    listAllChat?.map(
                        ({
                            _id: idConversation = "",
                            estate = EmptyEstate,
                            buyer
                        }) => {
                            if (estate !== null) {
                                const {
                                    _id: _idEstate = "",
                                    coverImg = "",
                                    name: nameEstate = "",
                                    owner
                                } = estate;
                                return (
                                    <SidebarChatItem
                                        key={idConversation}
                                        _idEstate={_idEstate}
                                        coverImg={coverImg}
                                        name={nameEstate}
                                        owner={owner}
                                        _idConversation={idConversation}
                                        buyer={buyer}
                                    />
                                );
                            }
                        }
                    )}
            </div>
        </div>
    );
};
