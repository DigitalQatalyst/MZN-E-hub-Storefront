"use client";

import api from "@utils/__api__/users";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import overviewIcon from '../../../public/assets/images/icons/Order.svg';
import personalInfoIcon from '../../../public/assets/images/icons/vector.svg';
import membershipIcon from '../../../public/assets/images/icons/card_membership.svg';
import yourFirmsIcon from '../../../public/assets/images/icons/fluent-mdl2_org.svg';
import accountSettingsIcon from '../../../public/assets/images/icons/ep_setting.svg';
import helpSupportIcon from '../../../public/assets/images/icons/help-support.png';
// STYLED COMPONENTS
import { DashboardNavigationWrapper, StyledDashboardNav } from "./styles";

export default async function DashboardNavigation() {
  const pathname = usePathname();
  const user = await api.getUser();
  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8}>
      {linkList.map((item) => (
        <Fragment key={item.person}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
          <FlexBox alignItems="center"> {/* Add FlexBox with alignItems */}
            <Avatar src={user.avatar} size={50} />
            <span style={{ marginLeft: '8px' }}>{item.person}</span> {/* Add margin for spacing */}
          </FlexBox>
          </Typography>

          {item.list.map((item) => (
            <StyledDashboardNav
              px="1.5rem"
              mb="1.25rem"
              href={item.href}
              key={item.title}
              isCurrentPath={pathname.includes(item.href)}>
              <FlexBox alignItems="center">
                <div className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </div>

                <span>{item.title}</span>
              </FlexBox>

              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
}

const linkList = [
  {
    person: "Mohammed Al Mansoori",
    list: [
      { href: "/orders", title: "Overview", iconName: "bag", count: 5 },
      { href: "/orders", title: "Personal Information", iconName: "user", count: 5 },
      { href: "/wish-list", title: "Membership", iconName: "card", count: 19 },
      { href: "/support-tickets", title: "Your firms", icon: yourFirmsIcon, count: 1 },
      { href: "/support-tickets", title: "Account settings", iconName: "settings", count: 1 },
      { href: "/support-tickets", title: "Help & Support", iconName: "customer-service", count: 1 }
    ]
  }
  // {
  //   title: "ACCOUNT SETTINGS",
  //   list: [
  //     { href: "/profile", title: "Profile Info", iconName: "user", count: 3 },
  //     { href: "/address", title: "Addresses", iconName: "pin", count: 16 },
  //     { href: "/payment-methods", title: "Payment Methods", iconName: "credit-card", count: 4 }
  //   ]
  // }
];
