"use client";
import NextImage from "next/image";
import styled from "styled-components";
import { H1, H3, H4 } from "@component/Typography";
import { Header, HeaderTwo } from "@component/header";
import Navbar from "@component/navbar/Navbar";
import Navbar1 from "@component/navbar/Navbar1";

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
    height: 40vh;
    min-height: 160px;
    padding-top: 32px;
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

  img, .next-image, .next-image img {
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

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35rem;
  z-index: 3;
`;

const SearchInput = styled.input`
  padding: 1rem;
  font-size: 16px;
  border-radius: 10px 0 0 10px;
  border: 2px solid #fff;
  width: 300px;
  height: 59px;
  background-color: rgba(255, 255, 255, 0.9);
  color:  Gray/800 - Paragraph;
  outline: none;
  margin-right: -1px;
  max-width: 100%;
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background-color: transparent; /* Set to transparent to inherit background */
  color: white; /* Changed to white for text */
  font-size: 16px;
  font-weight: 600;
  height: 59px;
  border-radius: 0 10px 10px 0;
  border: 2px solid #fff; /* Maintain border for visibility */
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease;
  &:hover {
    color: #f0f0f0; /* Slight hover effect on text */
    border-color: #f0f0f0; /* Slight hover effect on border */
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

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem 1rem;
  @media (max-width: 899px) {
    padding: 1rem 0.5rem;
  }
`;


export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroImage>
          <NextImage
            alt="Hero Background"
            src="/images/image 47.png"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
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