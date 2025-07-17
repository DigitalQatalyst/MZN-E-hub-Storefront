"use client"; // Add this directive to mark as Client Component

import Icon from "@component/icon/Icon";
import Container from "@component/Container";
import { H4, H3,H5, Span } from "@component/Typography";
// STYLED COMPONENTS
import { ServiceItem, Wrapper } from "./styles";
// API FUNCTIONS
import api from "@utils/__api__/market-2";
import styled from "styled-components";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 3rem 15rem 3rem 15rem;
  display: grid;
  font-style: abhaya-libre;
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

export default async function Section9() {
  const serviceList = await api.getServices();

  return (
    <div>
      <Container pt="4rem" pb="4rem">
        <Wrapper>
          {serviceList.map((item, ind) => (
            <ServiceItem key={ind}>
              <Icon size="48px" color="#012EE3">{item.icon}</Icon>

              <div>
                <H4 lineHeight={1.3} color="#012EE3">{item.title}</H4>
                <Span color="grey.600">{item.description}</Span>
              </div>
            </ServiceItem>
          ))}
        </Wrapper>
      </Container>
      <WelcomeSection>
        <ContentColumn>
          <H5>SUPPORTING YOUR BUSINESS NEEDS</H5>
          <H3 fontSize="48px" fontWeight="400" mt="1rem">
            Welcome to MZN Enterprise Hub
          </H3>
          <H5 fontSize= "16px" fontWeight= "400" mt="1rem">
            Abu Dhabi’s premier platform dedicated to empowering Emirati businesses.<br />
            We understand the challenges you face as entrepreneurs, and we’re here to provide the tools, resources, and guidance <br />
            you need to thrive in today’s dynamic market.
          </H5>
        </ContentColumn>
        <SearchButtonHero>Sign Up</SearchButtonHero>
      </WelcomeSection>
    </div>
  );
}