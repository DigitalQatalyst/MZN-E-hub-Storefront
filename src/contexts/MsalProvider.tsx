"use client";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@lib/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export function MSALProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}