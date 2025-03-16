"use client";

import NextImage from "next/image";
// import Image from "next/image";
import icon1 from "../../../public/images/delivery_truck_speed.png"
import icon2 from "../../../public/images/chart_data.png"
import icon3 from "../../../public/images/acute.png"
import styled from "styled-components";
import { H1, H3, H4 } from "@component/Typography";

// STYLED COMPONENTS
const HeroSection = styled.section`
//   padding: 5rem 0;
  color: white;
  display: flex;
//   justify-content: center;
//   align-items: center;
  flex-direction: column;
  position: relative;
  text-align: center;
  height: 90vh;
//   width: 100%;
//   z-index: 4;
//   overflow: hidden;
`;

const CTASection = styled.section`
  background-color: white;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px #F4F7FE;
  display: grid;
  grid-template-columns: 40px 1fr; /* 40px for icon, 1fr for text */
  align-items: center; /* Vertically align items */
  gap: 1rem; /* Add some gap between columns */
  width: 400px;
  margin-top: 7rem;
  margin-bottom: 1rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH4 = styled(H4)`
  color: blue;
  margin-bottom: -0.5rem;
`;

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

const HeroImage = styled.div`
//   position: absolute;
//   bottom: -50px;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
margin-left:0rem;

//   z-index: 5;
//   object-fit: cover;

`;

const HeroContent = styled.div`
  z-index: 2;
  color:black;
//   margin-bottom: 2rem;
margin-top: -15rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  z-index: 7;
`;

const SearchInput = styled.input`
  padding: 1rem;
  font-size: 16px;
  border-radius: 10px 0 0 10px;
//   border-radius-left: 30px;
  border: none;
  width: 300px;
  margin-right: -.6rem;
  max-width: 100%;
   border-right: none
`;

const SearchButton = styled.button`
  padding: 1rem 2rem;
  background-color: #002180;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 0 10px 10px 0; 
  border: none;
  cursor: pointer;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #2980b9;
//   }
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

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection>
                <HeroImage>
                    <NextImage
                        width={1800}
                        height={911}

                        alt="Male Avatar"
                        src="/images/image 47.png"
                    />
                </HeroImage>
                <HeroContent>
                    {/* <H3 fontSize="20px" fontWeight="400" mb="2rem">
                        
                    </H3> */}
                </HeroContent>

                <SearchBarContainer>
                    <SearchInput placeholder="How can we help?" />
                    <SearchButton>Ask MZN AI </SearchButton>
                </SearchBarContainer>

                {/* Hero Images */}

            </HeroSection>

            {/* CTA Section */}
            <CTASection>
                <Card>
                    <NextImage src={icon1} alt="Grow Faster Icon" width={40} height={40} />
                    <TextContainer>
                        <StyledH4 fontSize="18px" fontWeight="700">
                            Grow Faster
                        </StyledH4>
                        <p>Scale with speed</p>
                    </TextContainer>
                </Card>

                <Card>
                    <NextImage src={icon2} alt="Grow Faster Icon" width={40} height={40} />
                    <TextContainer>

                        <StyledH4 fontSize="18px" fontWeight="700">
                            Grow Smarter
                        </StyledH4>
                        <p>Maximize resources wisely</p>
                    </TextContainer>
                </Card>

                <Card>
                    <NextImage src={icon3} alt="Grow Faster Icon" width={40} height={40} />
                    <TextContainer>

                        <StyledH4 fontSize="18px" fontWeight="700">
                            Every Little Help
                        </StyledH4>
                        <p>Support when it counts</p>
                    </TextContainer>
                </Card>
            </CTASection>

            {/* Welcome Section */}
            <WelcomeSection>
                <ContentColumn>
                    <p>SUPPORTING YOUR BUSINESS NEEDS</p>
                    <H3 fontSize="28px" fontWeight="700" mb="2rem">
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