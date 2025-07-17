"use client";

import Link from "next/link";

import { useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import Button from "@component/buttons/Button";

// STYLED COMPONENTS
import { StyledLink, SubscribeInput, SubscribeButton, SubscribeContainer } from "./styles";
// CUSTOM DATA
import { aboutLinks, customerCareLinks, iconList, partners, legalLinks } from "./data";

export default function Footer1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the subscribe action
    console.log("Subscribed with email:", email);
  };

  return (
    <footer>
      <Box style={{
        background: 'var(--Footer-Gradient, linear-gradient(94deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%))',
        backdropFilter: 'blur(4px)'
      }}>
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={5} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image alt="logo" mb="1rem" src="/assets/images/logos/mzn_logo.svg" />
                </Link>

                <Paragraph mb="1.25rem" fontSize="14px" color="gray.500" maxWidth="320px">
                  Stay updated with the latest business insights, opportunities, and services from MZN.
                </Paragraph>

                {/* <AppStore /> */}
                {/* Subscribe form */}
                <form onSubmit={handleSubmit}>
                  <SubscribeContainer>
                    <SubscribeInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubscribeButton type="submit">
                      Subscribe
                    </SubscribeButton>
                  </SubscribeContainer>
                </form>                
                  <FlexBox alignItems="center" style={{ marginTop: "6rem" }}>
                    {/* "2024" text  */}
                    <Typography color="white" fontSize="15px" fontWeight="400" mr="1rem">
                      Privacy Policy
                    </Typography>
                    <Typography color="white" fontSize="15px" fontWeight="400" mr="1rem">
                      Terms of Service
                    </Typography>
                    <Typography color="white" fontSize="15px" fontWeight="400" mr="1rem">
                      © 2025 Enterprise Journey
                    </Typography>
                    {/* Logo */}
                    {/* <Image 
                      src="/assets/images/logos/mzn_logo.svg" 
                      alt="MZN Logo"
                      width="30.156px"
                      height="12.999px"
                    /> */}
                  </FlexBox>                
              </Grid>

              <Grid item lg={2.5} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize={20} fontWeight="600">
                  Quick Links
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2.5} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize={20} fontWeight="600">
                  Get to Know Us
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography mb="1.25rem" lineHeight="1" fontSize={20} fontWeight="600">
                  Partners
                </Typography>

                <div>
                  {partners.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              {/* <Grid item lg={2} md={6} sm={6} xs={12}>
              <Typography mb="1.25rem" lineHeight="1" fontSize={20} fontWeight="600">
                Legal
                </Typography>

                <div>
                  {legalLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>

                <FlexBox className="flex" mx="-5px" style={{ marginTop: "8rem" }}>
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item.iconName}
                      rel="noreferrer noopenner">
                      <Box m="5px" p="10px" size="small" borderRadius="50%" bg="rgba(0,0,0,0.2)">
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid> */}
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
