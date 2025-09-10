"use client";

import { ReactNode } from "react";

import Sticky from "@component/sticky";
import { HeaderTwo } from "@component/header";
import Navbar2 from "@component/navbar/Navbar2";
import MobileNavigationBar from "@component/mobile-navigation";
import Box from "@component/Box";
// STYLED COMPONENT
import StyledRoot from "../layout-1/styles";
import Navbar from "@component/navbar/Stage2Navbar";
import { Footer1 } from "@component/footer";

// =========================================================================
type Props = { title?: string; showNavbar?: boolean; children: ReactNode };
// =========================================================================

export default function ShopLayout({ children, showNavbar = true }: Props) {
  return (
    <StyledRoot>
      {/* HEADER AREA */}
      {/* <Sticky fixedOn={0}>
        <HeaderTwo />
      </Sticky> */}
      <Navbar />

      {/* CONDITIONALLY RENDER NAVBAR AREA */}
      {/* {showNavbar && (
        <div className="section-after-sticky">
          <Navbar2 />
        </div>
      )} */}

      <Box margin-top={3}>
        {children}
      </Box>

      {/* SMALLER DEVICE NAVIGATION AREA */}
      {/* <MobileNavigationBar /> */}

      {/* FOOTER AREA */}
      {/* <Footer1 /> */}
    </StyledRoot>
  );
}