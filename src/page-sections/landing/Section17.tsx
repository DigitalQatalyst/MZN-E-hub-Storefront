"use client";

import NextImage from "next/image";
// import Image from "next/image";
import icon1 from "../../../public/images/delivery_truck_speed.png"
import icon2 from "../../../public/images/chart_data.png"
import icon3 from "../../../public/images/acute.png"
import divider from "../../../public/images/divider.svg"
import styled from "styled-components";
import { H1, H3, H4 } from "@component/Typography";
import { Header, HeaderTwo } from "@component/header";
import Navbar from "@component/navbar/Navbar";

// STYLED COMPONENTS

const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 3rem 3rem;
  display: grid;
  font-style:abhaya-libre;
  grid-template-columns: 1fr auto; /* Content in 1fr, button in auto */
  align-items: center; /* Vertically align items */
  gap: 2rem; /* Add some gap between columns */
  margin-bottom: 2rem;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;


const SearchButtonHero = styled.button`
  padding: .7rem 1.5rem;
  background-color: #ffffff;
  color: #0030E3; // Blue text
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 4rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0; // Slight hover effect
  }
`;

export default function Section7() {
  return (
    <div>

      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <p>SUPPORTING YOUR BUSINESS NEEDS</p>
          <H3 fontSize="28px" fontWeight="700" mb="1rem">
            Welcome to MZN Enterprise Hub
          </H3>
          <p>
            Abu Dhabi’s premier platform dedicated to empowering Emirati businesses.<br />
            We understand the challenges you face as entrepreneurs, and we’re here to provide the tools, resources, and guidance <br />
            you need to thrive in today’s dynamic market.
          </p>
        </ContentColumn>
        <SearchButtonHero>Sign Up</SearchButtonHero>
      </WelcomeSection>
    </div>
  );
}