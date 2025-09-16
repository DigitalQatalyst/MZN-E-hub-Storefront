"use client";

import { ReactElement, ReactNode } from "react";

import Topbar from "@component/topbar";
import Sticky from "@component/sticky";
import { Header } from "@component/header";

import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./styles";
import KfBot from "@component/bot/KfBot";
import Footer1 from "@component/footer/stage0_1_footer/Footer1";

// ===============================================================================
type Props = { title?: string; navbar?: ReactElement; children: ReactNode };
// ===============================================================================

export default function ShopLayout({ navbar, children }: Props) {
  return (
    <StyledAppLayout>
      {/* <Topbar /> */}
      {/* <Sticky fixedOn={0} scrollDistance={300}>
        <Header />
      </Sticky> */}
      {navbar ? <div className="section-after-sticky">{navbar}</div> : null}
      {navbar ? (
        children
      ) : (
        <div className="section-after-sticky">{children}</div>
      )}
      <MobileNavigationBar />
      <Footer1 />
    </StyledAppLayout>
  );
}
