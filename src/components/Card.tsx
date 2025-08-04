"use client";

import styled from "styled-components";
import {
  BorderProps,
  LayoutProps,
  ColorProps,
  SpaceProps,
  compose,
  border,
  color,
  space,
  layout
} from "styled-system";

import Box from "./Box";
import { isValidProp } from "@utils/utils";
import { shadowOptions } from "interfaces";

// ==============================================================
export interface CardProps {
  elevation?: number;
  hoverEffect?: boolean;
  boxShadow?: shadowOptions;
}

type Props = ColorProps & SpaceProps & LayoutProps & BorderProps & CardProps;
// ==============================================================

const Card = styled(Box).withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<Props>(
  ({ theme, hoverEffect = false, boxShadow = "small" }) => {
    // Default shadow values as fallback
    const defaultShadows = {
      small: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
      medium: "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)",
      large: "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
      regular: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)"
    };

    // Default colors as fallback
    const defaultColors = {
      body: {
        paper: "#ffffff"
      }
    };

    // Safe access to theme properties with fallbacks
    const shadows = theme?.shadows || defaultShadows;
    const colors = theme?.colors || defaultColors;
    const currentShadow = shadows[boxShadow] || defaultShadows.small;
    const hoverShadow = shadows.large || defaultShadows.large;
    const backgroundColor = colors.body?.paper || defaultColors.body.paper;

    return {
      boxShadow: currentShadow,
      backgroundColor: backgroundColor,
      ...(hoverEffect && {
        "&:hover": {
          boxShadow: hoverShadow
        }
      })
    };
  },
  compose(border, color, space, layout)
);

export default Card;