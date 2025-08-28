"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bookmark, ChevronRight, LogOut, User } from "lucide-react";
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

import { loginRequest, logoutRequest } from "../../authConfig"; // ⬅️ use central config (adjust path if needed)

import Box from "../Box";
import Card from "../Card";
import Badge from "../badge";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import { Button } from "../buttons";
import Container from "../Container";
import Typography, { Span } from "../Typography";
import Categories from "../categories/Categories";
import StyledNavbar from "./marketStyles copy";

type NavbarProps = { navListOpen?: boolean };

export default function Navbar({ navListOpen }: NavbarProps) {
  const { instance, accounts } = useMsal();

  // 🧐 one-time debug to verify redirect in runtime (remove after confirming)
  useEffect(() => {
    const cfg = instance.getConfiguration();
    // Should print e.g. http://localhost:3000/callback OR https://mzn-e-hub-storefront.vercel.app/callback
    console.log("MSAL redirectUri =", cfg.auth.redirectUri);
  }, [instance]);

  // screen + mobile menu
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);

  // ✅ Start Azure B2C login using central request (no redirectUri here)
  const startLogin = () =>
    instance.loginRedirect(loginRequest).catch(console.error);

  const goDashboard = () => {
    window.location.href = "/dashboard";
  };

  const logout = () =>
    instance.logoutRedirect(logoutRequest).catch(console.error);

  // Desktop: click MW
  const handleProfileClick = () => {
    if (accounts.length === 0) {
      // not authenticated → go to Azure login
      startLogin();
    } else {
      // authenticated → toggle dropdown
      setIsProfileOpen(v => !v);
    }
  };

  return (
    <StyledNavbar>
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ position: "relative" }}
      >
        {/* Logo */}
        <Box
          className="navbar-logo"
          style={{
            zIndex: 1001,
            marginLeft: isMobile ? "16px" : "-88px",
          }}
        >
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt="MZN Enterprise Hub"
            height="100%"
            style={{ height: isMobile ? "32px" : "auto" }}
          />
        </Box>

        {/* Categories */}
        <Categories open={navListOpen}>
          <Button
            width="320px"
            height="40px"
            bg="body.default"
            variant="text"
            marginRight={550}
            borderRadius={6}
          >
            <img src="/images/explore.svg" alt="Explore" />
            <Typography
              mr="150px"
              flex="1 1 0"
              fontFamily='"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              fontSize="14px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="26px"
              color="#0030E3"
            >
              Explore
            </Typography>

            <Icon className="dropdown-icon" variant="small">
              chevron-right
              chevron-right
            </Icon>
          </Button>
        </Categories>

        {/* Desktop actions */}
        <FlexBox
          alignItems="center"
          style={{
            gap: "15px",
            marginRight: "-88px",
          }}
        >
          {/* Search */}
          <Box className="search-icon" style={{ cursor: "pointer" }}>
            <img src="/assets/images/logos/search.svg" alt="Search" height="20px" />
          </Box>

          {/* Bookmark */}
          <Box className="search-icon" style={{ cursor: "pointer" }}>
            <img src="/images/bookmark.svg" alt="Bookmark" height="24px" />
          </Box>

          {/* Profile initials (MW) */}
          <Box
            ref={profileRef}
            className="profile-photo"
            style={{ position: "relative" }}
          >
            <div
              className="profile-initials"
              style={{ cursor: "pointer" }}
              onClick={handleProfileClick}
              onKeyDown={(e) => (e.key === "Enter" ? handleProfileClick() : null)}
              role="button"
              tabIndex={0}
            >
              MW
            </div>

            {/* Dropdown (authenticated only) */}
            <AuthenticatedTemplate>
              {isProfileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "44px",
                    right: 0,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    minWidth: 200,
                    zIndex: 1200,
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={goDashboard}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      padding: "10px 12px",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <User size={18} />
                    <span>View Dashboard</span>
                  </button>

                  <div style={{ height: 1, background: "#f1f3f5" }} />

                  <button
                    type="button"
                    onClick={logout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      padding: "10px 12px",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#dc2626",
                      fontWeight: 600,
                    }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </AuthenticatedTemplate>
          </Box>
        </FlexBox>

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            {/* Mobile hamburger */}
            <FlexBox
              alignItems="center"
              style={{
                marginRight: "16px",
                zIndex: 1001,
              }}
            >
              <Box
                onClick={() => setIsMobileMenuOpen(v => !v)}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                {isMobileMenuOpen ? <X size={24} color="#ffffff" /> : <Menu size={24} color="#ffffff" />}
              </Box>
            </FlexBox>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="mobile-menu-backdrop"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                    animation: "fadeIn 0.3s ease",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Panel */}
                <div
                  className="mobile-menu-panel"
                  style={{
                    position: "fixed",
                    top: "76px",
                    left: 0,
                    right: 0,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    zIndex: 1001,
                    padding: "24px 16px",
                    maxHeight: "calc(100vh - 76px)",
                    overflowY: "auto",
                    animation: "slideDown 0.3s ease",
                  }}
                >
                  {/* Explore */}
                  <Box
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <FlexBox
                      alignItems="center"
                      style={{ cursor: "pointer", gap: "12px" }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img
                        src="/images/explore.svg"
                        alt="Explore"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <Typography
                        fontFamily='"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                        fontSize="16px"
                        fontWeight="500"
                        color="#0030E3"
                        flex="1"
                      >
                        Explore
                      </Typography>
                      <ChevronRight size={20} color="#0030E3" />
                    </FlexBox>
                  </Box>

                  {/* Grid actions */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "24px",
                    }}
                  >
                    <Box
                      style={{
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#e9ecef";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f8f9fa";
                      }}
                    >
                      <Search size={24} color="#0030E3" style={{ marginBottom: "8px" }} />
                      <Typography fontSize="14px" fontWeight="500" color="#0030E3">
                        Search
                      </Typography>
                    </Box>

                    <Box
                      style={{
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.3s ease",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#e9ecef";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#f8f9fa";
                      }}
                    >
                      <Bookmark size={24} color="#0030E3" style={{ marginBottom: "8px" }} />
                      <Typography fontSize="14px" fontWeight="500" color="#0030E3">
                        Bookmarks
                      </Typography>
                    </Box>
                  </div>

                  {/* Mobile user section */}
                  <Box
                    style={{
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <FlexBox alignItems="center" style={{ gap: "12px", marginBottom: 12 }}>
                      <div
                        className="profile-initials"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "#ffffff",
                          border: "2px solid #e9ecef",
                          color: "#000000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          fontWeight: "600",
                        }}
                      >
                        MW
                      </div>
                      <Box flex="1">
                        <Typography fontSize="16px" fontWeight="600" color="#333" style={{ marginBottom: "4px" }}>
                          My Account
                        </Typography>
                        <Typography fontSize="14px" color="#666">
                          Manage your profile and settings
                        </Typography>
                      </Box>
                    </FlexBox>

                    {/* Authenticated-only: buttons */}
                    <AuthenticatedTemplate>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <Button
                          variant="outlined"
                          onClick={() => { setIsMobileMenuOpen(false); goDashboard(); }}
                        >
                          Dashboard
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                        >
                          Logout
                        </Button>
                      </div>
                    </AuthenticatedTemplate>

                    {/* Unauthenticated: show Sign In */}
                    <UnauthenticatedTemplate>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => { setIsMobileMenuOpen(false); startLogin(); }}
                        >
                          Sign In
                        </Button>
                      </div>
                    </UnauthenticatedTemplate>
                  </Box>
                </div>
              </>
            )}
          </>
        )}
      </Container>

      {/* animations */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </StyledNavbar>
  );
}
