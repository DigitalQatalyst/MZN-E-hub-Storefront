"use client";

import { ReactNode, useEffect } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from "@lib/authConfig";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (isAuthenticated) return;
    if (inProgress !== InteractionStatus.None) return;

    const href = typeof window !== "undefined" ? window.location.href : undefined;

    // Redirect to login and come back to this exact page after auth
    instance.loginRedirect({
      ...loginRequest,
      redirectStartPage: href, // preserve target route
    });
  }, [isAuthenticated, inProgress, instance]);

  // Optional: show a lightweight placeholder while we decide
  if (!isAuthenticated) return null; // or a spinner/skeleton

  return <>{children}</>;
}
