"use client";

import styled from "styled-components";
import { deviceSize } from "@utils/constants";

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  border: 1px solid #ccc;
  border-radius: 0 6px 6px 0;
  outline: none;

  /* Optional: Focus styles */
  // &:focus {
  //   border-color: var(--KF-BG-Blue, #0030E3);
  //   box-shadow: 0 0 5px rgba(0, 48, 227, 0.5);
  // }
`;

export const SearchIcon = styled.img<{ hasText: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  cursor: pointer;
  pointer-events: none; /* so input gets focus on click */
  display: ${({ hasText }) => (hasText ? "none" : "block")}; /* Hide when input has text */
`;