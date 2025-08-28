"use client";

import styled from "styled-components";
import { deviceSize } from "@utils/constants";

// STYLED COMPONENTS
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items horizontally on the same level */
  margin-bottom: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: 2rem; /* Space between the text and the buttons */
  margin-top: 70px;
`;

export const Wrapper = styled.div`
  display: grid;
  padding: 2rem 0;
  background-color: #fff;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: ${deviceSize.md}px) {
    gap: 30px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${deviceSize.sm}px) {
    gap: 30px;
    padding-left: 2rem;
    padding-right: 2rem;
    grid-template-columns: 1fr;
  }
`;

export const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  & > div {
    margin-left: 1rem;
  }

  @media (max-width: ${deviceSize.sm}px) {
    justify-content: flex-start;
  }
`;

export const ServiceTitle = styled.h4`
  line-height: 1.3;
`;

export const ServiceDescription = styled.span`
  color: #888;
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Updated ResultsTitle component: Aligns text to the left
export const ResultsTitle = styled.h4`
  color: var(--KF-BG-Blue, #0030e3);
  text-align: left;  /* Align text to the left */
  font-family: "Public Sans", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */
  width: 100%; /* Make sure it takes up the full width */
  margin-bottom: 10px; /* Add margin to the bottom */
`;

// New styled component for the description text, removed margin-top
export const DescriptionText = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  // line-height: 22px; /* 157.143% */
  margin: 0; /* Removed margin-top to eliminate spacing */
`;

// Buttons
export const ActiveButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  display: flex;
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: ${(props) =>
    props.isActive
      ? "1px solid var(--KF-BG-Dark-Blue, #002180)"
      : "1px solid var(--Gray-300---border-light, #D8E0E9)"};
  color: ${(props) => (props.isActive ? "var(--KF-BG-Dark-Blue, #002180)" : "initial")};
  text-align: center;
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;

// New styled components for search bar layout and inputs

export const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.1rem;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */

  @media (max-width: ${deviceSize.sm}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  min-width: 250px;

  @media (max-width: ${deviceSize.sm}px) {
    width: 100%;
  }
`;

export const CenterSection = styled.div`
  display: flex;
  flex: 2;
  max-width: 400px;
  align-items: center;
  min-width: 300px;

  @media (max-width: ${deviceSize.sm}px) {
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const RightSection = styled.div`
  display: flex;
  gap: 0.75rem;
  flex: 1;
  justify-content: flex-end;
  min-width: 250px;

  @media (max-width: ${deviceSize.sm}px) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 1rem;
  }
`;

export const CategoryDropdown = styled.select`
  padding: 10px 12px;
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 600; /* Semi-bold */
  font-style: normal;
  line-height: 22px; /* 157.143% */
  color: var(--Gray-700, #4B566B); /* Applied color */
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  outline: none;
  background: white;
  cursor: pointer;
`;