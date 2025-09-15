"use client";

import Link from "next/link";
import styled from "styled-components";
import { getTheme } from "@utils/utils";

/**
 * Styled link component for footer navigation links
 * Provides consistent hover states and spacing
 */
export const StyledLink = styled(Link)`
  display: block;
  padding: 0.3rem 0rem;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 16px;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateX(2px);
  }
`;

/**
 * Newsletter subscription input field
 * Styled for the footer subscription form
 */
export const SubscribeInput = styled.input`
  flex: 1;
  padding: 14px 120px 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: #ffffff;
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

/**
 * Newsletter subscription button
 * Positioned absolutely within the input container
 */
export const SubscribeButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: #ffffff;
  color: #0030E3;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-family: inherit;
  
  &:hover {
    transform: translateY(-50%) scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.98);
  }
`;

/**
 * Main footer container with gradient background
 * Uses CSS custom properties for consistent theming
 */
export const FooterContainer = styled.div`
  background: linear-gradient(
    94.22deg,
    #374def 0%,
    #1c3fe9 44.23%,
    #1c3fe9 88.46%,
    #374def 100%
  );
  color: white;
  position: relative;
  overflow: hidden;
`;

/**
 * Content wrapper for consistent max-width and padding
 */
export const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

/**
 * Copyright section container
 */
export const CopyrightContainer = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

/**
 * Badge component for "Coming soon" and similar labels
 */
export const SmallTag = styled.span`
  background-color: #ffffff;
  color: #0030E3;
  font-size: 12px;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
`;

/**
 * Separator line component
 */
export const SeparatorLine = styled.div`
  height: 1px;
  background-color: rgba(80, 136, 255, 0.5);
  margin: 2rem 0 3rem 0;
`;

/**
 * Social media link wrapper for consistent spacing
 */
export const SocialLink = styled(Link)`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: translateX(2px);
  }
  
  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translate(2px, -2px);
  }
`;