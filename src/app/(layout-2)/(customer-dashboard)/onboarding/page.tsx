"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import OnboardingForm from "../../../../components/forms/onboardingForms";

export default function OnboardingPage() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();
  const [msalInitialized, setMsalInitialized] = useState(false);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      setMsalInitialized(true);
    }
  }, [inProgress]);

  useEffect(() => {
    if (!msalInitialized) return; // wait for MSAL to initialize

    if (!isAuthenticated) {
      // User is not authenticated, redirect to home
      router.push("/");
      return;
    }

    // Check if onboarding was already completed or skipped
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    const onboardingSkipped = localStorage.getItem("onboarding_skipped");

    if (onboardingCompleted || onboardingSkipped) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, msalInitialized, router]);

  if (!msalInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return <OnboardingForm />;
}
