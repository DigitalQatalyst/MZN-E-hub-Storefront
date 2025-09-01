"use client";

import { PropsWithChildren } from "react";
import AppLayout from "@component/layout/layout-1";
import { AppProvider } from "@context/app-context";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppProvider>
      <AppLayout>{children}</AppLayout>
    </AppProvider>
  );
}
