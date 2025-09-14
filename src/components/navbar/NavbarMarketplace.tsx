"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus, EventType,  AuthenticationResult, EventMessage, } from "@azure/msal-browser";
import { loginRequest } from "@lib/authConfig";

import { StyledNavbar } from "./marketStyles";


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

function useHydrateActiveAccount() {
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;
    
    // Add initialization check
    try {
      const current = instance.getActiveAccount();
      if (!current) {
        const all = instance.getAllAccounts();
        if (all.length) instance.setActiveAccount(all[0]);
      }
    } catch (error) {
      console.warn("MSAL not fully initialized yet:", error);
    }
  }, [instance, inProgress]);
}


export default function NavbarMarketplace({ navListOpen }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  useHydrateActiveAccount();
  
  const displayName = useMemo(() => {
    if (!isMsalInitialized) return "User";
    
    try {
      const activeAccount = instance.getActiveAccount() ?? accounts[0];
      return (
        activeAccount?.idTokenClaims?.name ||
        activeAccount?.username ||
        "Signed in"
      );
    } catch (error) {
      console.warn("Error getting display name:", error);
      return "User";
    }
  }, [instance, accounts, isMsalInitialized]);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);


  useEffect(() => {
    if (!isMsalInitialized) return;

    // Listen for login success events
    const cbId = instance.addEventCallback((evt: EventMessage) => {
      if (evt.eventType === EventType.LOGIN_SUCCESS || evt.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        const result = evt.payload as AuthenticationResult;             // ✅ narrow payload
        const acct =
          result.account ||
          instance.getActiveAccount() ||
          instance.getAllAccounts()[0];

        if (acct) instance.setActiveAccount(acct);

        // route only when MSAL is idle
        if (inProgress === InteractionStatus.None) {
          router.replace("/onboarding");
        }
      }
    });

    return () => { if (cbId) instance.removeEventCallback(cbId); };
  }, [instance, router, inProgress, isMsalInitialized]);
  // Ensure active account is set for templates/token usage
  // useEffect(() => {
  //   if (!instance.getActiveAccount() && accounts[0]) {
  //     instance.setActiveAccount(accounts[0]);
  //   }
  // }, [accounts, instance]);

  // const activeAccount: AccountInfo | undefined = useMemo(
  //   () => instance.getActiveAccount() ?? accounts[0],
  //   [instance, accounts]
  // );

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
    if (!isMsalInitialized) { // Add this check
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    try {
      const res = await instance.loginPopup(loginRequest);
      if (res?.account) instance.setActiveAccount(res.account);
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
    }
  };

  const handleSignUp = async () => {
    if (!isMsalInitialized) { // Add this check
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    try {
      const signUpRequest = {
        ...loginRequest,
        extraQueryParameters: {
          // This forces SUSI to show Sign Up tab first
          "prompt": "create"
        }
      };
      
      const res = await instance.loginPopup(signUpRequest);
      if (res?.account) instance.setActiveAccount(res.account);
      router.replace("/onboarding");
    } catch (e: any) {
      const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
      if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
        const signUpRedirectRequest = {
          ...loginRequest,
          extraQueryParameters: {
            "prompt": "create"
          }
        };
        await instance.loginRedirect(signUpRedirectRequest);
        return;
      }
      console.error("signup failed:", e);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = async () => {
    if (!isMsalInitialized) return;
    await instance.logoutRedirect();
    setMenuOpen(false);
  };
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
          <Typography>Loading...</Typography>
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

          {!isAuthenticated ? (
            <FlexBox alignItems="center" style={{ gap: "20px" }}>
              <Box className="profile-icon" onClick={handleLogin} role="button" aria-label="Sign in">
                <Icon size="30px" color="#002180">profile</Icon>
              </Box>
              <Button className="become-partner-btn" variant="outlined" onClick={() => goto("/development")}>
                Become a Partner
              </Button>
              <Button className="sign-up-btn" variant="contained" 
                      onClick={handleSignUp}
                      >
                Sign Up
              </Button>
            </FlexBox>
          ) : (
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
          )}
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

            {!isAuthenticated ? (
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
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </FlexBox>
            ) : (
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
            )}
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