"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Add Next.js router
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

import StyledNavbar from "./authStyles";

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
  // Next.js router for navigation
  const router = useRouter();

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

  const handleLogoClick = () => {
  router.push('/');
  // Close mobile menu if it's open
  if (isMobileMenuOpen) {
    closeMobileMenu();
  }
};

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on menu items
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle bookmark/favorites navigation
  const handleFavoritesNavigation = () => {
    router.push('/favourites');
    // Close mobile menu if it's open
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
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
          onClick={handleLogoClick}
          title="Go to Home" // Accessibility improvement
          style={{
            zIndex: 1001,
            marginLeft: isMobile ? "16px" : "-88px",
            cursor: "pointer", // Indicate it's clickable
            transition: "opacity 0.2s ease", // Smooth hover effect
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <img
            src="/assets/images/tab_bar/Subtract.svg"
            alt="MZN Enterprise Hub - Go to Home"
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
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.15625 1.67578V5.61328C7.15625 5.91165 7.03772 6.1978 6.82675 6.40878C6.61577 6.61976 6.32962 6.73828 6.03125 6.73828H2.09375C1.79538 6.73828 1.50923 6.61976 1.29825 6.40878C1.08728 6.1978 0.96875 5.91165 0.96875 5.61328V1.67578C0.96875 1.37741 1.08728 1.09126 1.29825 0.880286C1.50923 0.669308 1.79538 0.550781 2.09375 0.550781H6.03125C6.32962 0.550781 6.61577 0.669308 6.82675 0.880286C7.03772 1.09126 7.15625 1.37741 7.15625 1.67578ZM13.9062 0.550781H9.96875C9.67038 0.550781 9.38423 0.669308 9.17325 0.880286C8.96228 1.09126 8.84375 1.37741 8.84375 1.67578V5.61328C8.84375 5.91165 8.96228 6.1978 9.17325 6.40878C9.38423 6.61976 9.67038 6.73828 9.96875 6.73828H13.9062C14.2046 6.73828 14.4908 6.61976 14.7017 6.40878C14.9127 6.1978 15.0312 5.91165 15.0312 5.61328V1.67578C15.0312 1.37741 14.9127 1.09126 14.7017 0.880286C14.4908 0.669308 14.2046 0.550781 13.9062 0.550781ZM6.03125 8.42578H2.09375C1.79538 8.42578 1.50923 8.54431 1.29825 8.75529C1.08728 8.96627 0.96875 9.25241 0.96875 9.55078V13.4883C0.96875 13.7867 1.08728 14.0728 1.29825 14.2838C1.50923 14.4948 1.79538 14.6133 2.09375 14.6133H6.03125C6.32962 14.6133 6.61577 14.4948 6.82675 14.2838C7.03772 14.0728 7.15625 13.7867 7.15625 13.4883V9.55078C7.15625 9.25241 7.03772 8.96627 6.82675 8.75529C6.61577 8.54431 6.32962 8.42578 6.03125 8.42578ZM11.9375 8.42578C11.3256 8.42578 10.7275 8.60723 10.2187 8.94717C9.70994 9.28712 9.31341 9.7703 9.07925 10.3356C8.84509 10.9009 8.78382 11.523 8.9032 12.1231C9.02257 12.7232 9.31722 13.2745 9.74989 13.7071C10.1826 14.1398 10.7338 14.4345 11.3339 14.5538C11.9341 14.6732 12.5561 14.6119 13.1214 14.3778C13.6867 14.1436 14.1699 13.7471 14.5099 13.2383C14.8498 12.7296 15.0312 12.1314 15.0312 11.5195C15.0312 10.699 14.7053 9.91211 14.1251 9.33192C13.5449 8.75173 12.758 8.42578 11.9375 8.42578Z" fill="#002180" />
                </svg>

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

              {/* Bookmark Icon - Updated with navigation */}
              <Box
                className="search-icon"
                style={{ cursor: "pointer" }}
                onClick={handleFavoritesNavigation}
                title="Go to Favorites" // Added tooltip for better UX
              >
                <Bookmark size={20} color="#ffffff" />
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

                    {/* Bookmarks - Updated with navigation */}
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
                      onClick={handleFavoritesNavigation} // Updated to use navigation handler
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
                        Favorites
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
