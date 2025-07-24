"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import styled from "styled-components";

// Updated navbarNavigations data
const navbarNavigations = [
  {
    title: "Discover AbuDhabi",
    url: "/development",
    extLink: false,
  },
  {
    title: "Help Centre",
    url: "/faq",
    extLink: false,
  },
];

// Responsive Styled Components
const ResponsiveNavbar = styled(StyledNavbar)`
  position: relative;
  z-index: 1000;
  
  /* Desktop styles - default (1200px and above) */
  .navbar-container {
    max-width: 1440px;
    padding-top: 17px;
    width: 100%;
  }
  .navbar-logo {
    min-width: 140px;
  }
  .sign-up-button {
    min-width: 100px;
  }
  .logo-categories-gap {
    margin-left: 16px;
  }
  .mobile-menu-toggle {
    display: none;
  }
  .desktop-nav {
    display: flex;
  }
  .mobile-nav {
    display: none;
  }
  
  /* Large Desktop (1440px and above) */
  @media (min-width: 1440px) {
    
    .logo-categories-gap {
      margin-left: 20px;
    }
  }
  
  /* Standard Desktop (1200px - 1439px) */
  @media (min-width: 1200px) and (max-width: 1439px) {
    
    .logo-categories-gap {
      margin-left: 16px;
    }
  }
  
  /* Medium Desktop/Laptop (1024px - 1199px) */
  @media (min-width: 1024px) and (max-width: 1199px) {
    
    
  }
  
  /* Tablet styles (769px - 1023px) */
  @media (min-width: 769px) and (max-width: 1023px) {
    .navbar-container {
      padding-left: 0px;
      padding-right: 0px;
    }
    
    .navbar-logo {
      min-width: 120px;
    }
    .sign-up-button {
      min-width: 90px;
    }
  }
  
  /* Mobile styles (<= 768px) */
  @media (max-width: 768px) {
    .navbar-container {
      padding-left: 0px;
      padding-right: 0px;
    }
    
    .navbar-logo {
      min-width: 100px;
    }
    .sign-up-button {
      min-width: 80px;
    }
    .desktop-nav {
      display: none;
    }
    .mobile-nav {
      display: flex;
    }
    .mobile-menu-toggle {
      display: flex !important;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
  }
  
  /* Small mobile styles (<= 480px) */
  @media (max-width: 480px) {
    .navbar-container {
      padding-left: 0px;
      padding-right: 0px;
    }
    .logo-categories-gap {
      margin-left: 2px;
    }
    .navbar-logo {
      min-width: 80px;
    }
    .sign-up-button {
      min-width: 60px;
    }
  }
`;

const MobileNavOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MobileNavMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 1000;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: 85%;
    max-width: 280px;
  }
  
  @media (max-width: 360px) {
    width: 90%;
    max-width: 260px;
  }
`;

const MobileNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f8f9fa;
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const MobileNavContent = styled.div`
  padding: 20px;
  
  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const MobileNavSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const MobileNavTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #002180;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  
  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`;

const MobileNavItem = styled.div`
  margin-bottom: 12px;
  
  a {
    display: block;
    padding: 12px 0;
    color: #374151;
    text-decoration: none;
    font-size: 15px;
    border-bottom: 1px solid #f3f4f6;
    transition: color 0.3s ease;
    
    &:hover {
      color: #002180;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
      padding: 10px 0;
    }
  }
`;

const MobileAuthSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  
  .mobile-auth-button {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    text-align: center;
    transition: all 0.3s ease;
    
    @media (max-width: 480px) {
      padding: 10px;
      font-size: 13px;
    }
  }
  
  .mobile-sign-in {
    background: transparent;
    color: #002180;
    border: 2px solid #002180;
    
    &:hover {
      background: #002180;
      color: white;
    }
  }
  
  .mobile-sign-up {
    background: #002180;
    color: white;
    border: 2px solid #002180;
    
    &:hover {
      background: #001a6b;
      border-color: #001a6b;
    }
  }
  
  .mobile-logout {
    background: #dc3545;
    color: white;
    border: 2px solid #dc3545;
    
    &:hover {
      background: #c82333;
      border-color: #c82333;
    }
  }
  
  .mobile-profile {
    background: #f8f9fa;
    color: #002180;
    border: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
      background: #e9ecef;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #6b7280;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(107, 114, 128, 0.1);
    color: #374151;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open, modalType } = useModal();
  const { instance, accounts } = useMsal();
  const router = useRouter();

  function handleLogin() {
    instance.loginRedirect({
      scopes: ["openid"],
      redirectUri: window.location.origin,
      extraQueryParameters: { prompt: "login" }
    }).catch((e) => {
      console.log(e);
    });
    setMobileMenuOpen(false);
  }

  function handleLogout() {
    instance.logoutRedirect().catch((e) => {
      console.log(e);
    });
    setMobileMenuOpen(false);
  }

  function handleProfileClick() {
    window.location.href = "https://mzn-e-hub-storefront-5akxqw2kr-digitalqatalysts-projects.vercel.app/dashboard";
    setMobileMenuOpen(false);
  }

  const SIGNUP_URL = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-5akxqw2kr-digitalqatalysts-projects.vercel.app%2Fdashboard&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=uPSCPoX1IbZeEy61vNSmgjyHSSPFWhaVq5Btdo0fMHY";

  function handleSignUp() {
    window.location.href = SIGNUP_URL;
    setMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
    <>
      <ResponsiveNavbar>
        <Container 
          className="navbar-container"
          height="100%" 
          display="flex"  
          alignItems="center" 
          justifyContent="space-between"
        >
          {/* Logo Section */}
          <Box className="navbar-logo"  mr="50px">
            <img src="/assets/images/logos/mzn_logo.svg" alt="MZN Enterprise Hub" height="40px" />
          </Box>

          {/* Desktop Navigation */}
          <FlexBox className="desktop-nav" alignItems="center"  style={{ gap: "32px" }}>
            {/* Categories Section (Explore) with specific gap from logo */}
            <Box className="categories-section logo-categories-gap">
              <Categories open={navListOpen}>
                <Button 
                  className="categories-button"
                  width="278px" 
                  height="40px" 
                  bg="body.default" 
                  variant="text"
                >
                  <FlexBox justifyContent="space-between" alignItems="center" width="100%">
                    <FlexBox alignItems="center">
                      <Icon>categories</Icon>
                      <Typography
                        className="typography"
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
            </Box>

            {/* Navigation Links */}
            <FlexBox ml="270px"  style={{ gap: 32 }}>
              {renderNestedNav(navbarNavigations, true)}
            </FlexBox>

            {/* Search Icon */}
            <Box className="search-icon" style={{ cursor: "pointer" }}>
              <img src="/assets/images/logos/search.svg" alt="Search" height="14px" />
            </Box>

            {/* In the profile-icon Box, conditionally hide the <img> if the user is authenticated */}
            <Box className="profile-icon" style={{ cursor: "pointer" }}>
              {accounts.length === 0 && (
                <img src="/assets/images/logos/profile.svg" alt="profile" height="24px" />
              )}
            </Box>

            {/* Authentication Section */}
            <AuthenticatedTemplate>
              <FlexBox alignItems="center" style={{ gap: "10px" }}>
                <Button 
                  className="sign-in-btn" 
                  variant="outlined" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Box 
                  className="profile-icon" 
                  style={{ 
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    border: "2px solid #002180",
                    transition: "all 0.3s ease"
                  }}
                  onClick={handleProfileClick}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e0e0e0";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Icon size="20px" color="#002180">
                    user
                  </Icon>
                </Box>
              </FlexBox>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <FlexBox alignItems="center" style={{ gap: "10px" }}>
                <Button className="sign-in-btn" variant="outlined" onClick={handleLogin}>
                Become a Partner
                </Button>
                <Button className="sign-up-button" variant="contained" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </FlexBox>
            </UnauthenticatedTemplate>
          </FlexBox>

          {/* Mobile Menu Toggle */}
          <FlexBox className="mobile-nav" alignItems="center" style={{ gap: "10px" }}>
            {/* Mobile Auth Buttons - Show for unauthenticated users */}
            <UnauthenticatedTemplate>
              <FlexBox className="mobile-auth-buttons" alignItems="center" style={{ gap: "8px" }}>
                <Button className="sign-in-btn" variant="outlined" onClick={handleLogin}>
                Become a Partner
                </Button>
                <Button className="sign-up-button" variant="contained" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </FlexBox>
            </UnauthenticatedTemplate>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <Icon size="24px" color="#002180">
                {mobileMenuOpen ? 'close' : 'menu'}
              </Icon>
            </button>
          </FlexBox>
        </Container>
      </ResponsiveNavbar>

      {/* Mobile Menu Overlay */}
      <MobileNavOverlay isOpen={mobileMenuOpen} onClick={closeMobileMenu} />

      {/* Mobile Menu */}
      <MobileNavMenu isOpen={mobileMenuOpen}>
        <MobileNavHeader>
          <img src="/assets/images/logos/mzn_logo.svg" alt="MZN Enterprise Hub" height="32px" />
          <CloseButton onClick={closeMobileMenu}>×</CloseButton>
        </MobileNavHeader>

        <MobileNavContent>
          {/* Categories Section */}
          <MobileNavSection>
            <MobileNavTitle>Categories</MobileNavTitle>
            <MobileNavItem>
              <a href="#" onClick={closeMobileMenu}>Explore All Categories</a>
            </MobileNavItem>
          </MobileNavSection>

          {/* Navigation Links */}
          <MobileNavSection>
            <MobileNavTitle>Navigation</MobileNavTitle>
            {navbarNavigations.map((nav) => (
              <MobileNavItem key={nav.title}>
                <NavLink href={nav.url} onClick={closeMobileMenu}>
                  {nav.title}
                </NavLink>
              </MobileNavItem>
            ))}
          </MobileNavSection>

          {/* Search */}
          <MobileNavSection>
            <MobileNavTitle>Search</MobileNavTitle>
            <MobileNavItem>
              <a href="#" onClick={closeMobileMenu}>Search Products & Services</a>
            </MobileNavItem>
          </MobileNavSection>

          {/* Authentication */}
          <MobileNavSection>
            <AuthenticatedTemplate>
              <MobileAuthSection>
                <button className="mobile-auth-button mobile-profile" onClick={handleProfileClick}>
                  <Icon size="16px" color="#002180">user</Icon>
                  View Profile
                </button>
                <button className="mobile-auth-button mobile-logout" onClick={handleLogout}>
                  Logout
                </button>
              </MobileAuthSection>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <MobileAuthSection>
                <button className="mobile-auth-button mobile-sign-in" onClick={handleLogin}>
                  Sign In
                </button>
                <button className="mobile-auth-button mobile-sign-up" onClick={handleSignUp}>
                  Sign Up
                </button>
              </MobileAuthSection>
            </UnauthenticatedTemplate>
          </MobileNavSection>
        </MobileNavContent>
      </MobileNavMenu>

      {/* Modals */}
      {modalType === "signup" && <SignUpModal />}
      {modalType === "signin" && <SignInModal />}
    </>
  );
}