"use client";

import React, { useState } from "react"; // Import useState from React
import Icon from "@component/icon/Icon";
import Container from "@component/Container";
import { H4, Span } from "@component/Typography";  
import { ResultsTitle, DescriptionText, ButtonWrapper, HeaderWrapper, ActiveButton } from "./styles";  

export default function Section2() {
  const [activeButton, setActiveButton] = useState(""); // Track the active button

  const handleButtonClick = (button) => {
    setActiveButton(button); // Update the active button on click
  };

  const resultsCount = 40; // This could be dynamically fetched or passed as a prop

  return (
    <Container pt="2rem" style={{ marginBottom: '-45px' }}>
      <HeaderWrapper>
        <div>
          <ResultsTitle>
            Results <span style={{
              color: 'var(--KF-BG-Blue, #0030E3)', 
              fontFamily: 'Open Sans', 
              fontSize: '14px', 
              fontStyle: 'normal', 
              fontWeight: '400', 
              lineHeight: '22px',
              // marginBottom: '10px'
            }}>
              {resultsCount}+ Results
            </span>
          </ResultsTitle>
          <DescriptionText>Explore our latest business support solutions and financial services.</DescriptionText>
        </div>

      

        <ButtonWrapper>
          <ActiveButton
            isActive={activeButton === "newAdditions"}
            onClick={() => handleButtonClick("newAdditions")}
          >
            New Additions
          </ActiveButton>

          <ActiveButton
            isActive={activeButton === "topServices"}
            onClick={() => handleButtonClick("topServices")}
          >
            Top Services
          </ActiveButton>

          <ActiveButton
            isActive={activeButton === "popularPicks"}
            onClick={() => handleButtonClick("popularPicks")}
          >
            Popular Picks
          </ActiveButton>
        </ButtonWrapper>
      </HeaderWrapper>

      {/* <Wrapper>
        {serviceList.map((item, ind) => (
          <ServiceItem key={ind}>
            <Icon size="40px">{item.icon}</Icon>

            <div>
              <H4 lineHeight={1.3}>{item.title}</H4>
              <Span color="grey.600">{item.description}</Span>
            </div>
          </ServiceItem>
        ))}
      </Wrapper> */}
    </Container>
  );
}
