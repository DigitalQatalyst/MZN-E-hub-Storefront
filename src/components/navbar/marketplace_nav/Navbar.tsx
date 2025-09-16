"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Box from "../../Box";
import Icon from "../../icon/Icon";
import FlexBox from "../../FlexBox";
import { Button } from "../../buttons";
import Container from "../../Container";
import Typography from "../../Typography";
import Categories from "../../categories/Categories";
import { StyledNavbar } from "./styles";
import Signup from "./signup";
import Signin from "../landing_nav/signin";
import Search from "./search";
import CustomNavLink from "@component/CustomNavLink/CustomNavLink";
import ExploreModal from "@component/mobile-responsiveness/ExploreModal";
import MoreModal from "@component/mobile-responsiveness/MoreModal";

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
  const [activeItem, setActiveItem] = useState("/"); // Initialize as "/"
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
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
    setActiveItem(path); // Update activeItem based on the clicked path
    if (path === "/explore") {
      setIsModalOpen(true); // Open ExploreModal for "explore"
    } else if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  const toggleMoreModal = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setActiveItem("/explore"); // Set "explore" as active when opening modal
    } else {
      setActiveItem("/"); // Revert to Home when closing modal
    }
  };

  const handleNewsletterClick = () => {
    setActiveItem("/");
    router.push("/#newsletter");
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
        <Box display="flex" alignItems="center">
          <Box className="enterprise-logo" mr="40px">
            <CustomNavLink href="/">
              <img src="/assets/images/logos/mzn_logo.svg" alt="Enterprise Journey Logo" />
            </CustomNavLink>
          </Box>
          <Categories open={navListOpen}>
            <FlexBox alignItems="center" mr="40px">
              <Typography className="explore-text" ml="5px" fontSize="14px" fontWeight="500" lineHeight="20px" color="#FFF" letterSpacing="-0.1px">
                Explore
              </Typography>
              <Image
                src="/assets/images/icons/dropdown_latest.svg"
                alt="Dropdown"
                width={24}
                height={24}
                className="dropdown-icon"
              />
            </FlexBox>
          </Categories>
          <CustomNavLink
            className="nav-link"
            href="/development"
            mr="40px"
          >
            Discover AbuDhabi
          </CustomNavLink>
        </Box>

        <Box display="flex" alignItems="center" className="desktop-nav">
          <CustomNavLink
            className="nav-link"
            href="/#newsletter"
            mr="40px"
            onClick={handleNewsletterClick}
          >
            Become a Partner
          </CustomNavLink>
          <Signin />
        </Box>

        <Box display="flex" alignItems="center" className="mobile-more-icon">
          <Image
            src="/assets/images/icons/more.svg"
            alt="More"
            width={24}
            height={24}
            onClick={toggleMoreModal}
          />
        </Box>
      </Container>

      <Box className="responsive-mobile-menu">
        <FlexBox className="mobile-nav-links" width="100%" justifyContent="space-around" alignItems="center" px="20px">
          <CustomNavLink href="/" onClick={() => handleNavClick("/")}>
            <Image
              src={activeItem === "/" ? "/assets/images/non_financial_marketplace/home-active.svg" : "/assets/images/non_financial_marketplace/home.svg"}
              alt="Home"
              width={24}
              height={24}
            />
            <Typography color="black">Home</Typography>
          </CustomNavLink>
          <Box onClick={toggleModal} className="nav-link">
            <Image
              src={activeItem === "/explore" ? "/assets/images/non_financial_marketplace/explore-active.svg" : "/assets/images/non_financial_marketplace/explore.svg"}
              alt="Explore"
              width={24}
              height={24}
            />
            <Typography color="black">Explore</Typography>
          </Box>
          {/* <CustomNavLink href="/development" onClick={() => handleNavClick("/development")}>
            <Image
              src={activeItem === "/development" ? "/assets/images/non_financial_marketplace/discover_abudhabi.svg" : "/assets/images/non_financial_marketplace/discover_abudhabi.svg"}
              alt="Profile"
              width={24}
              height={24}
            />
            <Typography color="black">Discover Abudhabi</Typography>
          </CustomNavLink> */}
        </FlexBox>
      </Box>

      {isMoreModalOpen && <MoreModal />}
      {isModalOpen && <ExploreModal onClose={toggleModal} />}
    </StyledNavbar>
  );
}