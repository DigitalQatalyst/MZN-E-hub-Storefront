"use client";

import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Typography, { Span } from "../Typography";
import { Button } from "../buttons";
import Categories from "../categories/Categories";
import Icon from "../icon/Icon";
import NavLink from "../nav-link";

import StyledNavbar from "./marketStyles";

interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge: string;
  extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean };
// ==============================================================

export default function Navbar({ navListOpen }: NavbarProps) {
  return (
    <StyledNavbar>
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo Section */}
        <Box className="navbar-logo">
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt="MZN Enterprise Hub"
            height="40px"
          />
        </Box>

        {/* Categories Section */}
        <Categories open={navListOpen}>
          <Button width="278px" height="40px" bg="body.default" variant="text">
            <Icon>categories</Icon>
            <Typography
              ml="10px"
              flex="1 1 0"
              fontFamily='"Open Sans", sans-serif'
              fontSize="16px"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="#002180"
            >
              Explore
            </Typography>

            <Icon className="dropdown-icon" variant="small">
              chevron-right
            </Icon>
          </Button>
        </Categories>

        {/* Hardcoded Navigation Links */}
        <FlexBox style={{ gap: 32 }}>
          <NavLink className="nav-link" href="#">
            <FlexBox alignItems="center">
              <Span className="nav-link">Business in AbuDhabi</Span>
            </FlexBox>
          </NavLink>
          <NavLink className="nav-link" href="#">
            <FlexBox alignItems="center">
              <Span className="nav-link">Help Centre</Span>
            </FlexBox>
          </NavLink>
        </FlexBox>

        {/* Search Icon, Sign In, and Sign Up Buttons */}
        <FlexBox alignItems="center" style={{ gap: "15px" }}>
          {/* Search Icon (Replace with your actual SVG) */}
          <Box className="search-icon" style={{ cursor: "pointer" }}>
            <img
              src="/assets/images/logos/search.svg"
              alt="Search"
              height="24px"
            />
          </Box>

          {/* Sign In & Sign Up Buttons */}
          <Button className="sign-in-btn" variant="outlined">
            Sign In
          </Button>

          <Button className="sign-up-button" variant="contained">
            Sign Up
          </Button>
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}
