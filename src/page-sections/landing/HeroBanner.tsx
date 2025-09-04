"use client";
import NextImage from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Navbar1 from "@component/navbar/landing_nav/Navbar1";

// STYLED COMPONENTS
const HeroSection = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  height: 100vh;
  min-height: 400px;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #2a5298, #1e3c72);
  overflow: hidden;

  @media (max-width: 1199px) {
    height: 80vh;
    min-height: 320px;
  }
  @media (max-width: 899px) {
    height: 60vh;
    min-height: 220px;
    padding-top: 48px;
  }
  @media (max-width: 599px) {
    height: 720px;
    min-height: 350px;
    padding-top: 25px;
  }
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;

  img,
  .next-image,
  .next-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    max-width: 100vw;
    max-height: 100vh;
    min-height: 100%;
    min-width: 100%;
    display: block;
  }
`;

const NavbarWrapper = styled.div`
  position: relative;
  z-index: 4;
  width: 100vw;
  display: block;
  margin: 0;
  padding: 0;
`;

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const heroImageSrc = isMobile ? "/images/mobileHero.png" : "/images/image 47.png";

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroImage>
          <NextImage
            alt="Hero Background"
            src={heroImageSrc}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
        </HeroImage>
        <NavbarWrapper>
          <Navbar1 />
        </NavbarWrapper>
        {/* <HeroContent>
          <SearchBarContainer>
            <SearchInput placeholder="How can we help?" />
            <SearchButton>Ask Enterprise Journey AI</SearchButton>
          </SearchBarContainer>
        </HeroContent> */}
      </HeroSection>
    </div>
  );
}