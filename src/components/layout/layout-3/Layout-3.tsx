"use client";

import { PropsWithChildren } from "react";

import AppLayout from "../layout-1";
import Container from "@component/Container";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import Navbar1 from "@component/navbar/landing_nav/Navbar1";
import styled from "styled-components";

export default function ShopLayout({ children }: PropsWithChildren) {
  const NavbarWrapper = styled.div`
    position: relative;
    z-index: 4;
    width: 100vw;
    display: block;
    margin: 0;
    padding: 0;
    background: linear-gradient(
      90deg,
      #01e5d1 0%,
      #02e4d1 8.12%,
      #04e2d2 14.47%,
      #07dfd3 19.42%,
      #0cdad5 23.32%,
      #12d5d7 26.54%,
      #18ceda 29.42%,
      #20c7dd 32.34%,
      #29bee0 35.66%,
      #33b5e4 39.72%,
      #3dabe8 44.89%,
      #48a0ec 51.54%,
      #5395f1 60.01%,
      #6089f5 70.67%,
      #6c7dfa 83.88%,
      #7970ff 100%
    );
  `;
  return (
    <AppLayout
      navbar={
        <NavbarWrapper>
          <Navbar1 />
        </NavbarWrapper>
      }
    >
      <Container my="2rem">{children}</Container>
    </AppLayout>
  );
}
