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

// STYLED COMPONENTS
const HeroSection = styled.section`
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  height: 100vh;
  top: 0;
  left: 0;

`;

const CTASection = styled.section`
  background-color: white;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // gap: 3rem;

  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const VerticalDivider = styled.div`
  width: 4px;
  height: 60px;
  background-color:rgb(212, 23, 23); // light grey
  margin: 0;
  align-self: center;
  z-index: 1;
`;


const Card = styled.div`
  background-color:#f4f7fe;
  padding: 1.5rem 1rem;
  // border-radius: 10px;
  // box-shadow: 0 4px 12px #F4F7FE;
  display: flex;
  // grid-template-columns: 40px 1fr; /* 40px for icon, 1fr for text */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // align-items: center; /* Vertically align items */
  // gap: 1rem; /* Add some gap between columns */
  width: 500px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  // border-right: 1px solid rgb(0, 0, 0);
  
  div::after{
    content: "";
    display: block;
    width: 1px;
    height: 100%;
  }
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
  margin-left:0rem;
`;

// const HeroContent = styled.div`
//   z-index: 2;
//   color:black;
//   margin-top: 7rem;
// `;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 43rem;
  z-index: 7;
`;

const SearchInput = styled.input`
  padding: 1rem;
  font-size: 16px;
  border-radius: 10px 0 0 10px;
  border: none;
  width: 300px;
  margin-right: -.6rem;
  max-width: 100%;
  border-right: none; // Added missing semicolon
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

const CTAContainer = styled.div`
  display: flex;
  backgroundColor: #f4f7fe;
  border-radius: "10px"
  align-items: center;
  // justify-content: center;
  // flex-wrap: wrap;
  flex-direction: row;
`;


export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}

            <HeroSection>
                {/* <HeaderTwo className="background-color: transparent;"/> */}
                <HeaderTwo/>
                <HeroImage>
                    <NextImage
                        // width={"100%"}
                        // height={911}
                        alt="Male Avatar"
                        src="/images/image 47.png"
                        fill
                    />
                </HeroImage>
                {/* <HeroContent>
                </HeroContent> */}

                <SearchBarContainer>
                    <SearchInput placeholder="How can we help?" />
                    <SearchButton>Ask MZN AI </SearchButton>
                </SearchBarContainer>

                {/* Hero Images */}

            </HeroSection>

            {/* CTA Section */}
            <CTASection>
            <CTAContainer >


                <Card style={{ borderStartStartRadius: "10px", borderEndStartRadius: "10px" }}>
                    <NextImage src={icon1} alt="Grow Faster Icon" width={70} height={70} style={{marginRight: "1.5rem"}}/>
                    <TextContainer>
                        <StyledH4 fontSize="18px" fontWeight="700">
                            Grow Faster
                        </StyledH4>
                        <p>Scale with speed</p>
                    </TextContainer>
                    <NextImage src={divider} alt="Divider" width={20} height={70} style={{marginLeft: "10rem"}}/>
                </Card>

                {/* <VerticalDivider /> */}

                <Card>
                    <NextImage src={icon2} alt="Grow Faster Icon" width={70} height={70} style={{marginRight: "1.5rem"}}/>
                    <TextContainer>

                        <StyledH4 fontSize="18px" fontWeight="700">
                            Grow Smarter
                        </StyledH4>
                        <p>Maximize resources wisely</p>
                    </TextContainer>
                    <NextImage src={divider} alt="Divider" width={20} height={70} style={{marginLeft: "10rem"}}/>
                </Card>

                {/* <VerticalDivider /> */}

                <Card style={{ borderStartEndRadius: "10px", borderEndEndRadius: "10px" }}>
                    <NextImage src={icon3} alt="Grow Faster Icon" width={70} height={70} style={{marginRight: "1.5rem"}}/>
                    <TextContainer>

                        <StyledH4 fontSize="18px" fontWeight="700">
                            Every Little Help
                        </StyledH4>
                        <p>Support when it counts</p>
                    </TextContainer>
                </Card>
            </CTAContainer>
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