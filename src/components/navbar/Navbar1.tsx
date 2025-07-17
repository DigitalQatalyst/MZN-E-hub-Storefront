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
import JoinModal from "../JoinModal";
import SignInModal from "../SignInModal";

import StyledNavbar from "./styles";
import { useModal } from "@context/ModalContext";
import SignUpModal from "../JoinModal";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

// Updated navbarNavigations data
const navbarNavigations = [
  {
    title: "Business in AbuDhabi",
    url: "/business-abudhabi",
    extLink: false,
  },
  {
    title: "Help center",
    url: "/help-center",
    extLink: false,
  },
];

// ============================================================== 
interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge?: string;
  extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean };
// ==============================================================

export default function Navbar({ navListOpen }: NavbarProps) {
  const { open, modalType } = useModal();
  const { instance, accounts } = useMsal();

  function handleLogin() {
    instance.loginRedirect().catch((e) => {
      console.log(e);
    });
  }

  function handleLogout() {
    instance.logoutRedirect().catch((e) => {
      console.log(e);
    });
  }

  if (accounts.length > 0) {
    console.log("accounts", accounts);
  }

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
                <Span className="nav-link">{nav.title}</Span>
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
                <FlexBox alignItems="center">
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
                <Span className="nav-link">{nav.title}</Span>
              )}
            </NavLink>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>
                <Span className="nav-link">{nav.title}</Span>
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
                <FlexBox alignItems="center">
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
      <Container height="100%" display="flex" paddingTop="20px" alignItems="center" justifyContent="space-between">
        {/* Logo Section */}
        <Box className="navbar-logo">
          <img src="/assets/images/logos/mzn_logo.svg" alt="MZN Enterprise Hub" height="40px" />
        </Box>

        {/* Spacer to add gap between logo and categories */}
        <Box ml="32px" />

        {/* Categories Section (Explore) */}
        <Categories open={navListOpen}>
          <Button width="278px" height="40px" bg="body.default" variant="text">
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon>categories</Icon>
                <Typography
                  ml="5px"
                  fontFamily='"Open Sans", sans-serif'
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="26px"
                  color="#002180"
                >
                  Explore
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">
                chevron-down
              </Icon>
            </FlexBox>
          </Button>
        </Categories>

        {/* Navigation Links and Sign In/Sign Up Buttons */}
        <FlexBox alignItems="center" style={{ gap: "15px", marginLeft: "auto" }}>
          {/* Navigation Links */}
          <FlexBox style={{ gap: 32 }}>
            {renderNestedNav(navbarNavigations, true)}
          </FlexBox>

          {/* Search Icon */}
          <Box className="search-icon" style={{ cursor: "pointer" }} ml="15px" mr="15px">
            <img src="/assets/images/logos/search.svg" alt="Search" height="14px" />
          </Box>

          {/* Sign In & Sign Up Buttons */}
          <AuthenticatedTemplate>
            <Button className="sign-in-btn" variant="outlined" mr="10px" ml="10px" onClick={handleLogout}>Logout</Button>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button className="sign-in-btn" variant="outlined" mr="10px" ml="10px" onClick={handleLogin}>Sign In</Button>
            <Button className="sign-up-button" variant="contained" onClick={() => open("signup")}>Sign Up</Button>
          </UnauthenticatedTemplate>
          {modalType === "signup" && <SignUpModal />}
          {modalType === "signin" && <SignInModal />}
        </FlexBox>
      </Container>
    </StyledNavbar>
  );
}