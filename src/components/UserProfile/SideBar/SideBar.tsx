import React, { ReactNode } from "react";
import {
    IdcardOutlined,
    AuditOutlined,
    PhoneOutlined,
    LockOutlined,
    LogoutOutlined
} from "@ant-design/icons";

export interface SideBarItems {
    key: string;
    icon: ReactNode;
    label: string;
}
export const routesSideBar: SideBarItems[] = [
    {
        key: "/myprofile/user-profile",
        icon: <IdcardOutlined />,
        label: "User Profile"
    },
    {
        key: "/myprofile/history-estate",
        icon: <AuditOutlined />,
        label: "List of Estate"
    },
    {
        key: "/myprofile/contact-detail",
        icon: <PhoneOutlined />,
        label: "Contact Details"
    },
    {
        key: "/myprofile/change-password",
        icon: <LockOutlined />,
        label: "Change Password"
    }
];
