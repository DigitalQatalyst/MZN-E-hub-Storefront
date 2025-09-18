"use client";

import { ReactNode } from "react";

import Sticky from "@component/sticky";
import { HeaderTwo } from "@component/header";
import Navbar2 from "@component/navbar/Navbar2";
import MobileNavigationBar from "@component/mobile-navigation";
import Box from "@component/Box";
// STYLED COMPONENT
import StyledRoot from "../layout-1/styles";
import Stage2Navbar2 from "@component/navbar/Stage2Navbar2";
import { Footer1 } from "@component/footer";

// =========================================================================
type Props = { title?: string; showNavbar?: boolean; children: ReactNode };
// =========================================================================

export default function ShopLayout({ children, showNavbar = true }: Props) {
  return (
    <StyledRoot>
      <Stage2Navbar2 sidebarOpen={true} />
      <Box margin-top={3}>{children}</Box>
    </StyledRoot>
  );
}
