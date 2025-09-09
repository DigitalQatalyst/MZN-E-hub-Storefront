"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import ExploreModal from "@component/mobile-responsiveness/ExploreModal";

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
  const [activeItem, setActiveItem] = useState("/");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <StyledNavbar className={scrolled ? "scrolled" : ""}>
      <Container
        className="navbar-container"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems={"center"}>
          <Box className="enterprise-logo" mr="40px">
            <NavLink href="/">
              <img
                src="/assets/images/logos/mzn_logo.svg"
                alt="Enterprise Journey Logo"
              />
            </NavLink>
          </Box>
          <Categories open={navListOpen}>
            <FlexBox alignItems="center" mr="40px">
              <Typography
                className="explore-text"
                ml="5px"
                fontSize="14px"
                fontWeight="500"
                lineHeight="20px"
                color="#FFF"
                letterSpacing="-0.1px"
              >
                Explore
              </Typography>
              <Image
                src="/assets/images/icons/dropdown_latest.svg"
                alt="Dropdown"
                width={24} // Adjust width as needed to match the icon size
                height={24} // Adjust height as needed to match the icon size
                style={{ marginTop: "2px" }} // Adjust margin to align with text
              />
            </FlexBox>
          </Categories>
          <NavLink
            className="nav-link"
            href="/development"
            style={{
              color: "#FFF !important",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "-0.1px",
            }}
            mr="40px"
          >
            Discover AbuDhabi
          </NavLink>
          <Search /> {/* No margin after Search as it's the last item */}
        </Box>

        <Box display="flex" alignItems="center">
          <NavLink
            className="nav-link"
            href="/development"
            style={{
              color: "#FFF !important",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "20px",
              letterSpacing: "-0.1px",
            }}
            mr="40px"
          >
            Become a Partner
          </NavLink>
          <Signin /> {/* No margin after Signin as it's the last item */}
        </Box>
      </Container>

      <Box className="responsive-mobile-menu">
        <FlexBox
          className="mobile-nav-links"
          style={{ gap: 10, width: "100%", justifyContent: "space-around" }}
        >
          <NavLink href="/" onClick={() => handleNavClick("/")}>
            <Image
              src={
                activeItem === "/"
                  ? "/assets/images/non_financial_marketplace/home-active.svg"
                  : "/assets/images/non_financial_marketplace/home.svg"
              }
              alt="Home"
              width={24}
              height={24}
            />
            <Typography color="black">Home</Typography>
          </NavLink>
          <Box onClick={toggleModal} className="nav-link">
            <Image
              src={
                activeItem === "/explore"
                  ? "/assets/images/non_financial_marketplace/explore-active.svg"
                  : "/assets/images/non_financial_marketplace/explore.svg"
              }
              alt="Explore"
              width={24}
              height={24}
            />
            <Typography color="black">Explore</Typography>
          </Box>
          <NavLink
            href="/development"
            onClick={() => handleNavClick("/search")}
          >
            <Image
              src="/assets/images/non_financial_marketplace/search (2).svg"
              alt="Search"
              width={24}
              height={24}
            />
            <Typography color="black">Search</Typography>
          </NavLink>
          <NavLink
            href="/development"
            onClick={() => handleNavClick("/profile")}
          >
            <Image
              src={
                activeItem === "/profile"
                  ? "/assets/images/non_financial_marketplace/profile-active.svg"
                  : "/assets/images/non_financial_marketplace/profile.svg"
              }
              alt="Profile"
              width={24}
              height={24}
            />
            <Typography color="black">Profile</Typography>
          </NavLink>
        </FlexBox>
      </Box>

      {isModalOpen && <ExploreModal onClose={toggleModal} />}
    </StyledNavbar>
  );
}
