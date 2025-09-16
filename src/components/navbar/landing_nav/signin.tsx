"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FlexBox from "../../FlexBox";
import Icon from "../../icon/Icon";
import Typography from "../../Typography";
import { StyledNavbar } from "./styles";

import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import {
  InteractionStatus,
  EventType,
  AuthenticationResult,
  EventMessage,
} from "@azure/msal-browser";
import { loginRequest } from "@lib/authConfig";

interface SigninProps {
  onClick?: () => void; // optional: close mobile menu, etc.
}

/** Hydrate active account once MSAL is idle */
function useHydrateActiveAccount() {
  const { instance, inProgress } = useMsal();

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;
    try {
      const current = instance.getActiveAccount();
      if (!current) {
        const all = instance.getAllAccounts();
        if (all.length) instance.setActiveAccount(all[0]);
      }
    } catch (err) {
      console.warn("MSAL not fully initialized yet:", err);
    }
  }, [instance, inProgress]);
}

export default function Signin({ onClick }: SigninProps) {
  const router = useRouter();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [isMsalInitialized, setIsMsalInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useHydrateActiveAccount();

  // mark MSAL ready once interaction is idle
  useEffect(() => {
    if (inProgress === InteractionStatus.None) setIsMsalInitialized(true);
  }, [inProgress]);

  // optional: react to successful auth events (sets active account, navigates)
  useEffect(() => {
    if (!isMsalInitialized) return;
    const cbId = instance.addEventCallback((evt: EventMessage) => {
      if (
        evt.eventType === EventType.LOGIN_SUCCESS ||
        evt.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
      ) {
        const result = evt.payload as AuthenticationResult;
        const acct =
          result.account ||
          instance.getActiveAccount() ||
          instance.getAllAccounts()[0];

        if (acct) instance.setActiveAccount(acct);

        // navigate only when idle
        if (inProgress === InteractionStatus.None) {
          router.replace("/dashboard");
        }
      }
    });
    return () => {
      if (cbId) instance.removeEventCallback(cbId);
    };
  }, [instance, router, inProgress, isMsalInitialized]);

  const handleSignIn = async () => {
    if (onClick) onClick();
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    try {
      const res = await instance.loginPopup(loginRequest);
      if (res?.account) instance.setActiveAccount(res.account);
      router.replace("/dashboard");
    } catch (e: any) {
      const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
      if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
        await instance.loginRedirect(loginRequest);
        return;
      }
      console.error("login failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (onClick) onClick();
    if (!isMsalInitialized) {
      console.warn("MSAL not initialized yet");
      return;
    }
    setIsLoading(true);
    try {
      const signUpRequest = {
        ...loginRequest,
        // Force SUSI to open on the Sign Up panel
        extraQueryParameters: { prompt: "create" },
      };
      const res = await instance.loginPopup(signUpRequest);
      if (res?.account) instance.setActiveAccount(res.account);
      router.replace("/onboarding");
    } catch (e: any) {
      const msg = `${e?.errorCode || ""} ${e?.message || ""}`.toLowerCase();
      if (msg.includes("popup_window_error") || msg.includes("monitor_window_timeout")) {
        await instance.loginRedirect({
          ...loginRequest,
          extraQueryParameters: { prompt: "create" },
        });
        return;
      }
      console.error("signup failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!isMsalInitialized) return;
    await instance.logoutRedirect();
  };

  return (
    <StyledNavbar>
      {!isAuthenticated ? (
        <FlexBox
          alignItems="center"
          style={{
            cursor: "pointer",
            color: "#FFF",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          <Icon
            className="profile-icon"
            size="30px"
            color="#002180"
            marginRight="5px"
            onClick={handleSignIn}
          >
            profile
          </Icon>

          <Typography color="#FFF" fontSize="14px" onClick={handleSignIn}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Typography>

          <Typography color="#FFF" fontSize="14px" marginLeft={"7px"}>
            &nbsp;or
          </Typography>

          <Typography
            color="#FFF"
            fontSize="14px"
            marginLeft={"7px"}
            onClick={handleRegister}
          >
            Register
          </Typography>
        </FlexBox>
      ) : (
        <FlexBox alignItems="center" style={{ gap: 8 }}>
          <Typography color="#FFF" fontSize="14px">
            Signed in
          </Typography>
          <Typography
            color="#FFF"
            fontSize="14px"
            marginLeft={"7px"}
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Typography>
        </FlexBox>
      )}
    </StyledNavbar>
  );
}
