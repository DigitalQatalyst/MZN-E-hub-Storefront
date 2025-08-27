// authConfig.ts
import { LogLevel, type Configuration, type RedirectRequest, type EndSessionRequest } from "@azure/msal-browser";

// ====== Tenant/App ======
export const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";
export const tenantName = "dgqatalyst";

// ====== B2C Policies ======
// Maintain separate keys so TypeScript doesn't break
const flows = {
  signIn: "B2C_1_KF_SignIn",           // login only
  signUpSignIn: "B2C_1_KF_SignUpSignIn", // SUSI (if you use it)
  signUp: "B2C_1_KF_Signup",           // dedicated signup (your screenshot)
};

// Choose which policy you want to use for normal "sign in"
const activeFlow = flows.signIn;

export const b2cPolicies = {
  names: {
    signUpSignIn: activeFlow,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${activeFlow}`,
    },
  },
  authorityDomain: `${tenantName}.b2clogin.com`,
};

// Explicit signup authority for the "Sign Up" button
export const signupAuthority = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${flows.signUp}`;

// ====== Redirects ======
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const redirectPath = "/callback";
export const redirectUri = `${siteUrl}${redirectPath}`;

// ====== MSAL Config ======
export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri,
    postLogoutRedirectUri: `${siteUrl}/`,
    navigateToLoginRequestUrl: false,
  },
  cache: { cacheLocation: "sessionStorage", storeAuthStateInCookie: false },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:   console.error(message); break;
          case LogLevel.Info:    console.info(message);  break;
          case LogLevel.Verbose: console.debug(message); break;
          case LogLevel.Warning: console.warn(message);  break;
        }
      },
    },
  },
};

export const authScopes = {
  scopes: [
    "openid",
    "offline_access",
    "https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/Files.Read",
  ],
};

export const loginRequest: RedirectRequest = {
  authority: b2cPolicies.authorities.signUpSignIn.authority,
  scopes: authScopes.scopes,
  extraQueryParameters: { prompt: "login" },
};

export const logoutRequest: EndSessionRequest = {};
