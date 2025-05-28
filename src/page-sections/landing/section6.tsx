"use client";
import NextImage from "next/image";
import styled from "styled-components";
import { H1, H3, H4 } from "@component/Typography";
import { Header, HeaderTwo } from "@component/header";
import Navbar from "@component/navbar/Navbar";
import Navbar1 from "@component/navbar/navbar1";

// STYLED COMPONENTS
const HeroSection = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  height: 120vh; /* Increased height from 100vh to 120vh */
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #2a5298, #1e3c72);
  overflow: hidden;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
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
  z-index: 4; /* Ensure Navbar is above HeroImage and HeroContent */
  width: 100%;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* Fixed from 150% to 100% to prevent overflow */
  padding: 2rem 1rem;
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
        <HeroContent>
          <SearchBarContainer>
            <SearchInput placeholder="How can we help?" />
            <SearchButton>Ask Enterprise Journey AI</SearchButton>
          </SearchBarContainer>
        </HeroContent>
      </HeroSection>
    </div>
  );
}