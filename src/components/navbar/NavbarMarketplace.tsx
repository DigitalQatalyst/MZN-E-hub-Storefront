"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import type { AccountInfo } from "@azure/msal-browser";

import { StyledNavbar } from "./marketStyles";
import { loginRequest } from "@lib/authConfig";

import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";

type NavbarProps = { navListOpen?: boolean };

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
}

export default function NavbarMarketplace({ navListOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { instance, accounts } = useMsal();
  const [isLoading, setIsLoading] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ensure active account is set for templates/token usage
  useEffect(() => {
    if (!instance.getActiveAccount() && accounts[0]) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  const activeAccount: AccountInfo | undefined = useMemo(
    () => instance.getActiveAccount() ?? accounts[0],
    [instance, accounts]
  );

  const displayName =
    activeAccount?.name ||
    (activeAccount?.idTokenClaims as any)?.name ||
    (activeAccount?.idTokenClaims as any)?.given_name ||
    (activeAccount?.idTokenClaims as any)?.emails?.[0] ||
    "User";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const goto = (path: string) => {
    setMenuOpen(false);
    router.push(path);
  };
  const isActive = (path: string) => pathname === path;

  // ✅ POPUP flows + land on /dashboard
const handleLogin = async () => {
  setIsLoading(true);
  try {
    const res = await instance.loginPopup(loginRequest);
    if (res?.account) instance.setActiveAccount(res.account);
    router.push("/dashboard");
  } catch (e: any) {
    const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
    if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
      await instance.loginRedirect(loginRequest);
      return;
    }
    console.error("login failed:", e);
  } finally {
    setIsLoading(false);
  }
};

// const handleLogout = async () => {
//   await instance.logoutRedirect();
//   setMenuOpen(false);
// };

  // const handleSignUp = async () => {
  //   try {
  //     const res = await instance.loginPopup({
  //       ...loginRequest,
  //       authority: signupAuthority,
  //     });
  //     if (res?.account) instance.setActiveAccount(res.account);
  //     router.push("/dashboard");
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setMenuOpen(false);
  //   }
  // };

  const handleLogout = () => {
    const account = instance.getActiveAccount() ?? accounts?.[0];
    instance
      .logoutRedirect({
        account,
        // postLogoutRedirectUri comes from msalConfig; override here if you want
      })
      .catch(console.error);
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
          <NavLink className="nav-link" href="/development">Discover AbuDhabi</NavLink>
          <NavLink className="nav-link" href="/faq">Help Centre</NavLink>
          <Box className="search-icon" role="button" aria-label="Search">
            <Icon size="18px" color="#002180">search-white</Icon>
          </Box>

          <UnauthenticatedTemplate>
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
              <Box className="profile-icon" onClick={handleLogin} role="button" aria-label="Sign in">
                <Icon size="30px" color="#002180">profile</Icon>
              </Box>
              <Button className="become-partner-btn" variant="outlined" onClick={() => goto("/development")}>
                Become a Partner
              </Button>
              <Button className="sign-up-btn" variant="contained" 
                      // onClick={handleSignUp}
                      >
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
                role="button"
                aria-label="Open dashboard"
                onClick={() => goto("/dashboard")}
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
                  transition: "all 0.2s ease",
                  fontWeight: 700,
                  color: "#002180",
                  fontSize: 12,
                  userSelect: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e8eefc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              >
                {getInitials(displayName)}
              </Box>
            </FlexBox>
          </AuthenticatedTemplate>
        </FlexBox>

        <Box className="hamburger-icon" onClick={toggleMenu} role="button" aria-label="Open menu">
          <Icon>menu</Icon>
        </Box>

        <Box className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Categories open={navListOpen}>
            <Button className="mobile-explore-button" width="100%" height="44px" bg="body.default" variant="text" onClick={toggleMenu}>
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
                <Icon className="dropdown-icon" variant="small">chevron-down</Icon>
              </FlexBox>
            </Button>
          </Categories>

          <FlexBox className="mobile-nav-links" style={{ gap: "20px" }}>
            <NavLink className="nav-link" href="/development" onClick={toggleMenu}>Discover AbuDhabi</NavLink>
            <NavLink className="nav-link" href="/faq" onClick={toggleMenu}>Help Centre</NavLink>

            <UnauthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "20px" }}>
                <Box className="profile-icon" onClick={handleLogin} role="button" aria-label="Sign in">
                  <Icon size="44px" color="#002180">profile</Icon>
                </Box>
                <Button
                  className="mobile-auth-button become-partner-btn"
                  style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.8)", padding: 10, borderRadius: 6 }}
                  onClick={() => goto("/development")}
                >
                  Become a Partner
                </Button>
                <Button
                  className="mobile-auth-button sign-up-btn"
                  style={{ background: "white", color: "#0000FF", border: "2px solid white", padding: 10, borderRadius: 6 }}
                  // onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </FlexBox>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
              <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "20px" }}>
                <Button
                  className="mobile-auth-button mobile-profile"
                  style={{ background: "#f8f9fa", color: "#002180", border: "2px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 10, borderRadius: 6 }}
                  onClick={() => goto("/dashboard")}
                >
                  <Icon size="24px" color="#002180">user</Icon>
                  My Account
                </Button>
                <Button
                  className="mobile-auth-button logout-btn"
                  style={{ background: "#dc3545", color: "white", border: "2px solid #dc3545", padding: 10, borderRadius: 6 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </FlexBox>
            </AuthenticatedTemplate>
          </FlexBox>
        </Box>

        {/* Bottom mobile nav bar */}
        <Container className="responsive-header" height="60px" display="flex" alignItems="center" justifyContent="center">
          <Box className="enterprise-logo">
            <NavLink href="/">
              <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
            </NavLink>
          </Box>
        </Container>

        <Box className="responsive-mobile-menu">
          <FlexBox className="mobile-nav-links" style={{ gap: 10, width: "100%", justifyContent: "space-around" }}>
            <NavLink href="/" onClick={() => goto("/")}>
              <Image
                src={isActive("/") ? "/assets/images/non_financial_marketplace/home-active.svg" : "/assets/images/non_financial_marketplace/home.svg"}
                alt="Home"
                width={24}
                height={24}
              />
              <Typography color="black">Home</Typography>
            </NavLink>
            <NavLink href="/explore" onClick={() => goto("/explore")}>
              <Image
                src={isActive("/explore") ? "/assets/images/non_financial_marketplace/explore-active.svg" : "/assets/images/non_financial_marketplace/explore.svg"}
                alt="Explore"
                width={24}
                height={24}
              />
              <Typography color="black">Explore</Typography>
            </NavLink>
            <NavLink href="/search" onClick={() => goto("/search")}>
              <Image src="/assets/images/non_financial_marketplace/search (2).svg" alt="Search" width={24} height={24} />
              <Typography color="black">Search</Typography>
            </NavLink>
            <NavLink href="/profile" onClick={() => goto("/profile")}>
              <Image
                src={isActive("/profile") ? "/assets/images/non_financial_marketplace/profile-active.svg" : "/assets/images/non_financial_marketplace/profile.svg"}
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
