"use client";

import { Fragment } from "react";
import api from "@utils/__api__/users";

import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { EditProfileButton } from "@sections/customer-dashboard/profile";
import UserGrid from '@component/user-management-grid/UserManagementGrid';

export default async function UserManagement() {
    const user = await api.getUser();

    const infoList = [
        {
            count: "06", // Total count
            subtitle: "Funding Requests",
            approved: 3,
            pending: 2,
            declined: 1,
        },
        {
            count: "04", // Total count
            subtitle: "Active Services",
            grants: 3,
            marketAccess: 1,
        },

    ];

    return (
        <Fragment>
            <UserGrid />

        </Fragment>
    );
}
