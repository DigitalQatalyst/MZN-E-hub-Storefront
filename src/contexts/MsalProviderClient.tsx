"use client";

import React, { useEffect, useMemo, useState } from "react";
import { msalConfig } from "../authConfig";

// We import *types* lazily in comments to avoid SSR importing the module.
// We'll dynamically import @azure/msal-browser inside useEffect.

type MsalPublicClient = any; // keep it loose to avoid importing types server-side

export default function MsalProviderClient({ children }: { children: React.ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<MsalPublicClient | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { PublicClientApplication, LogLevel } = await import("@azure/msal-browser");

      const instance = new PublicClientApplication({
        ...msalConfig,
        system: {
          loggerOptions: {
            loggerCallback: (level: number, message: string, containsPii: boolean) => {
              if (containsPii) return;
              switch (level) {
                case LogLevel.Error: console.error(message); break;
                case LogLevel.Warning: console.warn(message); break;
                case LogLevel.Info: console.info(message); break;
                case LogLevel.Verbose: console.debug(message); break;
                default: break;
              }
            },
          },
        },
      });

      // Optionally pre-initialize (loads metadata) but happens in the browser:
      await instance.initialize();

      if (isMounted) setMsalInstance(instance);
    })();

    return () => { isMounted = false; };
  }, []);

  // You can provide a React context here if you like; for now just render once ready
  if (!msalInstance) return null; // or a small loader
  return <>{children}</>;
}
