import React, { ReactNode } from "react";
import {
    IdcardOutlined,
    AuditOutlined,
    LockOutlined,
    UnorderedListOutlined
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
        label: "My Estate"
    },
    {
        key: "/myprofile/wisheslist-estate",
        icon: <UnorderedListOutlined />,
        label: "Favorite Estates"
    },
    {
        key: "/myprofile/change-password",
        icon: <LockOutlined />,
        label: "Change Password"
    }
];
