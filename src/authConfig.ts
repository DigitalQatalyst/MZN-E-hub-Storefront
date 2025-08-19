// b2cConfig.ts (no "use client" here, safe to import anywhere)
export const tenantName = "dgqatalyst";
export const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";

const flows = {
  localAccSignIn: "B2C_1_KF_SignUpSignIn",
};

const activeFlow = flows.localAccSignIn;

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
    "https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/Files.Read",
  ],
};
