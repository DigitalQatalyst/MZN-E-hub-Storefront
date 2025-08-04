"use client";

import { forwardRef } from "react";
import systemCss from "@styled-system/css";
import styled, { useTheme } from "styled-components";
import {
  color,
  space,
  border,
  layout,
  shadow,
  compose,
  variant,
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  BackgroundProps
} from "styled-system";

import { isValidProp } from "@utils/utils";
import { colorOptions } from "interfaces";

// ==============================================================
interface ButtonProps {
  fullwidth?: boolean;
  color?: colorOptions;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large" | "none";
}

type Props = ColorProps & BackgroundProps & BorderProps & SpaceProps & ButtonProps & LayoutProps;
// ==============================================================

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<Props>(
  ({ color, fullwidth }) =>
    systemCss({
      display: "flex",
      width: fullwidth ? "100%" : "unset",
      justifyContent: "center",
      alignItems: "center",
      outline: "none",
      border: "2px solid #99B2FF",
      cursor: "pointer",
      padding: "20px 1.5rem",
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: "inherit",
      color: color ? `${color}.main` : "body.text",
      background: "transparent",
      transition: "all 150ms ease-in-out",
      lineHeight: 1,
      "&:focus": { boxShadow: 3 },
      "&:disabled": {
        bg: "text.disabled",
        color: "text.hint",
        borderColor: "text.disabled",
        cursor: "unset",
        "svg path": { fill: "text.hint" },
        "svg polyline, svg polygon": { color: "text.hint" }
      }
    }),
  ({ theme, color }) => {
    // Helper function to safely get theme colors
    const getThemeColor = (colorKey: string, shade: string) => {
      if (!theme || !theme.colors || !theme.colors[colorKey]) {
        console.warn(`Theme color not found: ${colorKey}`);
        return '#000000'; // fallback color
      }
      return theme.colors[colorKey][shade] || theme.colors[colorKey].main || '#000000';
    };

    return variant({
      prop: "variant",
      variants: {
        text: {
          border: "none",
          color: color ? `${color}.main` : "text.primary",
          "&:hover": {
            bg: color ? `${color}.light` : "gray.100"
          }
        },
        outlined: {
          padding: "10px 16px",
          color: color ? `${color}.main` : "text.primary",
          border: "1px solid",
          borderColor: color ? `${color}.main` : "text.disabled",

          "&:enabled svg path": {
            fill: color ? `${getThemeColor(color, 'main')} !important` : (theme?.colors?.text?.primary || '#000000')
          },
          "&:enabled svg polyline, svg polygon": {
            color: color ? `${getThemeColor(color, 'main')} !important` : (theme?.colors?.text?.primary || '#000000')
          },
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${color ? getThemeColor(color, 'light') : 'rgba(0,0,0,0.1)'}`
          },
          "&:hover:enabled": {
            bg: color && `${color}.main`,
            borderColor: color && `${color}.main`,
            color: color && `${color}.text`,
            "svg path": {
              fill: color ? `${getThemeColor(color, 'text')} !important` : (theme?.colors?.text?.primary || '#000000')
            },
            "svg polyline, svg polygon": {
              color: color ? `${getThemeColor(color, 'text')} !important` : (theme?.colors?.text?.primary || '#000000')
            },
            ...(color === "dark" && { color: "white" })
          }
        },
        contained: {
          border: "none",
          color: color ? `${color}.text` : "white",
          bg: color ? `${color}.button` : "primary.main",
          "&:focus": {
            boxShadow: `0px 1px 4px 0px ${color ? getThemeColor(color, 'light') : 'rgba(0,0,0,0.1)'}`
          },
          "&:enabled svg path": {
            fill: color ? `${getThemeColor(color, 'text')} !important` : (theme?.colors?.text?.primary || '#ffffff')
          },
          "&:enabled svg polyline, svg polygon": {
            color: color ? `${getThemeColor(color, 'text')} !important` : (theme?.colors?.text?.primary || '#ffffff')
          }
        }
      }
    });
  },
  variant({
    prop: "size",
    variants: {
      large: { height: "56px", px: 30 },
      medium: { height: "48px", px: 30 },
      small: { height: "40px", fontSize: 14 }
    }
  }),
  compose(color, layout, space, border, shadow)
);

interface BtnProps extends Props {
  children: React.ReactNode;
  as?: string | React.ComponentType<any>;
}

const Button = forwardRef<
  HTMLButtonElement,
  BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, size = "small", borderRadius = 5, ...props }, ref) => {
  return (
    <StyledButton ref={ref} size={size} borderRadius={borderRadius} {...props}>
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;