"use client";

import Link from "next/link";
import styled from "styled-components";
import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

// New Styled Components for the Subscribe Form
export const SubscribeContainer = styled.div`
  display: flex;
  width: 377px;
  height: 56px;
  background: rgba(41, 41, 41, 0.05);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 8px 8px 20px;
`;

export const SubscribeInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 5px 0 0 5px;
  color: #FFFFFF;
  font-family: "Public Sans", sans-serif;
  background-color:rgb(66, 82, 200);
  &::placeholder {
    color: #FFFFFF;
  }
`;

export const SubscribeButton = styled.button`
  border: none;
  background-color: var(--KF-BG-White, #fff);
  color: #0030e3;
  padding: 10px 24px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  transition: background-color 0.3s;
  font-family: "Public Sans", sans-serif;
`;

// New Styled Component for Footer Container
export const FooterContainer = styled.div`
  background: linear-gradient(94deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%);
  color: white;
`;

export const ContentContainer = styled.div`
  padding: rem 0;
  overflow: hidden;
  margin-top: 3rem;
`;

export const CopyrightContainer = styled.div`
  // padding: 1rem 0;
  text-align: center;
`;

// New Styled Component for Icon Container
export const IconContainer = styled.div`
  
  justify-content: center;
`;

export const SmallTag = styled.span`
  background-color: #fff;
  color: #0d47a1;  // Blue color
  font-size: 12px;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  border-radius: 7px;
  font-weight: 600;
`;