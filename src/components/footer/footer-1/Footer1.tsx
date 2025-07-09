"use client";

import Link from "next/link";
import { useState } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Typography, { Paragraph } from "@component/Typography";
import Image from "next/image";

// STYLED COMPONENTS
import { StyledLink, SubscribeInput, SubscribeButton, SubscribeContainer } from "./styles";
// CUSTOM DATA
import { quickLinks, getToKnowUs, partners } from "./data";

export default function Footer1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the subscribe action
    console.log("Subscribed with email:", email);
  };

  return (
    <footer>
      {/* Main Footer Section with Blue Gradient */}
      <Box 
        position="relative"
        overflow="hidden"
        style={{
          background: "linear-gradient(94.22deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%)"
        }}
      >
        <div style={{
          padding: "2rem",
          color: "white",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}>
          <Box pt="4rem">
            <Grid container spacing={4} alignItems="flex-start">
              {/* Left Section - Logo, Title, Description & Newsletter */}
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box mb="2rem">
                  <img src="/assets/images/tab_bar/Subtract.svg" alt="MZN Enterprise Hub" height="100%" />
                  
                  <Paragraph 
                    mb="1rem" 
                    mt={"1rem"}
                    color="rgba(255,255,255,0.8)" 
                    maxWidth="400px"
                    fontSize="14px"
                    lineHeight="1.5"
                  >
                    Stay updated with the latest business insights, opportunities, and services from Enterprise Journey.
                  </Paragraph>

                  {/* Subscribe form */}
                  <form onSubmit={handleSubmit}>
                    <Box position="relative" maxWidth="400px">
                      <SubscribeInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'white',
                          borderRadius: '12px',
                          paddingRight: '120px', // Space for button
                          paddingLeft: '16px',
                          paddingTop: '16px',
                          paddingBottom: '16px',
                          fontSize: '16px'
                        }}
                      />
                      <SubscribeButton 
                        type="submit"
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'white',
                          color: '#0030E3',
                          borderRadius: '8px',
                          fontWeight: '600',
                          border: 'none',
                          padding: '12px 20px',
                          fontSize: '14px'
                        }}
                      >
                        Subscribe
                      </SubscribeButton>
                    </Box>
                  </form>
                </Box>
              </Grid>

              {/* Right Section - Links */}
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid container spacing={3}>
                  {/* Quick Links */}
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <Typography 
                      mb="1.5rem" 
                      lineHeight="1" 
                      fontSize="14px" 
                      fontWeight="600"
                      color="white"
                    >
                      Quick Links
                    </Typography>
                    <div>
                      {quickLinks.map((item, ind) => (
                        <StyledLink 
                          href="/" 
                          key={ind}
                          style={{ 
                            color: 'rgba(255,255,255,0.8)',
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '14px'
                          }}
                        >
                          {item}
                        </StyledLink>
                      ))}
                    </div>
                  </Grid>

                  {/* Get to Know Us */}
                  <Grid item lg={4} md={4} sm={4} xs={12}>
                    <Typography 
                      mb="1.5rem" 
                      lineHeight="1" 
                      fontSize="14px" 
                      fontWeight="600"
                      color="white"
                    >
                      Get to Know Us
                    </Typography>
                    <div>
                      {getToKnowUs.map((item, ind) => (
                        <StyledLink 
                          href="/" 
                          key={ind}
                          style={{ 
                            color: 'rgba(255,255,255,0.8)',
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '14px'
                          }}
                        >
                          {item}
                          {item === "Updates" && (
                            <Box 
                              as="span" 
                              ml="0.5rem" 
                              px="0.5rem" 
                              py="0.25rem" 
                              bg="white" 
                              color="#0030E3" 
                              borderRadius="4px" 
                              fontSize="12px" 
                              fontWeight="600"
                            >
                              New
                            </Box>
                          )}
                        </StyledLink>
                      ))}
                    </div>
                  </Grid>

                  {/* Partners */}
                  <Grid item lg={4} md={4} sm={4} xs={12} style={{ marginLeft: '0rem' }}>
                    <Typography 
                      mb="1.5rem" 
                      lineHeight="1" 
                      fontSize="14px" 
                      fontWeight="600"
                      color="white"
                    >
                      Partners
                    </Typography>
                    <div>
                      {partners.map((item, ind) => (
                        <StyledLink 
                          href="/" 
                          key={ind}
                          style={{ 
                            color: 'rgba(255,255,255,0.8)',
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontSize: '14px'
                          }}
                        >
                          {item}
                        </StyledLink>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* Bottom Copyright Section */}
      <Box
        style={{
          background: "linear-gradient(94.22deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%)"
        }}
        pb="1.5rem"
      >
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          padding: "0 2rem"
        }}>
          <FlexBox 
            justifyContent="space-between" 
            alignItems="center"
            flexDirection={{ xs: "column", md: "row" }}
          >
            {/* Copyright */}
            <FlexBox alignItems="center" mb={{ xs: "1rem", md: "0" }}>
              <Typography 
                component={Link}
                href="/"
                color="#D3D4DC" 
                fontSize="14px" 
                fontWeight="600" 
                mr="1rem"
                textDecoration="none"
              >
                Privacy Policy
              </Typography>
              <Typography 
                component={Link}
                href="/"
                color="#D3D4DC" 
                fontSize="14px" 
                fontWeight="600" 
                mr="2rem"
                textDecoration="none"
              >
                Terms of Service
              </Typography>
              <Typography color="#D3D4DC" fontSize="14px">
                © 2025 Enterprise Journey
              </Typography>
            </FlexBox>

            {/* Social Media Icons */}
            <FlexBox mt={{ xs: "1rem", md: "0" }}>
              <a
                href="#"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: 'none' }}
              >
                <Box 
                  p="0.75rem" 
                  borderRadius="6px" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s ease"
                  color="#D3D4DC"
                >
                  <Icon size="20px">linkedin-brands</Icon>
                </Box>
              </a>
              
              <a
                href="#"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: 'none' }}
              >
                <Box 
                  ml="1rem"
                  p="0.75rem" 
                  borderRadius="6px" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s ease"
                  color="#D3D4DC"
                >
                  <Icon size="20px">twitter-brands</Icon>
                </Box>
              </a>
              
              <a
                href="#"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: 'none' }}
              >
                <Box 
                  ml="1rem"
                  p="0.75rem" 
                  borderRadius="6px" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s ease"
                  color="#D3D4DC"
                >
                  <Icon size="20px">youtube-brands</Icon>
                </Box>
              </a>
              
              <a
                href="#"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: 'none' }}
              >
                <Box 
                  ml="1rem"
                  p="0.75rem" 
                  borderRadius="6px" 
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s ease"
                  color="#D3D4DC"
                >
                  <Icon size="20px">instagram-brands</Icon>
                </Box>
              </a>
            </FlexBox>
          </FlexBox>
        </div>
      </Box>
    </footer>
  );
}