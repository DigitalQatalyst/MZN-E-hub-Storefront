"use client";

import Link from "next/link";
import styled from "styled-components";
import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  // position: relative;
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
  align-items: center;
  width: 80%;
  height: 47px;
  background: rgba(41, 41, 41, 0.05);
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 8px 8px 20px;
`;

export const SubscribeInput = styled.input`
  flex: 1;

  border: none;
  border-radius: 5px 0 0 5px; /* Round only the left corners */
  color: #ffffff;
  font-family: "Public Sans", sans-serif;
  background-color: rgba(41, 41, 41, 0.05);
  &::placeholder {
    color: #ffffff;
  }
`;

export const SubscribeButton = styled.button`
  border: none;
  background-color: var(--KF-BG-White, #fff);
  color: #0030e3;
  padding: 10px 24px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px; /* Round only the right corners */
  transition: background-color 0.3s;
  font-family: "Public Sans", sans-serif;
  // &:hover {
  //   background-color: #0f3460;
  //   color: #fff;
  // }
`;
