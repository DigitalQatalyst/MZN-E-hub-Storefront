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
    <footer className=" bg-blue-600 py-6 px-10">
      <div className="container mx-auto" style={{ maxWidth: "1200px", textAlign: "center" }}>
        <p className="text-white text-sm">
          © 2025 Enterprise Journey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
