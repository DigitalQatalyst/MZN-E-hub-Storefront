// authConfig.ts
import { LogLevel, Configuration, RedirectRequest, EndSessionRequest } from "@azure/msal-browser";

// ====== Tenant/App ======
export const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";
export const tenantName = "dgqatalyst";
// src/authConfig.ts
export const signUpPolicy = "B2C_1_KF_Signup";

export const signupAuthority =
  `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${signUpPolicy}`;


// ====== B2C Policies ======
const flows = {
  signIn: "B2C_1_KF_SignIn",
  // If you later add more, e.g. signUp: "B2C_1_KF_SignUp"
};
const activeFlow = flows.signIn;

export const b2cPolicies = {
  names: {
    signUpSignIn: activeFlow,
  },
  authorities: {
    signUpSignIn: {
      // e.g. https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_KF_SignIn
      authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${activeFlow}`,
    },
  },
  authorityDomain: `${tenantName}.b2clogin.com`,
};

// ====== Site URL / Redirects ======
/**
 * In Vercel set:
 *   NEXT_PUBLIC_SITE_URL=https://mzn-e-hub-storefront.vercel.app
 * Locally it will default to http://localhost:3000
 */
// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const redirectPath = "/callback"; // matches your userflow endpoint redirect
export const redirectUri = `${siteUrl}${redirectPath}`;

// ====== MSAL Config ======
export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri,                         // -> https://mzn-e-hub-storefront.vercel.app/callback (in prod)
    postLogoutRedirectUri: `${siteUrl}/`,
    navigateToLoginRequestUrl: false,    // come back to our app route after auth
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
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

// ====== Scopes ======
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

export const signupRequest: RedirectRequest = {
  authority: signupAuthority,                // dedicated signup policy
  scopes: ["openid", "offline_access"],
  extraQueryParameters: { prompt: "login" },
};

export const logoutRequest: EndSessionRequest = {
  // Uses msalConfig.auth.postLogoutRedirectUri by default; override here only if you need to
};
