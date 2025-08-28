"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, Bookmark, ChevronRight } from "lucide-react";
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


import StyledNavbar from "./marketStyles";

interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge: string;
  extLink?: boolean;
}


type NavbarProps = { navListOpen?: boolean; };

// ==============================================================


export default function Navbar({ navListOpen }: NavbarProps) {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for screen size detection
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      // Close mobile menu when switching to desktop
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on menu items
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <StyledNavbar>
      <Container
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        style={{ position: 'relative' }}
      >
        {/* Logo Section - Always visible */}
        <Box
          className="navbar-logo"
          style={{
            zIndex: 1001,
            marginLeft: isMobile ? "16px" : "-88px"
          }}
        >
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt="MZN Enterprise Hub"
            height="100%"
            style={{
              height: isMobile ? "32px" : "auto"
            }}
          />
        </Box>

        {/* Desktop Navigation - Hidden on mobile */}
        {!isMobile && (
          <>
            {/* Categories Section */}
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
                </Icon>
              </Button>
            </Categories>

            {/* Desktop User Actions */}
            <FlexBox
              alignItems="center"
              style={{
                gap: "15px",
                marginRight: "-88px"
              }}
            >
              {/* Search Icon */}
              <Box className="search-icon" style={{ cursor: "pointer" }}>
                <img src="/assets/images/logos/search.svg" alt="Search" height="20px" />
              </Box>

              {/* Bookmark Icon */}
              <Box className="search-icon" style={{ cursor: "pointer" }}>
                <img src="/images/bookmark.svg" alt="Bookmark" height="24px" />
              </Box>

              {/* User Profile Photo */}
              <Box className="profile-photo" style={{ cursor: "pointer" }}>
                <div className="profile-initials">MW</div>
              </Box>
            </FlexBox>
          </>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            {/* Mobile Hamburger Menu Button Only */}
            <FlexBox
              alignItems="center"
              style={{
                marginRight: "16px",
                zIndex: 1001
              }}
            >
              {/* Hamburger Menu Button */}
              <Box
                onClick={toggleMobileMenu}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                {isMobileMenuOpen ? (
                  <X size={24} color="#ffffff" />
                ) : (
                  <Menu size={24} color="#ffffff" />
                )}
              </Box>
            </FlexBox>

            {/* Mobile Menu Overlay */}
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
                    animation: "fadeIn 0.3s ease"
                  }}
                  onClick={closeMobileMenu}
                />

                {/* Mobile Menu Panel */}
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
                    animation: "slideDown 0.3s ease"
                  }}
                >
                  {/* Mobile Explore Section */}
                  <Box
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    <FlexBox
                      alignItems="center"
                      style={{
                        cursor: "pointer",
                        gap: "12px"
                      }}
                      onClick={closeMobileMenu}
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

                  {/* Mobile Actions Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginBottom: "24px"
                    }}
                  >
                    {/* Search */}
                    <Box
                      style={{
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.3s ease"
                      }}
                      onClick={closeMobileMenu}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e9ecef";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                      }}
                    >
                      <Search size={24} color="#0030E3" style={{ marginBottom: "8px" }} />
                      <Typography
                        fontSize="14px"
                        fontWeight="500"
                        color="#0030E3"
                      >
                        Search
                      </Typography>
                    </Box>

                    {/* Bookmarks */}
                    <Box
                      style={{
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "background-color 0.3s ease"
                      }}
                      onClick={closeMobileMenu}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e9ecef";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                      }}
                    >
                      <Bookmark size={24} color="#0030E3" style={{ marginBottom: "8px" }} />
                      <Typography
                        fontSize="14px"
                        fontWeight="500"
                        color="#0030E3"
                      >
                        Bookmarks
                      </Typography>
                    </Box>
                  </div>

                  {/* Mobile User Section */}
                  <Box
                    style={{
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                      border: "1px solid #e9ecef"
                    }}
                  >
                    <FlexBox
                      alignItems="center"
                      style={{ gap: "12px" }}
                    >
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
                          fontWeight: "600"
                        }}
                      >
                        MW
                      </div>
                      <Box flex="1">
                        <Typography
                          fontSize="16px"
                          fontWeight="600"
                          color="#333"
                          style={{ marginBottom: "4px" }}
                        >
                          My Account
                        </Typography>
                        <Typography
                          fontSize="14px"
                          color="#666"
                        >
                          Manage your profile and settings
                        </Typography>
                      </Box>
                    </FlexBox>
                  </Box>
                </div>
              </>
            )}
          </>
        )}
      </Container>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            transform: translateY(-20px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
      `}</style>
    </StyledNavbar>
  );
}