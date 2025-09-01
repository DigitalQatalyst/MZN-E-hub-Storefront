"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "../../Box";
import Icon from "../../icon/Icon";
import FlexBox from "../../FlexBox";
import NavLink from "../../nav-link";
import { Button } from "../../buttons";
import Container from "../../Container";
import Typography from "../../Typography";
import Categories from "../../categories/Categories";
import { StyledNavbar } from "./styles";
import Signup from "./signup";
import Signin from "./signin";
import Search from "./search";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const loginUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_SignIn&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=openid&response_type=code&prompt=login";

  return (
    <StyledNavbar className={scrolled ? "scrolled" : ""}>
      <Container
        className="navbar-container"
        height="100%"
        display="flex"
        align-items="center"
        justify-content="space-between"
      >
        <Box className="enterprise-logo" mr="20px">
          <NavLink href="/">
            <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
          </NavLink>
        </Box>

        <Categories open={navListOpen}>
          <Button className="explore-button" width="278px" height="34.409px" bg="body.default" variant="text">
            <FlexBox justifyContent="space-between" alignItems="center" width="100%">
              <FlexBox alignItems="center">
                <Icon className="explore-icon">categories</Icon>
                <Typography className="explore-text" ml="5px" fontFamily="Inter" fontSize="14px" fontWeight="600" lineHeight="26px" color="#002180">
                  Explore
                  {/* fontFamily='"Open Sans", sans-serif'  */}
                </Typography>
              </FlexBox>
              <Icon className="dropdown-icon" variant="small">chevron-down</Icon>
            </FlexBox>
          </Button>
        </Categories>

        <Box flex="1" />

        <FlexBox className="right-section">
          <FlexBox className="nav-links">
            <NavLink className="nav-link" href="/development">Discover AbuDhabi</NavLink>
            <NavLink className="nav-link" href="/faq">Help Centre</NavLink>
          </FlexBox>

          <Search />

          <Signin />
          <Button
            className="become-partner-btn"
            variant="outlined"
            onClick={() => {
              window.location.href = loginUrl;
            }}
          >
            Become a Partner
          </Button>
          <Signup />
        </FlexBox>

        <Box className="hamburger-icon" onClick={toggleMenu}>
          <Icon>menu</Icon>
        </Box>

        <Box className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Categories open={navListOpen}>
            <Button className="mobile-explore-button" width="100%" height="44px" bg="body.default" variant="text" onClick={toggleMenu}>
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

          <FlexBox className="mobile-right-section" flexDirection="column" style={{ gap: "10px" }}>
            <Search onClick={toggleMenu} />
            <Box className="profile-icon" onClick={toggleMenu}>
              <Icon size="44px" color="#002180">profile</Icon>
            </Box>
            <Signin onClick={toggleMenu} />
            <Button
              className="mobile-auth-button become-partner-btn"
              onClick={() => {
                window.location.href = loginUrl;
                toggleMenu();
              }}
              style={{
                background: "transparent",
                color: "#FFF",
                border: "2px solid rgba(255, 255, 255, 0.8)",
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "22px",
                padding: "10px",
                borderRadius: "6px"
              }}
            >
              Become a Partner
            </Button>
            <Signup />
          </FlexBox>
        </Box>
      </Container>
    </StyledNavbar>
  );
}