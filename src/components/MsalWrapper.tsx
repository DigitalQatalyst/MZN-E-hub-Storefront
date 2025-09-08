"use client";
// import { MsalProvider } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { msalConfig } from "../authConfig";
import { ReactNode } from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../lib/authConfig";
import { ReactNode } from "react";

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);
export default function MsalWrapper({ children }: { children: ReactNode }) {
  const [msalInstance, setMsalInstance] =
    useState<PublicClientApplication | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const msalInstance = new PublicClientApplication(msalConfig);
      setMsalInstance(msalInstance);
    }
  }, []);

  if (!msalInstance) {
    return <div>Loading...</div>; // Optionally show a loading indicator until MSAL is ready
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
