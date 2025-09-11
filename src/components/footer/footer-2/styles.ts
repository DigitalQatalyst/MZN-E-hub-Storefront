"use client";

import Link from "next/link";
import styled from "styled-components";

import Box from "@component/Box";
import { deviceSize } from "@utils/constants";
import { getTheme } from "@utils/utils";

// STYLED COMPONENTS
export const StyledLink = styled(Link)`
  z-index: 999;
  display: block;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  padding: 0.35rem 0rem;
  color: ${getTheme("colors.gray.500")};
  &:hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

export const StyledBox = styled(Box)`
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    margin-right: unset;
    margin-left: unset;
  }
`;

export const FullWrapper = styled(Box)`
  color: white;
  padding: 40px;
  overflow: hidden;
  background-image: linear-gradient(180deg, #FFF 0%, #FDFDFF 9.41%, #F7F8FE 17.07%, #EDF0FD 23.24%, #E0E6FC 28.21%, #D1D9FA 32.23%, #BFCBF8 35.57%, #ABBBF6 38.51%, #96AAF4 41.31%, #8098F1 44.25%, #6A86EF 47.6%, #5373EC 51.62%, #3D61EA 56.58%, #2750E7 62.76%, #133FE5 70.41%, #0030E3 79.82%);
  padding: 3rem 0;
  width: 100%;

  @media only screen and (max-width: 900px) {
    margin-bottom: 3.75rem;
  }
`;

export const Wrapper = styled(Box)`
  color: white;
  padding: 40px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #0f3460;

  @media only screen and (max-width: 900px) {
    margin-bottom: 3.75rem;
  }
`;
