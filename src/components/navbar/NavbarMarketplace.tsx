"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest, signupRequest, logoutRequest } from "../../authConfig";
import { StyledNavbar } from "./marketStyles";
import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";
import Image from "next/image"; // Import Next.js Image component

type NavbarProps = { navListOpen?: boolean };

export default function NavbarMarketplace({ navListOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(""); // State to track active navigation item
  const { instance } = useMsal();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("MSAL redirectUri =", instance.getConfiguration().auth.redirectUri);
  }, [instance]);

  const toggleMenu = () => setMenuOpen((v) => !v);

  const handleUserIconClick = () => {
    instance.loginRedirect(loginRequest).catch(console.error);
    setMenuOpen(false);
  };

  const handleBecomePartner = () => {
    router.push("/development");
    setMenuOpen(false);
  };

  const handleSignUp = () => {
    instance.loginRedirect(signupRequest).catch(console.error);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    instance.logoutRedirect(logoutRequest).catch(console.error);
    setMenuOpen(false);
  };

  const handleNavClick = (path) => {
    setActiveItem(path);
    router.push(path);
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
        <Box className="enterprise-logo">
          <NavLink href="/">
            <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
          </NavLink>
        </Box>

        <Categories open={navListOpen}>
          <Button className="explore-button" width="240px" height="44px" bg="body.default" variant="text">
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon className="explore-icon">categories</Icon>
                <Typography
                  className="explore-text"
                  fontFamily='"Open Sans", sans-serif'
                  fontSize="16px"
                  fontWeight="600"
                  lineHeight="26px"
                  color="#002180"
                  ml="8px"
                >
                  Explore
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">chevron-down</Icon>
            </FlexBox>
          </Button>
        </Categories>

        <Box flex="1" />

        <FlexBox className="nav-links" style={{ gap: "20px" }}>
          <NavLink className="nav-link" href="/development">
            Discover AbuDhabi
          </NavLink>
          <NavLink className="nav-link" href="/faq">
            Help Centre
          </NavLink>
          <UnauthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
              <Box className="profile-icon" onClick={handleUserIconClick}>
                <Icon size="30px" color="#002180">
                  profile
                </Icon>
              </Box>
              <Button className="become-partner-btn" variant="outlined" onClick={handleBecomePartner}>
                Become a Partner
              </Button>
              <Button className="sign-up-btn" variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>
            </FlexBox>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
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
                  transition: "all 0.3s ease",
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
                <Icon size="20px" color="#002180">
                  user
                </Icon>
              </Box>
            </FlexBox>
          </AuthenticatedTemplate>
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
              <FlexBox justifyContent="space-between" alignItems="center" width="100%">
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
                <Icon className="dropdown-icon" variant="small">
                  chevron-down
                </Icon>
              </FlexBox>
            </Button>
          </Categories>

          <FlexBox className="mobile-nav-links" style={{ gap: "20px" }}>
            <NavLink className="nav-link" href="/development" onClick={toggleMenu}>
              Discover AbuDhabi
            </NavLink>
            <NavLink className="nav-link" href="/faq" onClick={toggleMenu}>
              Help Centre
            </NavLink>
            <UnauthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "20px" }}>
                <Box className="profile-icon" onClick={handleUserIconClick}>
                  <Icon size="44px" color="#002180">
                    profile
                  </Icon>
                </Box>
                <Button
                  className="mobile-auth-button become-partner-btn"
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                  onClick={handleBecomePartner}
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
                    borderRadius: "6px",
                  }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </FlexBox>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "20px" }}>
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
                    borderRadius: "6px",
                  }}
                  onClick={handleUserIconClick}
                >
                  <Icon size="24px" color="#002180">
                    user
                  </Icon>
                  Sign In
                </Button>
                <Button
                  className="mobile-auth-button logout-btn"
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "2px solid #dc3545",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </FlexBox>
            </AuthenticatedTemplate>
          </FlexBox>
        </Box>

        <Container
          className="responsive-header"
          height="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className="enterprise-logo">
            <NavLink href="/">
              <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
            </NavLink>
          </Box>
        </Container>

        <Box className="responsive-mobile-menu">
          <FlexBox className="mobile-nav-links" style={{ gap: 10, width: "100%", justifyContent: "space-around" }}>
            <NavLink href="/" onClick={() => handleNavClick("/")}>
              <Image
                src={activeItem === "/" ? "/assets/images/non_financial_marketplace/home-active.svg" : "/assets/images/non_financial_marketplace/home.svg"}
                alt="Home"
                width={24}
                height={24}
              />
              <Typography color="black">Home</Typography>
            </NavLink>
            <NavLink href="/explore" onClick={() => handleNavClick("/explore")}>
              <Image
                src={activeItem === "/explore" ? "/assets/images/non_financial_marketplace/explore-active.svg" : "/assets/images/non_financial_marketplace/explore.svg"}
                alt="Explore"
                width={24}
                height={24}
              />
              <Typography color="black">Explore</Typography>
            </NavLink>
            <NavLink href="/search" onClick={() => handleNavClick("/search")}>
              <Image
                src="/assets/images/non_financial_marketplace/search (2).svg"
                alt="Search"
                width={24}
                height={24}
              />
              <Typography color="black">Search</Typography>
            </NavLink>
            <NavLink href="/profile" onClick={() => handleNavClick("/profile")}>
              <Image
                src={activeItem === "/profile" ? "/assets/images/non_financial_marketplace/profile-active.svg" : "/assets/images/non_financial_marketplace/profile.svg"}
                alt="Profile"
                width={24}
                height={24}
              />
              <Typography color="black">Profile</Typography>
            </NavLink>
          </FlexBox>
        </Box>
      </Container>
    </StyledNavbar>
  );
}