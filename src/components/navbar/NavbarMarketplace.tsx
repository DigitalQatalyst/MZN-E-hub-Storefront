"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionStatus, EventType, AuthenticationResult, EventMessage } from "@azure/msal-browser";
import { loginRequest /* no separate signupRequest needed */ } from "../../lib/authConfig";

import { StyledNavbar } from "./marketStyles";
import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";
import Image from "next/image";

type NavbarProps = { navListOpen?: boolean };

/** Keep the active account hydrated after page loads/refreshes */
function useHydrateActiveAccount() {
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;
    try {
      const current = instance.getActiveAccount();
      if (!current) {
        const all = instance.getAllAccounts();
        if (all.length) instance.setActiveAccount(all[0]);
      }
    } catch (err) {
      console.warn("MSAL not fully initialized yet:", err);
    }
  }, [instance, inProgress]);
}

export default function NavbarMarketplace({ navListOpen }: NavbarProps) {
  const router = useRouter();
  const { instance, inProgress } = useMsal();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  useHydrateActiveAccount();

  // Mark MSAL ready only when no interaction is in progress
  useEffect(() => {
    if (inProgress === InteractionStatus.None) setIsMsalInitialized(true);
  }, [inProgress]);

  // Redirect to /onboarding after a successful login/acquire token (matches your first component)
  useEffect(() => {
    if (!isMsalInitialized) return;
    const cbId = instance.addEventCallback((evt: EventMessage) => {
      if (evt.eventType === EventType.LOGIN_SUCCESS || evt.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        const result = evt.payload as AuthenticationResult;
        const acct =
          result.account ||
          instance.getActiveAccount() ||
          instance.getAllAccounts()[0];

        if (acct) instance.setActiveAccount(acct);

        if (inProgress === InteractionStatus.None) {
          router.replace("/onboarding");
        }
      }
    });
    return () => {
      if (cbId) instance.removeEventCallback(cbId);
    };
  }, [instance, router, inProgress, isMsalInitialized]);

  // Scroll effect for navbar shadow/background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);

  // 🔐 Login (popup first, fallback to redirect)
  const handleUserIconClick = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    try {
      await instance.loginPopup(loginRequest);
      router.replace("/dashboard");
    } catch (e: any) {
      const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
      if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
        await instance.loginRedirect(loginRequest);
        return;
      }
      console.error("login failed:", e);
    } finally {
      setIsLoading(false);
      setMenuOpen(false);
    }
  };

  // 🆕 Sign Up (force SUSI to show Sign Up first)
  const handleSignUp = async () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    const signUpRequest = {
      ...loginRequest,
      extraQueryParameters: { prompt: "create" }, // <-- SUSI: show Sign Up tab first
    };
    try {
      await instance.loginPopup(signUpRequest);
      // On success, event callback will route to /onboarding,
      // but we can also push dashboard if needed:
      // router.replace("/dashboard");
    } catch (e: any) {
      const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
      if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
        await instance.loginRedirect(signUpRequest);
        return;
      }
      console.error("signup failed:", e);
    } finally {
      setIsLoading(false);
      setMenuOpen(false);
    }
  };

  const handleBecomePartner = () => {
    router.push("/development");
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    if (!isMsalInitialized) return;
    try {
      await instance.logoutRedirect();
    } finally {
      setMenuOpen(false);
    }
  };

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  // Prevent flashing incorrect UI before MSAL is ready
  if (!isMsalInitialized) {
    return (
      <StyledNavbar>
        <Container
          className="navbar-container"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{isLoading ? "Signing you in..." : "Loading..."}</Typography>
        </Container>
      </StyledNavbar>
    );
  }

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
            <img
              src="/assets/images/logos/mzn_logo.svg"
              alt="Enterprise Journey Logo"
            />
          </NavLink>
        </Box>

        <Categories open={navListOpen}>
          <Button
            className="explore-button"
            width="240px"
            height="44px"
            bg="body.default"
            variant="text"
          >
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
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
              <Icon className="dropdown-icon" variant="small">
                chevron-down
              </Icon>
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
          <Box className="search-icon">
            <Icon size="18px" color="#002180">
              search-white
            </Icon>
          </Box>

          {/* Auth UI using MSAL templates (render only when initialized) */}
          <UnauthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
              <FlexBox
                alignItems="center"
                style={{
                  cursor: "pointer",
                  color: "#FFF",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontStyle: "normal",
                }}
                onClick={handleUserIconClick}
              >
                <Icon size="30px" color="#002180">
                  profile
                </Icon>
                {isLoading ? "Signing in..." : "Sign In"}
              </FlexBox>
              <Button
                className="become-partner-btn"
                variant="outlined"
                onClick={handleBecomePartner}
              >
                Become a Partner
              </Button>
              <Button
                className="sign-up-btn"
                variant="contained"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : "Sign Up"}
              </Button>
            </FlexBox>
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
              <Button
                className="logout-btn"
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
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
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
            <NavLink
              className="nav-link"
              href="/development"
              onClick={toggleMenu}
            >
              Discover AbuDhabi
            </NavLink>
            <NavLink className="nav-link" href="/faq" onClick={toggleMenu}>
              Help Centre
            </NavLink>

            <UnauthenticatedTemplate>
              <FlexBox
                className="mobile-auth-section"
                flexDirection="column"
                style={{ gap: "20px" }}
              >
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
              <FlexBox
                className="mobile-auth-section"
                flexDirection="column"
                style={{ gap: "20px" }}
              >
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
                  My Account
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

        {/* Bottom mobile nav bar */}
        <Container
          className="responsive-header"
          height="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box className="enterprise-logo">
            <NavLink href="/">
              <img
                src="/assets/images/logos/mzn_logo.svg"
                alt="Enterprise Journey Logo"
              />
            </NavLink>
          </Box>
        </Container>

        <Box className="responsive-mobile-menu">
          <FlexBox
            className="mobile-nav-links"
            style={{ gap: 10, width: "100%", justifyContent: "space-around" }}
          >
            <NavLink href="/" onClick={() => handleNavClick("/")}>
              <Image
                src={
                  activeItem === "/"
                    ? "/assets/images/non_financial_marketplace/home-active.svg"
                    : "/assets/images/non_financial_marketplace/home.svg"
                }
                alt="Home"
                width={24}
                height={24}
              />
              <Typography color="black">Home</Typography>
            </NavLink>
            <NavLink href="/explore" onClick={() => handleNavClick("/explore")}>
              <Image
                src={
                  activeItem === "/explore"
                    ? "/assets/images/non_financial_marketplace/explore-active.svg"
                    : "/assets/images/non_financial_marketplace/explore.svg"
                }
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
                src={
                  activeItem === "/profile"
                    ? "/assets/images/non_financial_marketplace/profile-active.svg"
                    : "/assets/images/non_financial_marketplace/profile.svg"
                }
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