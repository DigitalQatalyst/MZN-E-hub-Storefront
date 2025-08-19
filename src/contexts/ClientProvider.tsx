"use client";

import React from "react";
import MsalProviderClient from "./MsalProviderClient";
import { AppProvider } from "@context/app-context";
import { ModalProvider } from "@context/ModalContext";
import StyledContext from "@context/StyledContext";
import NProgressBar from "@component/NProgress";
import KfBot from "@component/bot/KfBot";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <MsalProviderClient>
      <AppProvider>
        <ModalProvider>
          <StyledContext>
            {children}
            <NProgressBar />
          </StyledContext>
          <KfBot />
        </ModalProvider>
      </AppProvider>
    </MsalProviderClient>
  );
}
