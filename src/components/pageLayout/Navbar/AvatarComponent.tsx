import { Avatar } from "antd";
import React from "react";
import styled from "styled-components";

const AvatarNameStyle = styled.p`
    color: var(--bg1-color);
    margin: auto 0;
    line-height: 2.2;
    font-size: var(--font-sz19);
    background-color: var(--cardBG);
`;

interface IAvatarComponent {
    imgUser: string;
    firstName: string;
    lastName: string;
}

export const AvatarComponent: React.FC<IAvatarComponent> = ({
    imgUser = "",
    firstName = "",
    lastName = ""
}) => {
    const avatarName =
        firstName &&
        lastName &&
        firstName[0]?.toUpperCase() + lastName[0]?.toUpperCase();
    return (
        <Avatar
            src={
                imgUser ? (
                    imgUser
                ) : (
                    <AvatarNameStyle>{avatarName}</AvatarNameStyle>
                )
            }
            alt=""
            size={45}
        />
    );
};
