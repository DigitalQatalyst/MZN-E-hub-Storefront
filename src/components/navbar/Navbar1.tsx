"use client";
 
import { useState, useEffect } from "react";
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
import styled from "styled-components";
 
// Transparent Navbar Styled Component
const TransparentNavbar = styled(StyledNavbar)`
  background: transparent !important;
  backdrop-filter: none;
  box-shadow: none;
  border-bottom: none;
  position: relative;
  z-index: 1000;
  margin-top: 10px; /* Added 10px top margin */
 
  .navbar-container {
    max-width: none;
    margin: 0;
    padding: 20px 54px;
    width: 100%;
    display: flex; /* Ensure flex display for single line */
    align-items: center; /* Align all items vertically centered */
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
   
    img {
      width: 150px;
      height: auto;
    }
   
    .enterprise-text {
      display: block;
      font-size: 20px;
    }
   
    .journey-text {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-top: -2px;
    }
  }
 
  .explore-button {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0 16px;
    min-width: 140px;
    height: 44px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
   
    &:hover {
      background: rgba(255, 255, 255, 1) !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
 
    .explore-text {
      color: #002180;
      font-weight: 600;
      font-size: 16px;
    }
 
    .explore-icon {
      color: #002180;
    }
 
    .dropdown-icon {
      color: #002180;
    }
  }
 
  .nav-links {
    gap: 40px;
    margin-right: 40px;
    display: flex; /* Ensure nav links stay in line */
    align-items: center; /* Align nav links vertically */
   
    .nav-link {
      color: white !important;
      font-weight: 500;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 8px 0;
      position: relative;
     
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: white;
        transition: width 0.3s ease;
      }
     
      &:hover {
        color: rgba(255, 255, 255, 0.9) !important;
       
        &::after {
          width: 100%;
        }
      }
    }
  }
 
  .right-section {
    gap: 24px; /* Adjusted base gap for right section */
    align-items: center;
    display: flex; /* Ensure right section items stay in line */
  }
 
  .search-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease;
   
    &:hover {
      transform: scale(1.1);
    }
   
    svg, img {
      filter: brightness(0) invert(1);
    }
  }
 
  .profile-icon {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: transform 0.3s ease;
   
    &:hover {
      transform: scale(1.1);
    }
   
    svg, img {
      filter: brightness(0) invert(1);
    }
  }
 
  .become-partner-btn {
    background: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 140px;
    margin-right: 2px; /* Reduced gap to 2px between buttons */
   
    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      border-color: white !important;
      transform: translateY(-1px);
    }
  }
 
  .sign-up-btn {
    background: white !important;
    color: #0000FF !important;
    border: 2px solid white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 100px;
   
    &:hover {
      background: rgba(255, 255, 255, 0.9) !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
 
  // Mobile responsiveness
  @media (max-width: 1024px) {
    .nav-links {
      gap: 24px;
      margin-right: 24px;
    }
   
    .become-partner-btn {
      min-width: 120px;
      font-size: 13px;
      padding: 8px 16px;
      margin-right: 2px; /* Maintain 2px gap */
    }
   
    .sign-up-btn {
      min-dwidth: 80px;
      font-size: 13px;
      padding: 8px 16px;
    }
   
    .right-section {
      gap: 24px;
    }
  }
 
  @media (max-width: 768px) {
    .navbar-container {
      padding: 16px 20px;
    }
   
    .nav-links {
      display: none;
    }
   
    .right-section {
      gap: 12px;
    }
   
    .become-partner-btn,
    .sign-up-btn {
      font-size: 12px;
      padding: 6px 12px;
      min-width: auto;
      margin-right: 2px; /* Maintain 2px gap */
    }
  }
 
  @media (max-width: 480px) {
    .navbar-container {
      padding: 12px 16px;
    }
   
    .enterprise-logo {
      font-size: 18px;
     
      img {
        width: 120px;
      }
     
      .enterprise-text {
        font-size: 16px;
      }
     
      .journey-text {
        font-size: 14px;
      }
    }
   
    .explore-button {
      min-width: 120px;
      height: 40px;
     
      .explore-text {
        font-size: 14px;
      }
    }
  }
`;
 
interface Nav {
  url: string;
  child: Nav[];
  title: string;
  badge?: string;
  extLink?: boolean;
}
 
type NavbarProps = { navListOpen?: boolean };
 
export default function Navbar({ navListOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  return (
    <TransparentNavbar className={scrolled ? 'scrolled' : ''}>
      <Container
        className="navbar-container"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box className="enterprise-logo" mr="57px">
          <NavLink href="/">
            <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
          </NavLink>
        </Box>
 
        <Categories open={navListOpen}>
          <Button
            className="categories-button"
            width="278px"
            height="40px"
            bg="body.default"
            variant="text"
          >
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon>categories</Icon>
                <Typography
                  className="typography"
                  ml="5px"
                  fontFamily='"Open Sans", sans-serif'
                  fontSize="16px"
                  fontStyle="normal"
                  fontWeight="600"
                  lineHeight="26px"
                  color="#002180"
                >
                  Explore
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">
                chevron-down
              </Icon>
            </FlexBox>
          </Button>
        </Categories>
 
        <Box flex="1" />
 
        <FlexBox className="nav-links">
          <NavLink className="nav-link" href="/development">
            Discover AbuDhabi
          </NavLink>
          <NavLink className="nav-link" href="/faq">
            Help Centre
          </NavLink>
        </FlexBox>
 
        <FlexBox className="right-section">
          <Box className="search-icon">
            <img src="/assets/images/logos/search.svg" alt="Search" />
          </Box>
 
          <Box className="profile-icon">
            <img src="/assets/images/logos/profile.svg" alt="Profile" />
          </Box>
 
          <Button className="become-partner-btn" variant="outlined">
            Become a Partner
          </Button>
 
          <Button className="sign-up-btn" variant="contained">
            Sign Up
          </Button>
        </FlexBox>
      </Container>
    </TransparentNavbar>
  );
}