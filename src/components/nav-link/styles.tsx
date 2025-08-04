import styled from "styled-components";
import systemCss from "@styled-system/css";
import { color, ColorProps, compose, space, SpaceProps } from "styled-system";
import { isValidProp } from "@utils/utils";

// ==============================================================
interface StyledNavLinkProps {
  className?: string;
  isCurrentRoute?: boolean;
  [key: string]: unknown;
}
// ==============================================================

const StyledNavLink = styled.span.withConfig({
  shouldForwardProp: (prop: string) => isValidProp(prop)
})<StyledNavLinkProps & SpaceProps & ColorProps>(
  ({ isCurrentRoute, theme }) => {
    // Safe theme access with fallbacks
    const primaryColor = theme?.colors?.primary?.main || '#1976d2';
    
    return systemCss({
      position: "relative",
      transition: "all 150ms ease-in-out",
      color: isCurrentRoute ? primaryColor : "auto",
      "&:hover": {
        color: `${primaryColor} !important`
      },
      "& svg path": {
        fill: isCurrentRoute ? primaryColor : "auto"
      },
      "& svg polyline, svg polygon": {
        color: isCurrentRoute ? primaryColor : "auto"
      }
    });
  },
  compose(space, color)
);

export default StyledNavLink;