"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, Search as SearchIcon, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { loginRequest, logoutRequest } from "../../authConfig";

import Box from "../Box";
import FlexBox from "../FlexBox";
import { Button } from "../buttons";
import Container from "../Container";
import Typography from "../Typography";
import Categories from "../categories/Categories";
import StyledNavbar from "./marketStyles copy";

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const { instance, accounts } = useMsal();

  // one-time debug
  useEffect(() => {
    const cfg = instance.getConfiguration();
    console.log("MSAL redirectUri =", cfg.auth.redirectUri);
  }, [instance]);

  // responsive & menus
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // profile dropdown (desktop)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close profile dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!isProfileOpen) return;
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isProfileOpen]);

  const startLogin = () => instance.loginRedirect(loginRequest).catch(console.error);
  const logout = () => instance.logoutRedirect(logoutRequest).catch(console.error);
  const goDashboard = () => (window.location.href = "/dashboard");

  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);

  // derive display name & initials
  const { displayName, initials } = useMemo(() => {
    const name =
      accounts?.[0]?.name ||
      (accounts?.[0]?.username ? accounts[0].username.split("@")[0] : "") ||
      "Mark"; // fallback to "Mark" to mirror screenshot
    const parts = name.trim().split(/\s+/);
    const ini =
      parts.length >= 2 ? (parts[0][0] + parts[1][0]) : (parts[0]?.slice(0, 2) || "MW");
    return { displayName: name, initials: ini.toUpperCase() };
  }, [accounts]);

  const handleProfileClick = () => {
    if (accounts.length === 0) startLogin();
    else setIsProfileOpen(v => !v);
  };

  return (
    <StyledNavbar
      style={{
        height: 72,
        background:
          "linear-gradient(90deg, #19E5C2 0%, #5A7BF6 60%, #8E5AF6 100%)",
        color: "#fff",
      }}
    >
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ position: "relative", gap: 16 }}
      >
        {/* LEFT: Brand + primary nav */}
        <FlexBox alignItems="center" style={{ gap: 28, minWidth: 0 }}>
          {/* Brand lockup */}
          <FlexBox alignItems="center" style={{ gap: 10 }}>
            <Box aria-label="Enterprise Journey" role="img">
              {/* If you have a brand mark, swap here */}
              <img
                src="/assets/images/tab_bar/Subtract.svg"
                alt="Enterprise Journey"
                style={{ height: 28, width: "auto" }}
              />
            </Box>
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontWeight: 800, letterSpacing: 0.4, fontSize: 16 }}>ENTERPRISE</div>
              <div style={{ fontWeight: 800, letterSpacing: 0.4, fontSize: 16, marginTop: -2 }}>
                JOURNEY
              </div>
            </div>
          </FlexBox>

          {/* Explore (opens Categories) */}
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
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.10)",
                color: "#fff",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Explore</span>
              <ChevronDown size={16} />
            </button>
          </Categories>

          {/* Discover AbuDhabi (simple link/button) */}
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

          {/* Search icon */}
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
              border: "1px solid rgba(255,255,255,0.35)",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/search")}
          >
            <SearchIcon size={16} />
          </button>
        </FlexBox>

        {/* RIGHT: Greeting + avatar */}
        <FlexBox alignItems="center" style={{ gap: 12 }}>
          {/* Greeting (desktop only, hides on narrow) */}
          <div className="greeting" style={{ display: isMobile ? "none" : "block" }}>
            <span style={{ opacity: 0.9, fontSize: 14 }}>Hi, {displayName.split(" ")[0]}</span>
            <ChevronDown size={16} style={{ marginLeft: 6, verticalAlign: "middle" }} />
          </div>

          {/* Avatar + dropdown */}
          <Box ref={profileRef} className="profile-photo" style={{ position: "relative" }}>
            <button
              type="button"
              onClick={handleProfileClick}
              aria-haspopup="menu"
              aria-expanded={isProfileOpen}
              style={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                background: "#fff",
                color: "#0A38F5",
                border: "2px solid #0A38F5",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
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
                    top: 48,
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

                  <button
                    type="button"
                    onClick={goDashboard}
                    style={menuItemStyle}
                  >
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

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
            style={{
              display: isMobile ? "inline-flex" : "none",
              height: 40,
              width: 40,
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
        </FlexBox>

        {/* Mobile sheet */}
        {isMobile && isMobileMenuOpen && (
          <>
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                zIndex: 1000,
              }}
            />
            <div
              style={{
                position: "fixed",
                top: 72,
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
              {/* Explore */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={mobileRow}
              >
                <span style={{ fontWeight: 600, color: "#0A38F5" }}>Explore</span>
                <ChevronRight size={18} color="#0A38F5" />
              </button>

              {/* Discover */}
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

              {/* Search */}
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

              {/* Auth section */}
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
    </StyledNavbar>
  );
}

/* ---- styles (small helpers) ---- */
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
