"use client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import { ReactNode } from "react";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);
export default function MsalWrapper({ children }: { children: ReactNode }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
