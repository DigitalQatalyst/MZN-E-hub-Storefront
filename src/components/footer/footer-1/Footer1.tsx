"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";

// STYLED COMPONENTS
import {
  StyledLink,
  SubscribeContainer,
  SubscribeInput,
  SubscribeButton,
  FooterContainer,
  ContentContainer,
  CopyrightContainer,
  IconContainer,
  SmallTag,
} from "./styles";

// CUSTOM DATA
import {
  aboutLinks,
  customerCareLinks,
  iconList,
  partners,
  legalLinks,
} from "./data";

export default function Footer1() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
  };

  return (
    <footer>
      <FooterContainer>
        <Container p="1rem">
          <ContentContainer>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Link href="/">
                  <Image
                    alt="logo"
                    mb="1rem"
                    src="/assets/images/tab_bar/Subtract.svg"
                  />
                </Link>

                <Paragraph mb="1.25rem" color="#FFFFFF" maxWidth="320px">
                  Stay updated with the latest business insights, opportunities,
                  and services from MZN.
                </Paragraph>

                <form onSubmit={handleSubmit}>
                  <SubscribeContainer>
                    <SubscribeInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubscribeButton type="submit">Subscribe</SubscribeButton>
                  </SubscribeContainer>
                </form>

                <CopyrightContainer>
                  <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginTop: "6rem", width: "100%" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledLink href="#" style={{ marginRight: "1rem" }}>
                        Privacy Policy
                      </StyledLink>
                      <StyledLink href="#" style={{ marginRight: "1rem" }}>
                        Terms of Service
                      </StyledLink>
                      <StyledLink href="#">
                        © 2025 Enterprise Journey
                      </StyledLink>
                    </div>
                  </FlexBox>
                </CopyrightContainer>
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
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

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  Get to Know Us
                </Typography>

                <div>
                  <StyledLink href="/">About Enterprise Journey</StyledLink>
                  <StyledLink href="/">
                    Updates <SmallTag>New</SmallTag>
                  </StyledLink>
                  <StyledLink href="/">Contact Us</StyledLink>
                </div>
              </Grid>

              {/* <Grid item lg={2} md={6} sm={6} xs={12}>
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
              </Grid> */}

              <Grid item lg={2} md={6} sm={6} xs={12}>
                {/* <Typography mb="1.25rem" lineHeight="1" fontSize={20} fontWeight="600">
                  Legal
                </Typography>

                <div>
                  {legalLinks.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div> */}
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize={20}
                  fontWeight="600"
                >
                  Partners
                </Typography>

                <div>
                  {partners.map((item, ind) => (
                    <StyledLink href="/" key={ind}>
                      {item}
                    </StyledLink>
                  ))}
                </div>

                <FlexBox
                  className="flex"
                  mx="-5px"
                  style={{ marginTop: "2rem" }}
                >
                  <IconContainer>
                    <img
                      src={`/assets/images/avatars/Social-icons.svg`} // Referencing the specific icon in the SVG
                      alt={"Social Icons"}
                      width="150" // Set the icon size here
                      height="150" // Set the icon size here
                    />
                  </IconContainer>
                </FlexBox>

                {/* <IconContainer>
                  <img
                    src={`/assets/images/avatars/Social-icons.svg`} // Referencing the specific icon in the SVG
                    alt={"Social Icons"}
                    width="24" // Set the icon size here
                    height="24" // Set the icon size here
                  />
                </IconContainer> */}
              </Grid>
            </Grid>
          </ContentContainer>
        </Container>
      </FooterContainer>
    </footer>
  );
}
