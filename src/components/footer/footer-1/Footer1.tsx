"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { Paragraph } from "@component/Typography";

// STYLED COMPONENTS
import { StyledLink, SubscribeInput, SubscribeButton } from "./styles";

// IMPORT FOOTER DATA
import { footerData, socialMediaLinks } from "./data";

export default function Footer1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the subscribe action
    console.log("Subscribed with email:", email);
    // Reset form after submission
    setEmail("");
  };

  // Render a footer column with links and optional badges
  const renderFooterColumn = (columnKey: string, columnData: any) => (
    <Grid item lg={2.4} md={4} sm={6} xs={12} key={columnKey}>
      <Typography
        mb="1.5rem"
        lineHeight="1"
        fontSize="16px"
        fontWeight="600"
        color="white"
      >
        {columnData.title}
      </Typography>
      <div>
        {columnData.links.map((linkItem: any, index: number) => (
          <StyledLink
            href={linkItem.url}
            key={index}
            style={{
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              marginBottom: "0.75rem",
              fontSize: "16px",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            <span>{linkItem.name}</span>

            {/* Add arrow icon for social media links */}
            {linkItem.showArrow && (
              <ArrowUpRight
                size={16}
                style={{
                  marginLeft: "0.5rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              />
            )}

            {/* Add badge if present */}
            {linkItem.badge && (
              <Box
                as="span"
                ml="0.5rem"
                px="0.5rem"
                py="0.25rem"
                style={{
                  backgroundColor: "white",
                  color: "#0030E3",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {linkItem.badge}
              </Box>
            )}
          </StyledLink>
        ))}
      </div>
    </Grid>
  );

  return (
    <footer>
      {/* Main Footer Section with Blue Gradient */}
      <Box
        position="relative"
        overflow="hidden"
        style={{
          background:
            "linear-gradient(94.22deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%)",
        }}
      >
        <div
          style={{
            color: "white",
            margin: "0 auto",
            width: "100%",
            padding: "0 5rem",
          }}
        >
          {/* Header Section - Logo, Description & Newsletter */}
          <Box pt="4rem" pb="3rem">
            {/* Logo Section */}
            <Box mb="2rem">
              <img
                src="/assets/images/tab_bar/Subtract.svg"
                alt="MZN Enterprise Hub"
                height="100%"
                width="240rem"
              />
            </Box>

            {/* Description and Newsletter Section */}
            <FlexBox
              justifyContent="space-between"
              alignItems="flex-start"
              flexDirection={{ xs: "column", lg: "row" }}
            >
              {/* Left Section - Description */}
              <Box
                style={{
                  maxWidth: "500px",
                  marginRight: "2rem",
                  marginBottom: "0",
                }}
              >
                <Paragraph
                  color="rgba(255,255,255,0.8)"
                  fontSize="16px"
                  lineHeight="1.6"
                >
                  Stay updated with the latest business insights, opportunities,
                  and services from Enterprise Journey.
                </Paragraph>
              </Box>

              {/* Right Section - Newsletter Subscription */}
              <Box width={{ xs: "100%", lg: "400px" }}>
                <form onSubmit={handleSubmit}>
                  <Box position="relative">
                    <SubscribeInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: "12px",
                        padding: "14px 120px 14px 16px",
                        fontSize: "16px",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                    />
                    <SubscribeButton
                      type="submit"
                      style={{
                        position: "absolute",
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "white",
                        color: "#0030E3",
                        borderRadius: "8px",
                        fontWeight: "600",
                        border: "none",
                        padding: "10px 20px",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-50%) scale(1.02)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-50%) scale(1)";
                      }}
                    >
                      Subscribe
                    </SubscribeButton>
                  </Box>
                </form>
              </Box>
            </FlexBox>
          </Box>

          {/* Horizontal Separator Line */}
          <Box
            style={{
              height: "4px",
              backgroundColor: "#5088FF",
              marginBottom: "3rem",
              borderRadius: "4px",
            }}
          />

          {/* Links Section - 5 Columns */}
          <Box pb="3rem">
            <FlexBox
              justifyContent="space-between"
              alignItems="flex-start"
              flexDirection={{ xs: "column", lg: "row" }}
            >
              {Object.entries(footerData).map(([key, data], index) => (
                <Box
                  key={key}
                  width={{ xs: "100%", lg: "auto" }}
                  mb={{ xs: "2rem", lg: "0" }}
                  minWidth={{ lg: "180px" }}
                >
                  <Typography
                    mb="1.5rem"
                    lineHeight="1"
                    fontSize="16px"
                    fontWeight="600"
                    color="white"
                  >
                    {data.title}
                  </Typography>
                  <div>
                    {data.links.map((linkItem: any, linkIndex: number) => (
                      <StyledLink
                        href={linkItem.url}
                        key={linkIndex}
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                          fontSize: "16px",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                      >
                        <span>{linkItem.name}</span>

                        {/* Add arrow icon for social media links */}
                        {linkItem.showArrow && (
                          <ArrowUpRight
                            size={16}
                            style={{
                              marginLeft: "0.5rem",
                              color: "rgba(255,255,255,0.8)",
                            }}
                          />
                        )}

                        {/* Add badge if present */}
                        {linkItem.badge && (
                          <Box
                            as="span"
                            ml="0.5rem"
                            px="0.5rem"
                            py="0.25rem"
                            style={{
                              backgroundColor: "white",
                              color: "#0030E3",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            {linkItem.badge}
                          </Box>
                        )}
                      </StyledLink>
                    ))}
                  </div>
                </Box>
              ))}
            </FlexBox>
          </Box>
        </div>
      </Box>

      {/* Bottom Copyright Section */}
      <Box
        style={{
          background:
            "linear-gradient(94.22deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%)",
        }}
        pb="2rem"
      >
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            padding: "0 2rem",
          }}
        >
          <FlexBox justifyContent="center" alignItems="center">
            <Typography
              color="rgba(255,255,255,0.7)"
              fontSize="14px"
              textAlign="center"
            >
              © 2025 Enterprise Journey. All rights reserved.
            </Typography>
          </FlexBox>
        </div>
      </Box>
    </footer>
  );
}
