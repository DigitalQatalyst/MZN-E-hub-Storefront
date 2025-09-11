"use client";

import { useRouter } from "next/navigation";
import Typography from "@component/Typography";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";

export default function Dropdown({ setNotifShown, setDropShown }) {
  const router = useRouter();

  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = "rgba(75, 70, 92, 0.04)";
  };

  const handleLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const openNotifs = () => {
    setNotifShown((prev) => !prev);
    setDropShown((prev) => !prev);
  };

  const menuItems = [
    {
      itemIcon: "../images/user.svg",
      itemName: "Account settings",
      onClick: () => console.log("Account settings clicked"),
    },
    {
      itemIcon: "../images/case.svg",
      itemName: "Dashboard",
      onClick: () => router.push("/dashboard"),
    },
    {
      itemIcon: "../images/notifications_unread.svg",
      itemName: "Notifications",
      onClick: openNotifs,
    },
    {
      itemIcon: "../images/logout.svg",
      itemName: "Log out",
      onClick: () => console.log("Logout clicked"),
      isDestructive: true, // For special styling
    },
  ];

  return (
    <Card
      style={{
        boxShadow: "0 10px 20px 0 rgba(165, 163, 174, 0.40)",
        display: "flex",
        width: "240px",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "8px",
        marginTop: "92px",
        position: "absolute",
        right: "10px",
      }}
    >
      {menuItems.map((item, index) => (
        <FlexBox
          key={item.itemName}
          style={{
            display: "flex",
            padding: "10px 16px",
            alignItems: "center",
            gap: "12px",
            alignSelf: "stretch",
            cursor: "pointer",
            ...(item.isDestructive && { borderTop: "1px solid #DBDBDB" }),
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={item.onClick}
        >
          <img src={item.itemIcon} alt={`${item.itemName} icon`} />
          <Typography
            style={
              item.isDestructive ? { color: "#FE322B" } : { color: "#344054" }
            }
          >
            {item.itemName}
          </Typography>
        </FlexBox>
      ))}
    </Card>
  );
}
