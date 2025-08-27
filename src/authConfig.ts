// b2cConfig.ts (no "use client" here, safe to import anywhere)
export const tenantName = "dgqatalyst";
export const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";

const flows = {
  localAccSignIn: "B2C_1_KF_SignUpSignIn",
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

export const msalConfig = {
  auth: {
    clientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    // redirectUri: "/",
    // postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  // ⚠️ Do NOT put loggerOptions here to avoid importing LogLevel on the server
};

export const authScopes = {
  scopes: [
    "openid",
    "offline_access",
    "https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/Files.Read",
  ],
};

// ====== Ready-to-use requests ======
export const loginRequest: RedirectRequest = {
  authority: b2cPolicies.authorities.signUpSignIn.authority,
  scopes: authScopes.scopes,
  // Forces showing the sign-in screen, which is useful when testing:
  extraQueryParameters: { prompt: "login" },
  // DO NOT set redirectUri here; use the global one in msalConfig.auth.redirectUri
};

export const logoutRequest: EndSessionRequest = {
  // Uses msalConfig.auth.postLogoutRedirectUri by default; override here only if you need to
};
