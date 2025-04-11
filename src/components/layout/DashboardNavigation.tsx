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
import { Button } from '@mui/material';

export default async function DashboardNavigation() {
  const pathname = usePathname();
  const user = await api.getUser();
  // const iconMap = {
  //   bag: overviewIcon,
  //   user: personalInfoIcon,
  //   bookmark: membershipIcon,
  //   sitemap: yourFirmsIcon,
  //   settings: accountSettingsIcon,
  //   "customer-service": helpSupportIcon,
  // };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing cookies, redirecting)
    console.log('Log out clicked');
  };

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900" borderRadius={8} style={{ minHeight: '600px' }}>
      {linkList.map((item) => (
        <Fragment key={item.person}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
          <FlexBox alignItems="center">
            <Avatar src={user.avatar} size={50} />
            <span style={{ marginLeft: '8px' }}>{item.person}</span> 
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

                  {/* {iconMap[item.iconName] && (
                    <img
                      src={iconMap[item.iconName]}
                      alt={item.title}
                      style={{ marginRight: '10px', verticalAlign: 'middle', width: '20px', height: '20px' }}
                    />
                  )} */}
                </div>

                <span>{item.title}</span>
              </FlexBox>

              {/* <span>{item.count}</span> */}
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
       <Button
        // fullWidth
        variant="outlined"
        sx={{
          marginTop: '10rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#0030E3',
          borderColor: '#0030E3',
          '&:hover': {
            borderColor: '#0030E3',
            backgroundColor: 'rgba(0, 48, 227, 0.08)',
          },
        }}
      >
        Log out
      </Button>
    </DashboardNavigationWrapper>
  );
}

const linkList = [
  {
    person: "Mohammed Al Mansoori",
    list: [
      { href: "/orders", title: "Overview", iconName: "bag" },
      { href: "/orders", title: "Personal Information", iconName: "user" },
      { href: "/wish-list", title: "Membership", iconName: "credit-card" },
      { href: "/support-tickets", title: "Your firms", iconName: "" },
      { href: "/support-tickets", title: "Account settings", iconName: "settings" },
      // { href: "/support-tickets", title: "Help & Support", iconName: "customer-service" }
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
