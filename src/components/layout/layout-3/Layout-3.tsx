"use client";

import { PropsWithChildren } from "react";

import AppLayout from "../layout-1";
import Container from "@component/Container";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";

export default function ShopLayout({ children }: PropsWithChildren) {
  return (
    <AppLayout navbar={<NavbarMarketplace />}>
      <Container my="2rem">{children}</Container>
    </AppLayout>
  );
}
