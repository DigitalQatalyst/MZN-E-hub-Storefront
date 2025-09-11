"use client";

import styled from "styled-components";
import {
  color,
  space,
  position,
  typography,
  border,
  layout,
  ColorProps,
  SpaceProps,
  PositionProps,
  TypographyProps,
  BorderProps,
  LayoutProps
} from "styled-system";
import { isValidProp } from "@utils/utils";

// ==============================================================
interface ChipProps extends SpaceProps, ColorProps, TypographyProps, PositionProps, BorderProps, LayoutProps {
  cursor?: string;
  boxShadow?: string;
}
// ==============================================================

export const Chip = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<ChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 150ms ease-in-out;
  cursor: ${(props) => props.cursor || "unset"};
  box-shadow: ${(props) => props.boxShadow || "unset"};
  border: 1px solid #E0E0E0;
  ${space}
  ${color}
  ${position}
  ${typography}
  ${border}
  ${layout}
  
  /* Ensure these styles take precedence */
  width: 92px !important;
  height: 20px !important;
  font-size: 10px !important;
`;
