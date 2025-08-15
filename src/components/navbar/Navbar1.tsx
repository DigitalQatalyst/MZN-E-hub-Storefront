"use client";

import { useState, useEffect } from "react";
import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";
import styled from "styled-components";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const StyledNavbar = styled.div`
  background: transparent !important;
  backdrop-filter: none;
  box-shadow: none;
  border-bottom: none;
  position: relative;
  z-index: 1000;

  .navbar-container {
    max-width: none;
    margin: 0;
    padding: 10px 54px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .enterprise-logo {
    font-family: "Open Sans", sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: -0.5px;
    line-height: 1.2;
    text-transform: uppercase;
    padding-right: 10px;

    img {
      width: 150px;
      height: auto;
    }

    .enterprise-text {
      display: block;
      font-size: 20px;
    }

    .journey-text {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-top: -2px;
    }
  }

  .explore-button {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0 16px;
    min-width: 300px;
    height: 40px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .nav-links {
    gap: 40px;
    margin-right: 40px;
    display: flex;
    align-items: center;

    .nav-link {
      color: white !important;
      font-weight: 500;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 8px 0;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: white;
      }
    }
  }

  .right-section {
    gap: 24px;
    align-items: center;
    display: flex;
  }

  .search-icon {
    width: 24px;
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s ease;

    svg, img {
      filter: brightness(0) invert(1);
    }
  }

  .profile-icon {
    width: 68px;
    height: 32px;
    cursor: pointer;
    transition: transform 0.3s ease;

    svg, img {
      filter: brightness(0) invert(1);
    }
  }

  .hamburger-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: none;

    svg, img {
      filter: brightness(0) invert(1);
    }
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(224.55deg, #7693F3 0.02%, #7693F3 11.72%, #7693F1 21.24%, #7594EF 28.92%, #7594EC 35.08%, #7495E9 40.08%, #7496E5 44.24%, #7397E0 47.89%, #7298DC 51.38%, #7299D7 55.03%, #719AD2 59.19%, #709BCD 64.18%, #6F9CC8 70.35%, #6E9DC3 78.03%, #6E9EBE 87.54%, #6D9FBA 99.24%);
    padding: 20px;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }

    .mobile-nav-links {
      flex-direction: column;
      gap: 20px;
      margin-top: 40px;
      justify-content: flex-start;

      .nav-link {
        color: white !important;
        font-size: 18px;
        font-weight: 600;
        padding: 10px 0;
      }
    }

    .mobile-right-section {
      flex-direction: column;
      margin-top: 20px;
      justify-content: flex-start;


      .profile-icon {
        width: 44px;
        height: 30px;
      }

      .search-icon {
        width: 44px;
        height: 30px;
      }
    }

    .mobile-explore-button {
      width: 100%;
      justify-content: flex-start;
      margin-top: 20px;
    }
  }

  .become-partner-btn, .logout-btn {
    background: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 140px;
  }

  .sign-up-btn {
    background: white !important;
    color: #0000FF !important;
    border: 2px solid white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 100px;
  }

  // Tablet screens
  @media (max-width: 1024px) {
    .navbar-container {
      padding: 16px 40px;
    }

    .enterprise-logo {
      font-size: 20px;

      img {
        width: 130px;
      }

      .enterprise-text {
        font-size: 18px;
      }

      .journey-text {
        font-size: 14px;
      }
    }

    .nav-links {
      gap: 20px;
      margin-right: 20px;

      .nav-link {
        font-size: 14px;
      }
    }

    .explore-button {
      min-width: 120px;
      height: 40px;

      .explore-text {
        font-size: 14px;
      }
    }

    .become-partner-btn, .logout-btn {
      min-width: 120px;
      font-size: 13px;
      padding: 8px 16px;
    }

    .sign-up-btn {
      min-width: 80px;
      font-size: 13px;
      padding: 8px 16px;
    }

    .right-section {
      gap: 16px;
    }
  }

  // Mobile screens
  @media (max-width: 768px) {
    .navbar-container {
      padding: 16px 20px;
      justify-content: flex-start;
    }

    .enterprise-logo {
      display: none;
    }

    .explore-button {
      display: none;
    }

    .nav-links {
      display: none;
    }

    .right-section {
      display: none;
    }

    .hamburger-icon {
      display: block;
      position: absolute;
      top: 16px;
      left: 20px;
    }

    .mobile-menu {
      display: block;
    }
  }

  // Small mobile screens
  @media (max-width: 480px) {
    .navbar-container {
      padding: 12px 16px;
    }

    .mobile-menu {
      width: 100%;
      max-width: none;
    }
  }
`;

interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge?: string;
  extLink?: boolean;
}

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["openid"],
      redirectUri: window.location.origin,
      extraQueryParameters: { prompt: "login" }
    }).catch((e) => {
      console.log(e);
    });
    setMenuOpen(false);
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.log(e);
    });
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    window.location.href = "/dashboard";
    setMenuOpen(false);
  };

  const SIGNUP_URL = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-git-landingpage-digitalqatalysts-projects.vercel.app%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=0vZQNWZJq-_sIiTADK-M4hyf44ACCodxa3_4L0MYxVo";

  const handleSignUp = () => {
    window.location.href = SIGNUP_URL;
    setMenuOpen(false);
  };

  return (
    <StyledNavbar className={scrolled ? "scrolled" : ""}>
      <Container
        className="navbar-container"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="enterprise-logo" mr="20px">
          <NavLink href="/">
            <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
          </NavLink>
        </Box>

        <Categories open={navListOpen}>
          <Button
            className="explore-button"
            width="140px"
            height="44px"
            bg="body.default"
            variant="text"
          >
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon className="explore-icon">categories</Icon>
                <Typography
                  className="explore-text"
                  ml="5px"
                  fontFamily='"Open Sans", sans-serif'
                  fontSize="16px"
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

        <Box flex="1" />

        <FlexBox className="nav-links">
          <NavLink className="nav-link" href="/development">
            Discover AbuDhabi
          </NavLink>
          <NavLink className="nav-link" href="/faq">
            Help Centre
          </NavLink>
        </FlexBox>

        <FlexBox className="right-section">
          <Box className="search-icon">
            <Icon size="18px" color="#002180">search</Icon>
          </Box>

          <AuthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "10px" }}>
              <Button className="logout-btn" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
              <Box
                className="profile-icon"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "34px",
                  height: "34px",
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
              <Box className="profile-icon" href="/dashboard">
                {/* <img src="/assets/images/logos/profile.svg" alt="Profile" /> */}
                <Icon size="30px" color="#002180">profile</Icon>
              </Box>
              <Button className="become-partner-btn" variant="outlined" onClick={handleLogin}>
                Become a Partner
              </Button>
              <Button className="sign-up-btn" variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>
            </FlexBox>
          </UnauthenticatedTemplate>
        </FlexBox>

        <Box className="hamburger-icon" onClick={toggleMenu}>
          <Icon>menu</Icon>
        </Box>

        <Box className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Categories open={navListOpen}>
            <Button
              className="mobile-explore-button"
              width="100%"
              height="44px"
              bg="body.default"
              variant="text"
              onClick={toggleMenu}
            >
              <FlexBox justifyContent="flex-start" alignItems="center" width="100%">
                <FlexBox alignItems="center">
                  <Icon className="explore-icon">categories</Icon>
                  <Typography
                    className="explore-text"
                    ml="5px"
                    fontFamily='"Open Sans", sans-serif'
                    fontSize="16px"
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

          <FlexBox className="mobile-nav-links">
            <NavLink className="nav-link" href="/development" onClick={toggleMenu}>
              Discover AbuDhabi
            </NavLink>
            <NavLink className="nav-link" href="/faq" onClick={toggleMenu}>
              Help Centre
            </NavLink>
          </FlexBox>

          <FlexBox className="mobile-right-section">
            <Box className="search-icon" onClick={toggleMenu}>
              <Icon size="18px" color="#002180" >search</Icon>
            </Box>

            <AuthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "16px" }}>
                <Button
                  className="mobile-auth-button mobile-profile"
                  style={{
                    background: "#f8f9fa",
                    color: "#002180",
                    border: "2px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px",
                    borderRadius: "6px"
                  }}
                  onClick={handleProfileClick}
                >
                  <Icon size="24px" color="#002180">user</Icon>
                  View Profile
                </Button>
                <Button
                  className="mobile-auth-button logout-btn"
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "2px solid #dc3545",
                    padding: "10px",
                    borderRadius: "6px"
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </FlexBox>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "16px" }}>
                <Box className="profile-icon" onClick={toggleMenu}>
                  {/* <img src="/assets/images/logos/profile.svg" alt="Profile" /> */}
                  <Icon size="44px" color="#002180">profile</Icon>
                </Box>
                <Button
                  className="mobile-auth-button become-partner-btn"
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    padding: "10px",
                    borderRadius: "6px"
                  }}
                  onClick={handleLogin}
                >
                  Become a Partner
                </Button>
                <Button
                  className="mobile-auth-button sign-up-btn"
                  style={{
                    background: "white",
                    color: "#0000FF",
                    border: "2px solid white",
                    padding: "10px",
                    borderRadius: "6px"
                  }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </FlexBox>
            </UnauthenticatedTemplate>
          </FlexBox>
        </Box>
      </Container>
    </StyledNavbar>
  );
}