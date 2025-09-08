"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import type { AccountInfo } from "@azure/msal-browser";
import { Menu, X, Search, Bookmark, ChevronRight, LogOut, User } from "lucide-react";

import { loginRequest } from "../../lib/authConfig";

import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import { Button } from "../buttons";
import Categories from "../categories/Categories";
import StyledNavbar from "./marketStyles copy";

type NavbarProps = { navListOpen?: boolean };

function getInitials(name?: string) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]?.toUpperCase()).join("") || "U";
}

export default function Navbar({ navListOpen }: NavbarProps) {
  const router = useRouter();
  const { instance, accounts } = useMsal();

  // responsive + menus
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  // derive active account + name once
  const activeAccount: AccountInfo | undefined = useMemo(() => {
    return instance.getActiveAccount() ?? accounts[0];
  }, [instance, accounts]);

  const displayName =
    activeAccount?.name ||
    (activeAccount?.idTokenClaims as any)?.name ||
    (activeAccount?.idTokenClaims as any)?.given_name ||
    (activeAccount?.idTokenClaims as any)?.emails?.[0] ||
    "User";

  // set active account on mount if missing
  useEffect(() => {
    if (!instance.getActiveAccount() && accounts[0]) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // handle resize
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
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isProfileOpen]);

  // actions
  const toggleMobileMenu = () => setIsMobileMenuOpen(v => !v);

  const startLogin = () => {
    return instance.loginRedirect(loginRequest).catch(console.error);
  };

  const goDashboard = () => {
    setIsMobileMenuOpen(false);
    router.push("/dashboard");
  };

  const logout = () => {
    setIsMobileMenuOpen(false);
    instance
      .logoutRedirect({
        postLogoutRedirectUri: typeof window !== "undefined" ? window.location.origin : "/",
      })
      .catch(console.error);
  };

  const handleProfileClick = () => {
    if (!activeAccount) startLogin();
    else setIsProfileOpen(v => !v);
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
            style={{ height: isMobile ? 32 : 40 }}
          />
        </Box>

        {/* Explore */}
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
            <ChevronRight size={18} color="#0030E3" />
          </Button>
        </Categories>

        {/* Desktop actions */}
        <FlexBox
          alignItems="center"
          style={{ gap: "15px", marginRight: "-88px" }}
        >
          {/* Search */}
          <Box className="search-icon" style={{ cursor: "pointer" }} title="Search">
            <Search size={20} color="white"/>
          </Box>

          {/* Bookmark */}
          <Box className="bookmark-icon" style={{ cursor: "pointer" }} title="Bookmarks">
            <Bookmark size={22} color="white"/>
          </Box>

          {/* Profile */}
          <Box ref={profileRef} className="profile-photo" style={{ position: "relative" }}>
            <div
              className="profile-initials"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={handleProfileClick}
              onKeyDown={(e) => (e.key === "Enter" ? handleProfileClick() : null)}
              role="button"
              tabIndex={0}
              title={activeAccount ? displayName : "Sign in"}
            >
              {getInitials(displayName)}
            </div>

            {/* Dropdown (authenticated only) */}
            <AuthenticatedTemplate>
              {isProfileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: 44,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    minWidth: 220,
                    zIndex: 1200,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      borderBottom: "1px solid #f1f3f5",
                      fontWeight: 600,
                    }}
                  >
                    {displayName}
                  </div>

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
            <FlexBox alignItems="center" style={{ marginRight: 16, zIndex: 1001 }}>
              <Box
                onClick={toggleMobileMenu}
                style={{
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 6,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease",
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
                  role="button"
                  aria-label="Close menu"
                  tabIndex={0}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" ? setIsMobileMenuOpen(false) : null}
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                    animation: "fadeIn 0.3s ease",
                  }}
                />

                {/* Panel */}
                <div
                  style={{
                    position: "fixed",
                    top: 76,
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
                      marginBottom: 24,
                      padding: 16,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 12,
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <FlexBox
                      alignItems="center"
                      style={{ cursor: "pointer", gap: 12 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img src="/images/explore.svg" alt="Explore" width={24} height={24} />
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
                      gap: 16,
                      marginBottom: 24,
                    }}
                  >
                    <Box
                      style={{
                        padding: 16,
                        backgroundColor: "#f8f9fa",
                        borderRadius: 12,
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.2s ease",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Search size={24} color="#0030E3" style={{ marginBottom: 8 }} />
                      <Typography fontSize="14px" fontWeight="500" color="#0030E3">
                        Search
                      </Typography>
                    </Box>

                    <Box
                      style={{
                        padding: 16,
                        backgroundColor: "#f8f9fa",
                        borderRadius: 12,
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.2s ease",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Bookmark size={24} color="#0030E3" style={{ marginBottom: 8 }} />
                      <Typography fontSize="14px" fontWeight="500" color="#0030E3">
                        Bookmarks
                      </Typography>
                    </Box>
                  </div>

                  {/* Mobile user section */}
                  <Box
                    style={{
                      padding: 16,
                      backgroundColor: "#f8f9fa",
                      borderRadius: 12,
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <FlexBox alignItems="center" style={{ gap: 12, marginBottom: 12 }}>
                      <div
                        className="profile-initials"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: "#ffffff",
                          border: "2px solid #e9ecef",
                          color: "#000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(displayName)}
                      </div>
                      <Box flex="1">
                        <Typography fontSize="16px" fontWeight="600" color="#333" style={{ marginBottom: 4 }}>
                          My Account
                        </Typography>
                        <Typography fontSize="14px" color="#666">
                          Manage your profile and settings
                        </Typography>
                      </Box>
                    </FlexBox>

                    <AuthenticatedTemplate>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <Button variant="outlined" onClick={goDashboard}>
                          Dashboard
                        </Button>
                        <Button variant="contained" color="primary" onClick={logout}>
                          Logout
                        </Button>
                      </div>
                    </AuthenticatedTemplate>

                    <UnauthenticatedTemplate>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            startLogin();
                          }}
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
