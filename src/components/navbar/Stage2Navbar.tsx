"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Search as SearchIcon, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest, logoutRequest } from "../../authConfig";

import Box from "../Box";
import FlexBox from "../FlexBox";
import { Button } from "../buttons";
import Container from "../Container";
import Categories from "../categories/Categories";
import StyledNavbar from "./marketStyles copy";

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

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const { instance, accounts } = useMsal();

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

  const startLogin = () => instance.loginRedirect(loginRequest).catch(console.error);
  const logout = () => instance.logoutRedirect(logoutRequest).catch(console.error);
  const goDashboard = () => (window.location.href = "/dashboard");

  // user display
  const { displayName, initials } = useMemo(() => {
    const name =
      accounts?.[0]?.name ||
      (accounts?.[0]?.username ? accounts[0].username.split("@")[0] : "") ||
      "Mark";
    const parts = name.trim().split(/\s+/);
    const ini = parts.length >= 2 ? parts[0][0] + parts[1][0] : (parts[0]?.slice(0, 2) || "MW");
    return { displayName: name, initials: ini.toUpperCase() };
  }, [accounts]);

  const handleProfileClick = () => {
    if (!accounts.length) startLogin();
    else setIsProfileOpen(v => !v);
  };

  return (
    <StyledNavbar
      style={{
        height: isSmDown ? 60 : 72,
        background: "linear-gradient(90deg, #19E5C2 0%, #5A7BF6 60%, #8E5AF6 100%)",
        color: "#fff",
        zIndex: 1100,
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
        }}
      >
        {/* LEFT: brand + primary */}
        <FlexBox alignItems="center" style={{ gap: isLgDown ? 18 : 28, minWidth: 0 }}>
          {/* Brand */}
          <FlexBox alignItems="center" style={{ gap: 10 }}>
            <img
              src="/assets/images/tab_bar/Subtract.svg"
              alt="Enterprise Journey"
              style={{ height: isSmDown ? 22 : isMdDown ? 24 : 28, width: "auto" }}
            />
            {/* {!isSmDown && (
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontWeight: 800, letterSpacing: 0.4, fontSize: isMdDown ? 14 : 16 }}>ENTERPRISE</div>
                <div style={{ fontWeight: 800, letterSpacing: 0.4, fontSize: isMdDown ? 14 : 16, marginTop: -2 }}>
                  JOURNEY
                </div>
              </div>
            )} */}
          </FlexBox>

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
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>Explore</span>
                <ChevronDown size={16} />
              </button>
            </Categories>
          )}

          {/* Discover */}
          {!isLgDown && (
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
          {!isMdDown && (
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
              <SearchIcon size={16} color="white"/>
            </button>
          )}
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
                    zIndex: 1200,
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
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000 }}
            />
            <div
              style={{
                position: "fixed",
                top: isSmDown ? 60 : 72,
                left: 0,
                right: 0,
                background: "#fff",
                zIndex: 1001,
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

      <div
        className="modal"
        style={{
          display:
            dropShown || notifShown || notifCenterShown ? "block" : "none",
          position: "fixed", // Changed to fixed for better positioning
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: notifCenterShown
            ? "rgba(0, 0, 0, 0.7)"
            : "transparent",
          zIndex: 9999,
        }}
        onClick={handleModalOutsideClick}
      >
        {dropShown && (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              setNotifShown={setNotifShown}
              setDropShown={setDropShown}
            />
          </div>
        )}

        {notifShown && (
          <div onClick={(e) => e.stopPropagation()}>
            <Notifications
              setNotifShown={setNotifShown}
              setNotifCenterShown={setNotifCenterShown}
            />
          </div>
        )}

        {notifCenterShown && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "green",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <NotificationCenter setNotifCenterShown={setNotifCenterShown} />
          </div>
        )}
      </div>
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
