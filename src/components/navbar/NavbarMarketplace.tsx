"use client";
 
import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";
 
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
      <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
        {/* Logo and Categories Section */}
        <FlexBox alignItems="center" style={{ gap: "25px" }}>
          <Box className="navbar-logo">
            <img src="/assets/images/tab_bar/Subtract.svg" alt="MZN Enterprise Hub" height="35px" />
          </Box>
          <Categories open={navListOpen}>
            <Button width="280px" height="35px" bg="body.default" variant="text" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px" }}>
              <FlexBox alignItems="center">
                <Icon>categories</Icon>
                <Typography
                  ml="4px"
                  flex="0 0 auto"
                  fontFamily='"Open Sans", sans-serif'
                  fontSize="14px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="22px"
                  color="#002180"
                >
                  Explore
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">
                chevron-right
              </Icon>
            </Button>
          </Categories>
        </FlexBox>

        {/* Navigation Links and Right-Side Elements */}
        <FlexBox alignItems="center" style={{ gap: "20px" }}>
          <FlexBox style={{ gap: 16 }}>
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
          <FlexBox alignItems="center" style={{ gap: "20px" }}>
            <Box className="search-icon" style={{ cursor: "pointer" }}>
              <img src="/assets/images/logos/search.svg" alt="Search" height="24px" />
            </Box>
            <Button className="sign-in-btn" variant="outlined">
              Sign In
            </Button>
            <Button className="sign-up-button" variant="contained">
              Sign Up
            </Button>
          </FlexBox>
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}
 
