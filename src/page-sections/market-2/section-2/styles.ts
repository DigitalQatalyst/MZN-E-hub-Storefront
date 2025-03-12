"use client";

import styled from "styled-components";
import { deviceSize } from "@utils/constants";

// STYLED COMPONENTS
export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
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

export const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// Updated ResultsTitle component: Aligns text to the left
export const ResultsTitle = styled.h4`
  color: var(--KF-BG-Blue, #0030e3);
  text-align: left;  /* Align text to the left */
  font-family: "FS Kim Trial";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */
  width: 100%; /* Make sure it takes up the full width */
`;

// New styled component for the description text, removed margin-top
export const DescriptionText = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  margin: 0; /* Removed margin-top to eliminate spacing */
`;
