"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

// ⬅️ replace your current auth imports at the top
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus, EventType,  AuthenticationResult, EventMessage, } from "@azure/msal-browser";
import { loginRequest } from "@lib/authConfig";


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
    .enterprise-text { display: block; font-size: 20px; }
    .journey-text { display: block; font-size: 16px; font-weight: 600; margin-top: -2px; }
  }

  .explore-button {
    background: rgba(255,255,255,0.95) !important;
    border: 1px solid rgba(255,255,255,0.2);
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
      &::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: white; }
    }
  }

  .right-section { gap: 24px; align-items: center; display: flex; }

  .search-icon, .profile-icon, .hamburger-icon {
    cursor: pointer; transition: transform 0.3s ease;
    svg, img { filter: brightness(0) invert(1); }
  }
  .search-icon { width: 24px; height: 20px; }
  .profile-icon { width: 68px; height: 32px; }
  .hamburger-icon { width: 24px; height: 24px; display: none; }

  .mobile-menu {
    position: fixed; top: 0; right: 0; width: 80%; max-width: 300px; height: 100vh;
    background: linear-gradient(224.55deg,#7693F3 0.02%,#7693F3 11.72%,#7693F1 21.24%,#7594EF 28.92%,#7594EC 35.08%,#7495E9 40.08%,#7496E5 44.24%,#7397E0 47.89%,#7298DC 51.38%,#7299D7 55.03%,#719AD2 59.19%,#709BCD 64.18%,#6F9CC8 70.35%,#6E9DC3 78.03%,#6E9EBE 87.54%,#6D9FBA 99.24%);
    padding: 20px; z-index: 1001; transform: translateX(100%); transition: transform 0.3s ease-in-out;
    &.open { transform: translateX(0); }

    .mobile-nav-links { flex-direction: column; gap: 20px; margin-top: 40px; justify-content: flex-start; 
      .nav-link { color: white !important; font-size: 18px; font-weight: 600; padding: 10px 0; }
    }

    .mobile-right-section { flex-direction: column; margin-top: 20px; justify-content: flex-start;
      .profile-icon { width: 44px; height: 30px; }
      .search-icon { width: 44px; height: 30px; }
    }

    .mobile-explore-button { width: 100%; justify-content: flex-start; margin-top: 20px; }
  }

  .become-partner-btn {
    background: transparent !important; border: 2px solid rgba(255,255,255,0.8) !important;
    color: white !important; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 8px;
    transition: all 0.3s ease; min-width: 140px; cursor: pointer;
    &:hover { background: rgba(255,255,255,0.1) !important; transform: translateY(-2px); }
  }

  .sign-up-btn {
    background: white !important; color: #0000FF !important; border: 2px solid white !important;
    font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 8px; transition: all 0.3s ease;
    min-width: 100px; cursor: pointer; &:hover { background: #f0f0f0 !important; transform: translateY(-2px); }
  }

  @media (max-width: 1024px) {
    .navbar-container { padding: 16px 40px; }
    .enterprise-logo { font-size: 20px; img { width: 130px; } .enterprise-text { font-size: 18px; } .journey-text { font-size: 14px; } }
    .nav-links { gap: 20px; margin-right: 20px; .nav-link { font-size: 14px; } }
    .explore-button { min-width: 120px; height: 40px; .explore-text { font-size: 14px; } }
    .become-partner-btn { min-width: 120px; font-size: 13px; padding: 8px 16px; }
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

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);

  const router = useRouter();
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  useHydrateActiveAccount();

  const name =
    instance.getActiveAccount()?.idTokenClaims?.name ||
    instance.getActiveAccount()?.username ||
    accounts[0]?.username ||
    "Signed in";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);
  useEffect(() => {
    if (!isMsalInitialized) return;
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

  const toggleMenu = () => setMenuOpen(v => !v);


  // in your navbar
// ⬅️ put inside your component, replace your handleLogin / handleLogout implementations

// login (popup first; redirect fallback)
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



// Optional: when you need an access token for APIs
// const ensureToken = async () => {
//   try {
//     const res = await instance.acquireTokenSilent(getLoginRedirectRequest("susi"));
//     return res.accessToken;
//   } catch (err) {
//     if (err instanceof InteractionRequiredAuthError) {
//       await instance.acquireTokenRedirect(getLoginRedirectRequest("susi"));
//     } else {
//       console.error(err);
//     }
//   }
// };


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

          <FlexBox alignItems="center" style={{ gap: "10px" }}>
              {/* ...inside your existing JSX where the buttons are... */}
              {!isAuthenticated ? (
                <Box
                  className="profile-icon"
                  onClick={handleLogin}
                  style={{ width: 68, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {isLoading ? "Signing in..." : <Icon size="30px" color="#002180">profile</Icon>}
                  {/* <Typography color="white" fontSize="14px" style={{opacity:0.85}}>{name}</Typography> */}
                </Box>
              ) : (
                <div>
                  <Button onClick={handleLogout}>Sign Out</Button>
                </div>
              )}

              <Button className="become-partner-btn" variant="outlined">
                Become a Partner
              </Button>

              <Button
                className="sign-up-btn"
                variant="contained"
                onClick={handleSignUp}  // SUSI shows "Create account"
              >
                Sign Up
              </Button>

          </FlexBox>
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

            <FlexBox className="mobile-auth-section" flexDirection="column" style={{ gap: "16px" }}>
              <Box className="profile-icon" onClick={handleLogin}>
                <Icon size="44px" color="#002180">profile</Icon>
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
              >
                Become a Partner
              </Button>
              <Button
                className="mobile-auth-button sign-up-btn"
                onClick={handleLogin}
                style={{ background: "white", color: "#0000FF", border: "2px solid white", padding: "10px", borderRadius: "6px" }}
              >
                Sign Up
              </Button>
            </FlexBox>
          </FlexBox>
        </Box>
      </Container>
    </StyledNavbar>
  );
}
