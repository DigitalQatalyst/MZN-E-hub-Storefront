"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

// ✅ only import the prebuilt requests from authConfig
import { loginRequest, signupRequest, logoutRequest } from "../../authConfig";

import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";

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

    img { width: 150px; height: auto; }
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
    }
  }

  .right-section { gap: 24px; align-items: center; display: flex; }
  .search-icon, .profile-icon, .hamburger-icon { cursor: pointer; transition: transform 0.3s ease; }
  .search-icon { width: 24px; height: 20px; }
  .profile-icon { width: 68px; height: 32px; }
  .hamburger-icon { width: 24px; height: 24px; display: none; }

  .mobile-menu {
    position: fixed; top: 0; right: 0;
    width: 80%; max-width: 300px; height: 100vh;
    background: linear-gradient(224.55deg, #7693F3 0.02%, #6D9FBA 99.24%);
    padding: 20px; z-index: 1001;
    transform: translateX(100%); transition: transform 0.3s ease-in-out;
    &.open { transform: translateX(0); }
    .mobile-nav-links { flex-direction: column; gap: 20px; margin-top: 40px; }
    .mobile-right-section { flex-direction: column; margin-top: 20px; }
    .mobile-explore-button { width: 100%; justify-content: flex-start; margin-top: 20px; }
  }

  .become-partner-btn, .logout-btn {
    background: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: white !important; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 8px; transition: all 0.3s ease; min-width: 140px;
  }

  .sign-up-btn {
    background: white !important; color: #0000FF !important;
    border: 2px solid white !important; font-weight: 600; font-size: 14px;
    padding: 10px 20px; border-radius: 8px; transition: all 0.3s ease; min-width: 100px;
  }

  @media (max-width: 1024px) {
    .navbar-container { padding: 16px 40px; }
    .enterprise-logo img { width: 130px; }
    .nav-links { gap: 20px; margin-right: 20px; }
    .explore-button { min-width: 120px; height: 40px; }
    .become-partner-btn, .logout-btn { min-width: 120px; font-size: 13px; padding: 8px 16px; }
    .sign-up-btn { min-width: 80px; font-size: 13px; padding: 8px 16px; }
    .right-section { gap: 16px; }
  }

  @media (max-width: 768px) {
    .navbar-container { padding: 16px 20px; justify-content: flex-start; }
    .enterprise-logo, .explore-button, .nav-links, .right-section { display: none; }
    .hamburger-icon { display: block; position: absolute; top: 16px; left: 20px; }
    .mobile-menu { display: block; }
  }

  @media (max-width: 480px) {
    .navbar-container { padding: 12px 16px; }
    .mobile-menu { width: 100%; max-width: none; }
  }
`;

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { instance } = useMsal();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debug once to confirm correct callback per env
  useEffect(() => {
    console.log("MSAL redirectUri =", instance.getConfiguration().auth.redirectUri);
  }, [instance]);

  const toggleMenu = () => setMenuOpen(v => !v);

  // 👤 User icon → Sign In (SUSI)
  const handleUserIconClick = () => {
    instance.loginRedirect(loginRequest).catch(console.error);
    setMenuOpen(false);
  };

  // 🧭 Become a Partner (no login)
  const handleBecomePartner = () => {
    router.push("/development");
    setMenuOpen(false);
  };

  // ✍️ Sign Up → dedicated signup policy
  const handleSignUp = () => {
    instance.loginRedirect(signupRequest).catch(console.error);
    setMenuOpen(false);
  };

  // 🚪 Logout
  const handleLogout = () => {
    instance.logoutRedirect(logoutRequest).catch(console.error);
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
          <Button className="explore-button" width="140px" height="44px" bg="body.default" variant="text">
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon className="explore-icon">categories</Icon>
                <Typography className="explore-text" ml="5px" fontFamily='"Open Sans", sans-serif' fontSize="16px" fontWeight="600" lineHeight="26px" color="#002180">
                  Explore
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">chevron-down</Icon>
            </FlexBox>
          </Button>
        </Categories>

        <Box flex="1" />

        <FlexBox className="nav-links">
          <NavLink className="nav-link" href="/development">Discover AbuDhabi</NavLink>
          <NavLink className="nav-link" href="/faq">Help Centre</NavLink>
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
                onClick={handleUserIconClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e0e0e0";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Icon size="20px" color="#002180">user</Icon>
              </Box>
            </FlexBox>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "10px" }}>
              <Box className="profile-icon" onClick={handleUserIconClick}>
                <Icon size="30px" color="#002180">profile</Icon>
              </Box>

              <Button className="become-partner-btn" variant="outlined" onClick={handleBecomePartner}>
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

        {/* Mobile menu */}
        <Box className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Categories open={navListOpen}>
            <Button className="mobile-explore-button" width="100%" height="44px" bg="body.default" variant="text" onClick={toggleMenu}>
              <FlexBox justifyContent="flex-start" alignItems="center" width="100%">
                <FlexBox alignItems="center">
                  <Icon className="explore-icon">categories</Icon>
                  <Typography className="explore-text" ml="5px" fontFamily='"Open Sans", sans-serif' fontSize="16px" fontWeight="600" lineHeight="26px" color="#002180">
                    Explore
                  </Typography>
                </FlexBox>
                <Icon className="dropdown-icon" variant="small">chevron-down</Icon>
              </FlexBox>
            </Button>
          </Categories>

          <FlexBox className="mobile-nav-links">
            <NavLink className="nav-link" href="/development" onClick={toggleMenu}>Discover AbuDhabi</NavLink>
            <NavLink className="nav-link" href="/faq" onClick={toggleMenu}>Help Centre</NavLink>
          </FlexBox>

          <FlexBox className="mobile-right-section">
            <Box className="search-icon" onClick={toggleMenu}>
              <Icon size="18px" color="#002180">search</Icon>
            </Box>

            <AuthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "16px" }}>
                <Button
                  className="mobile-auth-button mobile-profile"
                  style={{ background: "#f8f9fa", color: "#002180", border: "2px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px", borderRadius: "6px" }}
                  onClick={handleUserIconClick}
                >
                  <Icon size="24px" color="#002180">user</Icon>
                  Sign In
                </Button>
                <Button
                  className="mobile-auth-button logout-btn"
                  style={{ background: "#dc3545", color: "white", border: "2px solid #dc3545", padding: "10px", borderRadius: "6px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </FlexBox>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "16px" }}>
                <Box className="profile-icon" onClick={handleUserIconClick}>
                  <Icon size="44px" color="#002180">profile</Icon>
                </Box>
                <Button
                  className="mobile-auth-button become-partner-btn"
                  style={{ background: "transparent", color: "white", border: "2px solid rgba(255, 255, 255, 0.8)", padding: "10px", borderRadius: "6px" }}
                  onClick={handleBecomePartner}
                >
                  Become a Partner
                </Button>
                <Button
                  className="mobile-auth-button sign-up-btn"
                  style={{ background: "white", color: "#0000FF", border: "2px solid white", padding: "10px", borderRadius: "6px" }}
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
