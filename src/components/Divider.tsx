"use client";

import { isValidProp } from "@utils/utils";
import styled from "styled-components";
import { color, ColorProps, layout, LayoutProps, space, SpaceProps } from "styled-system";

// ==============================================================
type DividerProps = SpaceProps & LayoutProps & ColorProps;
// ==============================================================

const Divider = styled.div.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<DividerProps>`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  ${color}
  ${space}
  ${layout}
`;

export default Divider;
