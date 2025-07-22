"use client";

import { useState } from "react";
import Link from "next/link";

import Box from "@component/Box";
import Hidden from "@component/hidden";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { Home, Compass, Users, Bell, MessageCircle } from "lucide-react";

export default function Section6() {
  const [activeItem, setActiveItem] = useState("My Communities");

  const navItems = [
    { label: "Home", icon: <Home size={18} />, href: "/" },
    { label: "Explore", icon: <Compass size={18} />, href: "/explore" },
    {
      label: "My Communities",
      icon: <Users size={18} />,
      href: "/community-marketplace",
    },
    {
      label: "Notifications",
      icon: <Bell size={18} />,
      href: "/notifications",
    },
    { label: "Messages", icon: <MessageCircle size={18} />, href: "/messages" },
  ];

  return (
    <Container mb="4.5rem">
      <FlexBox>
        {/* Sidebar */}
        <Hidden down={768} mr="1.75rem" ml="-4rem">
          <Box
            padding="0 1.25rem"
            bg="white"
            width="240px"
            height="50%"
            style={{
              borderRight: "1px solid #E2E8F0",
              position: "relative",
              top: "30px",
            }}
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => {
                const isActive = activeItem === item.label;
                return (
                  <Link
                    href={item.href}
                    key={i}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      padding="10px"
                      borderRadius="8px"
                      onClick={() => setActiveItem(item.label)}
                      style={{
                        backgroundColor: isActive ? "blue" : "transparent",
                        color: isActive ? "white" : "#212121",
                        fontWeight: isActive ? 600 : 500,
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        gap: "12px",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span style={{ fontSize: "14px" }}>{item.label}</span>
                    </Box>
                  </Link>
                );
              })}
            </nav>
          </Box>
        </Hidden>

        {/* Main Content */}
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70px",
          }}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <img
                src="/images/bro.png"
                alt="Empty State"
                className="w-64 h-auto"
              />
            </div>
            <div>
              <div style={{ alignSelf: "stretch" }}>
                <h2
                  style={{
                    color: "#6E6E6E",
                    textAlign: "center",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: "Helvetica Neue, sans-serif",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "20px",
                  }}
                >
                  You haven’t joined any communities yet
                </h2>
              </div>
              <div style={{ alignSelf: "stretch" }}>
                <p
                  style={{
                    color: "#6E6E6E",
                    textAlign: "center",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "20px",
                    fontFamily: "Helvetica Neue, sans-serif",
                  }}
                >
                  Discover communities that match your interests, industry, or
                  goals.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "15px 20px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  style={{
                    margin: "8px",
                    backgroundColor: "#0030E3",
                    color: "white",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    cursor: "pointer",
                    border: "none",
                    fontFamily: "Helvetica Neue, sans-serif",
                  }}
                >
                  Explore Communities
                </button>
              </div>
            </div>
          </div>
        </Box>
      </FlexBox>
    </Container>
  );
}
