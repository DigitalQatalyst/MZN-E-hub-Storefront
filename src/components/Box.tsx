import styled from "styled-components";
import {
  grid,
  color,
  space,
  border,
  layout,
  flexbox,
  compose,
  position,
  typography,
  GridProps,
  ColorProps,
  SpaceProps,
  BorderProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  TypographyProps
} from "styled-system";
import { isValidProp } from "@utils/utils";

// ==============================================================

interface BoxProps
  extends LayoutProps,
  GridProps,
  ColorProps,
  SpaceProps,
  BorderProps,
  FlexboxProps,
  PositionProps,
  TypographyProps {
  cursor?: string;
  transition?: string;
  shadow?: number | null | string;
  theme?: any;
  children?: React.ReactNode;
}

// ==============================================================

const Box = styled.div<BoxProps>`
  cursor: ${(props) => props.cursor || "unset"};
  transition: ${(props) => props.transition};
  box-shadow: ${(props) => (props.shadow ? props.theme.shadows[props.shadow] : "unset")};
  ${compose(layout, space, color, grid, position, flexbox, border, typography)};
`;

export default Box;
