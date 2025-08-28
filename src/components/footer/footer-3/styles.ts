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
  width: 80%;
  height: 37px;
  background: rgba(41, 41, 41, 0.05);
  border-radius: 5px;
`;

export const SubscribeInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: 5px 0 0 5px; /* Round only the left corners */
  color: #FFFFFF;
  font-family: "Public Sans", sans-serif;
  background-color: rgba(41, 41, 41, 0.05);
  &::placeholder {
    color: #FFFFFF;;
  }
`;

export const SubscribeButton = styled.button`
  border: none;
  background-color: var(--KF-BG-White, #FFF);
  color: #0030E3;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0 5px 5px 0; /* Round only the right corners */
  transition: background-color 0.3s;
  font-family: "Public Sans", sans-serif;
  // &:hover {
  //   background-color: #0f3460;
  //   color: #fff;
  // }
`;
