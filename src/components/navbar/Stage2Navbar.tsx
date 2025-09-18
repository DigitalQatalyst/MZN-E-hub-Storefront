"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search as SearchIcon, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest } from "../../lib/authConfig";
import { InteractionStatus, AccountInfo } from "@azure/msal-browser";

import Box from "../Box";
import FlexBox from "../FlexBox";
import { Button } from "../buttons";
import Container from "../Container";
import Categories from "../categories/Categories";
import StyledNavbar from "./marketStyles copy";

type Claims = {
  emails?: string[];
  email?: string;
  preferred_username?: string;
  "signInNames.emailAddress"?: string;
  [k: string]: unknown;
};

function getEmailFromClaims(acct?: AccountInfo): string | undefined {
  const c = acct?.idTokenClaims as Claims | undefined;
  return (
    c?.emails?.[0] ??
    c?.email ??
    c?.["signInNames.emailAddress"] ??
    c?.preferred_username ??
    acct?.username
  );
}

function looksSynthetic(upn?: string) {
  if (!upn) return true;
  const onMs = /@.*\.onmicrosoft\.com$/i.test(upn);
  const guidLocal = /^[0-9a-f-]{36}@/i.test(upn) || upn.includes("#EXT#");
  return onMs && guidLocal;
}




/** ---------- responsive helper ---------- */
function useBreakpoint(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

type NavbarProps = {
  navListOpen?: boolean;
  /** Optional modal components so this file compiles even if you don't use them */
  DropdownComponent?: React.ComponentType<{ setNotifShown: (v: boolean) => void; setDropShown: (v: boolean) => void }>;
  NotificationsComponent?: React.ComponentType<{
    setNotifShown: (v: boolean) => void;
    setNotifCenterShown: (v: boolean) => void;
  }>;
  NotificationCenterComponent?: React.ComponentType<{ setNotifCenterShown: (v: boolean) => void }>;
};

export default function Navbar({
  navListOpen,
  DropdownComponent,
  NotificationsComponent,
  NotificationCenterComponent,
}: NavbarProps) {
  const { instance, accounts, inProgress } = useMsal();
  const [isMsalInitialized, setIsMsalInitialized] = useState(false);


  
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setIsMsalInitialized(true);
    }
  }, [inProgress]);


  // debug
  useEffect(() => {
    const cfg = instance.getConfiguration();
    console.log("MSAL redirectUri =", cfg.auth.redirectUri);
  }, [instance]);

  // breakpoints
  const isLgDown = useBreakpoint("(max-width: 1200px)");
  const isMdDown = useBreakpoint("(max-width: 900px)");
  const isSmDown = useBreakpoint("(max-width: 600px)");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // modal states (were missing)
  const [dropShown, setDropShown] = useState(false);
  const [notifShown, setNotifShown] = useState(false);
  const [notifCenterShown, setNotifCenterShown] = useState(false);


  // close profile on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isProfileOpen) return;
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isProfileOpen]);
  
  const goDashboard = () => (window.location.href = "/dashboard");

  // Derive active account safely after MSAL initialized
  const activeAccount: AccountInfo | undefined = useMemo(() => {
    if (!isMsalInitialized) return undefined;
    try {
      return instance.getActiveAccount() ?? accounts[0];
    } catch (error) {
      console.warn("Error getting active account:", error);
      return undefined;
    }
  }, [instance, accounts, isMsalInitialized]);

  if (activeAccount) {
  // ID token is inside the account object
  const idTokenClaims = activeAccount.idTokenClaims;
  console.log("Decoded claims:", idTokenClaims);

  // If you want the raw token (to paste into jwt.ms)
  instance.acquireTokenSilent({
    account: activeAccount,
    scopes: ["openid", "profile", "email"],
  }).then(result => {
    console.log("ID Token (paste into jwt.ms):", result.idToken);
  });
}

  // after you compute `activeAccount`
const emailFromToken = useMemo(() => getEmailFromClaims(activeAccount), [activeAccount]);
const [resolvedEmail, setResolvedEmail] = useState<string | undefined>(emailFromToken);

useEffect(() => {
  let cancelled = false;
  async function run() {
    if (!activeAccount || (emailFromToken && !looksSynthetic(emailFromToken))) {
      setResolvedEmail(emailFromToken);
      return;
    }
    try {
      // needs "User.Read" in scopes and consented
      const token = await instance.acquireTokenSilent({
        ...loginRequest,
        scopes: ["User.Read"],
        account: activeAccount,
      });
      const r = await fetch(
        "https://graph.microsoft.com/v1.0/me?$select=mail,userPrincipalName,otherMails",
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
      );
      const me = await r.json();
      const real =
        me.mail ??
        (me.otherMails?.[0] as string | undefined) ??
        me.userPrincipalName ??
        emailFromToken;
      if (!cancelled) setResolvedEmail(real);
      if (process.env.NODE_ENV !== "production") {
        console.log("[Graph /me]", { mail: me.mail, otherMails: me.otherMails, upn: me.userPrincipalName, chosen: real });
      }
    } catch (e) {
      if (!cancelled) setResolvedEmail(emailFromToken);
      if (process.env.NODE_ENV !== "production") console.warn("Graph lookup failed:", e);
    }
  }
  run();
  return () => { cancelled = true; };
}, [activeAccount, emailFromToken, instance]);

// Use `resolvedEmail` in UI/logs
useEffect(() => {
  if (resolvedEmail && process.env.NODE_ENV !== "production") {
    console.log("[MSAL] Resolved email:", resolvedEmail);
  }
}, [resolvedEmail]);


  // Derive displayName and initials from activeAccount
  const { displayName, initials } = useMemo(() => {
    if (!activeAccount) return { displayName: "Mark", initials: "MW" };
    const name =
      activeAccount.name ||
      (activeAccount.idTokenClaims as any)?.name ||
      (activeAccount.idTokenClaims as any)?.given_name ||
      (activeAccount.idTokenClaims as any)?.emails?.[0] ||
      "Mark";
    const parts = name.trim().split(/\s+/);
    const ini = parts.length >= 2 ? parts[0][0] + parts[1][0] : (parts[0]?.slice(0, 2) || "MW");
    return { displayName: name, initials: ini.toUpperCase() };
  }, [activeAccount]);

  // Set active account on mount if missing
  useEffect(() => {
    if (!isMsalInitialized) return;
    try {
      if (!instance.getActiveAccount() && accounts[0]) {
        instance.setActiveAccount(accounts[0]);
      }
    } catch (error) {
      console.warn("Error setting active account:", error);
    }
  }, [accounts, instance, isMsalInitialized]);

    // Auth actions
  const startLogin = () => {
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return Promise.resolve();
    }
    return instance.loginRedirect(loginRequest).catch(console.error);
  };
  const logout = () => {
    if (!isMsalInitialized) return;
    instance
      .logoutRedirect({
        postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : "/",
      })
      .catch(console.error);
  };



  const handleProfileClick = () => {
    if (!accounts.length) startLogin();
    else setIsProfileOpen(v => !v);
  };

  // handle modal outside click (was missing)
  const handleModalOutsideClick = () => {
    setDropShown(false);
    setNotifShown(false);
    setNotifCenterShown(false);
  };

  return (
    <StyledNavbar
      style={{
        height: isSmDown ? 60 : 72,
        background: "linear-gradient(90deg, #19E5C2 0%, #5A7BF6 60%, #8E5AF6 100%)",
        color: "#fff",
        zIndex: 2000,
        position: "sticky",  // 👈 change from "relative" to "sticky"
        top: 0,              // 👈 required for sticky
        left: 0,
        right: 0,
        // Safari/iOS niceties
        willChange: "transform",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{
          position: "relative",
          paddingInline: isSmDown ? 12 : isMdDown ? 16 : 24,
          gap: 12,
          maxWidth: 1440,           // 👈 NEW
          marginInline: "auto",     // 👈 NEW (centers the row)
          width: "100%",  
        }}
      >
        {/* LEFT: brand + primary */}
        <FlexBox alignItems="center" style={{ gap: isLgDown ? 18 : 28, minWidth: 0, flex: 1 }}>
          {/* Brand */}
          <FlexBox alignItems="center" style={{ gap: 10 }}>
            <img
              src="/assets/images/tab_bar/Subtract.svg"
              alt="Enterprise Journey"
              style={{ height: isSmDown ? 22 : isMdDown ? 24 : 28, width: "auto" }}
            />
          </FlexBox>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              margin: "0 auto",        // 👈 centers within the left cluster
            }}
          > */}
            {/* Explore */}
            {!isMdDown && (
              <Categories open={navListOpen}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={!!navListOpen}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    height: 36,
                    padding: "0 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255, 255, 255, 0)",
                    background: "rgba(255, 255, 255, 0)",
                    color: "#fff",
                    cursor: "pointer",
                    backdropFilter: "blur(6px)",
                  }}
                  onClick={() => setDropShown(true)}
                >
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Explore</span>
                  <ChevronDown size={16} />
                </button>
              </Categories>
            )}

            {/* Discover */}
            {!isMdDown && (
              <button
                type="button"
                style={{
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
                onClick={() => (window.location.href = "/discover")}
              >
                Discover AbuDhabi
              </button>
            )}

            {/* Search */}
            {/* {!isMdDown && (
              <button
                type="button"
                aria-label="Search"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 36,
                  width: 36,
                  borderRadius: 18,
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0)",
                  cursor: "pointer",
                }}
                onClick={() => (window.location.href = "/search")}
              >
                <SearchIcon size={16} color="white" />
              </button>
            )} */}
          {/* </div> */}
        </FlexBox>

        {/* RIGHT: greeting + avatar + hamburger */}
        <FlexBox alignItems="center" style={{ gap: 10 }}>
          {/* Avatar */}
          <Box ref={profileRef} className="profile-photo" style={{ position: "relative" }}>
            <button
              type="button"
              onClick={handleProfileClick}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              style={{
                height: isSmDown ? 34 : 40,
                width: isSmDown ? 34 : 40,
                borderRadius: "50%",
                background: "#fff",
                color: "#0A38F5",
                border: "2px solid #0A38F5",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: isSmDown ? 12 : 14,
                cursor: "pointer",
              }}
            >
              {initials}
            </button>

            <AuthenticatedTemplate>
              {isProfileOpen && (
                <div
                  role="menu"
                  style={{
                    position: "absolute",
                    top: isSmDown ? 42 : 48,
                    right: 0,
                    background: "#fff",
                    color: "#111",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    minWidth: 220,
                    zIndex: 2200,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      fontSize: 13,
                      borderBottom: "1px solid #f1f3f5",
                      color: "#475569",
                    }}
                  >
                    Signed in as <strong>{displayName}</strong>
                    {resolvedEmail && (
                      <>
                        {resolvedEmail}
                      </>
                    )}
                  </div>

                  <button type="button" onClick={goDashboard} style={menuItemStyle}>
                    <User size={18} />
                    <span>View Dashboard</span>
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    style={{ ...menuItemStyle, color: "#dc2626", fontWeight: 600 }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </AuthenticatedTemplate>
          </Box>

          {/* Greeting hide on md- */}
          {!isMdDown && (
            <div className="greeting">
              <span style={{ opacity: 0.9, fontSize: 14 }}>Hi, {displayName.split(" ")[0]}</span>
              <ChevronDown size={16} style={{ marginLeft: 6, verticalAlign: "middle" }} />
            </div>
          )}

          {/* Hamburger shows on md- */}
          {isMdDown && (
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(v => !v)}
              style={{
                height: isSmDown ? 36 : 40,
                width: isSmDown ? 36 : 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(6px)",
                marginLeft: 4,
              }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </FlexBox>

        {/* MOBILE SHEET */}
        {isMdDown && isMobileMenuOpen && (
          <>
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1900 }}
            />
            <div
              style={{
                position: "fixed",
                top: isSmDown ? 60 : 72,
                left: 0,
                right: 0,
                background: "#fff",
                zIndex: 1950,
                boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                padding: 16,
              }}
            >
              <button type="button" onClick={() => setIsMobileMenuOpen(false)} style={mobileRow}>
                <span style={{ fontWeight: 600, color: "#0A38F5" }}>Explore</span>
                <ChevronRight size={18} color="#0A38F5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/discover";
                }}
                style={mobileRow}
              >
                <span>Discover AbuDhabi</span>
                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/search";
                }}
                style={mobileRow}
              >
                <FlexBox alignItems="center" style={{ gap: 10 }}>
                  <SearchIcon size={18} />
                  <span>Search</span>
                </FlexBox>
              </button>

              <AuthenticatedTemplate>
                <div style={{ height: 1, background: "#eee", margin: "8px 0 12px" }} />
                <FlexBox alignItems="center" style={{ gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      height: 42,
                      width: 42,
                      borderRadius: "50%",
                      border: "2px solid #0A38F5",
                      color: "#0A38F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{displayName}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Signed in</div>
                  </div>
                </FlexBox>

                <div style={{ display: "flex", gap: 10 }}>
                  <Button onClick={() => { setIsMobileMenuOpen(false); goDashboard(); }}>
                    Dashboard
                  </Button>
                  <Button variant="outlined" onClick={() => { setIsMobileMenuOpen(false); logout(); }}>
                    Logout
                  </Button>
                </div>
              </AuthenticatedTemplate>

              <UnauthenticatedTemplate>
                <div style={{ height: 1, background: "#eee", margin: "8px 0 12px" }} />
                <Button onClick={() => { setIsMobileMenuOpen(false); startLogin(); }}>
                  Sign In
                </Button>
              </UnauthenticatedTemplate>
            </div>
          </>
        )}
      </Container>

      {/* small CSS helpers */}
      <style jsx>{`
        @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
          .supports-blur {
            backdrop-filter: blur(6px);
          }
        }
      `}</style>

      {/* Optional modal layer (now safe & typed) */}
      {(dropShown || notifShown || notifCenterShown) && (
        <div
          className="modal"
          onClick={handleModalOutsideClick}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: notifCenterShown ? "rgba(0,0,0,0.7)" : "transparent",
            zIndex: 2500, // on top of navbar
          }}
        >
          {/* stop propagation so inner clicks don't close */}
          <div onClick={(e) => e.stopPropagation()}>
            {!!DropdownComponent && dropShown && (
              <DropdownComponent setNotifShown={setNotifShown} setDropShown={setDropShown} />
            )}
            {!!NotificationsComponent && notifShown && (
              <NotificationsComponent
                setNotifShown={setNotifShown}
                setNotifCenterShown={setNotifCenterShown}
              />
            )}
            {!!NotificationCenterComponent && notifCenterShown && (
              <div style={{ backgroundColor: "green", width: "fit-content", margin: "0 auto" }}>
                <NotificationCenterComponent setNotifCenterShown={setNotifCenterShown} />
              </div>
            )}
          </div>
        </div>
      )}
    </StyledNavbar>
  );
}

/* shared styles */
const menuItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  padding: "10px 12px",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: 14,
};

const mobileRow: React.CSSProperties = {
  width: "100%",
  padding: "12px 10px",
  borderRadius: 10,
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 10,
};