// src/authConfig.ts
import type { Configuration } from "@azure/msal-browser";

const TENANT_NAME = process.env.NEXT_PUBLIC_B2C_TENANT_NAME ?? "dgqatalyst";
const POLICY_SIGNIN = process.env.NEXT_PUBLIC_B2C_POLICY_SIGNIN ?? "B2C_1_KF_SignIn";
export const POLICY_SIGNUP = process.env.NEXT_PUBLIC_B2C_POLICY_SIGNUP ?? "B2C_1_KF_Signup";

const KNOWN_AUTHORITY_HOST =
  process.env.NEXT_PUBLIC_B2C_AUTHORITY_HOST ?? `${TENANT_NAME}.b2clogin.com`;

const BASE_AUTHORITY = `https://${KNOWN_AUTHORITY_HOST}/${TENANT_NAME}.onmicrosoft.com`;

const clientId = process.env.NEXT_PUBLIC_B2C_CLIENT_ID!;

const runtimeOrigin =
  typeof window !== "undefined" ? window.location.origin : undefined;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `${BASE_AUTHORITY}/${POLICY_SIGNIN}`,
    knownAuthorities: [KNOWN_AUTHORITY_HOST],
    redirectUri: runtimeOrigin,          // 👈 always the current origin
    postLogoutRedirectUri: runtimeOrigin // 👈 match origin too
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email", "offline_access"],
};

export const signupAuthority = `${BASE_AUTHORITY}/${POLICY_SIGNUP}`;
