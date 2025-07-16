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
import navbarNavigations from "@data/navbarNavigations";

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
  const renderNestedNav = (list: any[], isRoot = false) => {
    return list?.map((nav: Nav) => {
      if (isRoot) {
        if (nav.url && nav.extLink) {
          return (
            <NavLink
              href={nav.url}
              key={nav.title}
              target="_blank"
              className="nav-link"
              rel="noopener noreferrer"
            >
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <FlexBox alignItems="center"> {/* Place the text first */}
                  <Span className="nav-link">{nav.title}</Span>
                  <img src="/assets/images/mzn_logos/dropdown.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </FlexBox>
              )}
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexBox
              className="root"
              position="relative"
              flexDirection="column"
              alignItems="center"
              key={nav.title}
            >
              {nav.badge ? (
                <Badge title={nav.badge}>{nav.title}</Badge>
              ) : (
                <FlexBox alignItems="center"> {/* Place the text first */}
                  <Span className="nav-link">{nav.title}</Span>
                  <img src="/assets/images/mzn_logos/dropdown.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </FlexBox>
              )}
              <div className="root-child">
                <Card borderRadius={8} mt="1.25rem" py="0.5rem" boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </div>
            </FlexBox>
          );
        }

        if (nav.url) {
          return (
            <NavLink className="nav-link" href={nav.url} key={nav.title}>
              {nav.badge ? (
                <Badge style={{ marginRight: "0px" }} title={nav.badge}>
                  {nav.title}
                </Badge>
              ) : (
                <FlexBox alignItems="center"> {/* Place the text first */}
                  <Span className="nav-link">{nav.title}</Span>
                  <img src="/assets/images/mzn_logos/dropdown.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </FlexBox>
              )}
            </NavLink>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                <FlexBox alignItems="center"> {/* Place the text first */}
                  <Span className="nav-link">{nav.title}</Span>
                  <img src="/assets/images/mzn_logos/dropdown.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </FlexBox>
              </MenuItem>
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <Box className="parent" position="relative" minWidth="230px" key={nav.title}>
              <MenuItem
                color="gray.700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <FlexBox alignItems="center"> {/* Place the text first */}
                  <Span className="nav-link">{nav.title}</Span>
                  <img src="/assets/images/mzn_logos/dropdown.svg" alt="Dropdown Icon" className="dropdown-icon" />
                </FlexBox>
                <Icon size="8px" defaultcolor="currentColor">
                  right-arrow
                </Icon>
              </MenuItem>

              <Box className="child" pl="0.5rem">
                <Card py="0.5rem" borderRadius={8} boxShadow="large" minWidth="230px">
                  {renderNestedNav(nav.child)}
                </Card>
              </Box>
            </Box>
          );
        }
      }
    });
  };

  return (
    <StyledNavbar>
      <Container height="100%" display="flex" alignItems="center" justifyContent="space-between">
        {/* Logo Section */}
        <Box className="navbar-logo">
          <img src="/assets/images/tab_bar/Subtract.svg" alt="MZN Enterprise Hub" height="40px" />
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
            <img src="/assets/images/logos/search.svg" alt="Search" height="24px" />
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
 
