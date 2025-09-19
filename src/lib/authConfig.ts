import { Configuration, LogLevel } from "@azure/msal-browser";

const SUB = process.env.NEXT_PUBLIC_CIAM_SUBDOMAIN!;           // e.g. "dqproj"
const CLIENT_ID = process.env.NEXT_PUBLIC_AAD_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;
const POST_LOGOUT_REDIRECT_URI = process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI!;
const API_SCOPES = (process.env.NEXT_PUBLIC_API_SCOPES || "").split(/\s+/).filter(Boolean);

// ---- Choose authority: default ciamlogin OR custom domain (if set) ----
const CUSTOM_DOMAIN = process.env.NEXT_PUBLIC_CIAM_CUSTOM_DOMAIN; // e.g., "login.example.com"
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;              // GUID tenant id (only needed with custom domain)

const authority = CUSTOM_DOMAIN && TENANT_ID
  // custom URL domain pattern (doc): https://<custom-domain>/<tenant-id>
  ? `https://${CUSTOM_DOMAIN}/${TENANT_ID}`
  // external tenant default pattern (doc): https://<subdomain>.ciamlogin.com/
  : `https://${SUB}.ciamlogin.com/`;
  

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority,
    knownAuthorities: [CUSTOM_DOMAIN ? CUSTOM_DOMAIN : `${SUB}.ciamlogin.com`], // doc: add knownAuthorities
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      loggerCallback: (level, message) => {
        if (level >= LogLevel.Error) console.error(message);
      },
    },
  },
};

// Minimal login request (External ID samples keep this empty or OIDC-only)
export const loginRequest = { scopes: API_SCOPES.length ? API_SCOPES : [] };































































































































































































// // src/authConfig.ts
// import type { Configuration } from "@azure/msal-browser";

// /**
//  * Use your B2C tenant *name* (the part before .onmicrosoft.com), e.g. "dgqatalyst"
//  * If you’ve enabled a custom domain (e.g. login.example.com), use that for KNOWN_AUTHORITY_HOST.
//  */
// const TENANT_NAME =
//   process.env.NEXT_PUBLIC_B2C_TENANT_NAME ?? "dgqatalyst"; // <-- NOT a GUID
// const POLICY_SIGNIN =
//   process.env.NEXT_PUBLIC_B2C_POLICY_SIGNIN ?? "B2C_1_KF_SignIn";
// export const POLICY_SIGNUP =
//   process.env.NEXT_PUBLIC_B2C_POLICY_SIGNUP ?? "B2C_1_KF_Signup";

// // If you use the default b2clogin host:
// const KNOWN_AUTHORITY_HOST =
//   process.env.NEXT_PUBLIC_B2C_AUTHORITY_HOST ??
//   `${TENANT_NAME}.b2clogin.com`; // or your custom domain host

// const BASE_AUTHORITY = `https://${KNOWN_AUTHORITY_HOST}/${TENANT_NAME}.onmicrosoft.com`;

// const clientId =
//   process.env.NEXT_PUBLIC_B2C_CLIENT_ID ?? "b94aa491-036c-4ddb-8bbf-12b510113078";
// const redirectUri =
//   process.env.NEXT_PUBLIC_B2C_REDIRECT_URI ?? "http://localhost:3000";
// const postLogoutRedirectUri =
//   process.env.NEXT_PUBLIC_B2C_POSTLOGOUT_URI ?? redirectUri;

// export const msalConfig: Configuration = {
//   auth: {
//     clientId,
//     authority: `${BASE_AUTHORITY}/${POLICY_SIGNIN}`, // default policy (sign-in)
//     knownAuthorities: [KNOWN_AUTHORITY_HOST],        // host only, no path
//     redirectUri,
//     postLogoutRedirectUri,
//     navigateToLoginRequestUrl: false,
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: false,
//   },
// };

// // common scopes
// export const loginRequest = {
//   scopes: ["openid", "profile", "email", "offline_access"],
// };

// // handy helper for signup policy authority
// export const signupAuthority = `${BASE_AUTHORITY}/${POLICY_SIGNUP}`;


// // import { LogLevel, Configuration, RedirectRequest, EndSessionRequest } from "@azure/msal-browser";

// // // ====== Tenant/App ======
// // export const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";
// // export const tenantName = "dgqatalyst";
// // // src/authConfig.ts
// // export const signUpPolicy = "B2C_1_KF_Signup";

// // export const signupAuthority =
// //   `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${signUpPolicy}`;


// // // ====== B2C Policies ======
// // const flows = {
// //   signIn: "B2C_1_KF_SignIn",
// //   // If you later add more, e.g. signUp: "B2C_1_KF_SignUp"
// // };
// // const activeFlow = flows.signIn;

// // export const b2cPolicies = {
// //   names: {
// //     signUpSignIn: activeFlow,
// //   },
// //   authorities: {
// //     signUpSignIn: {
// //       // e.g. https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_KF_SignIn
// //       authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${activeFlow}`,
// //     },
// //   },
// //   authorityDomain: `${tenantName}.b2clogin.com`,
// // };

// // // ====== Site URL / Redirects ======
// // /**
// //  * In Vercel set:
// //  *   NEXT_PUBLIC_SITE_URL=https://mzn-e-hub-storefront.vercel.app
// //  * Locally it will default to http://localhost:3000
// //  */
// // // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
// // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
// // const redirectPath = "/callback"; // matches your userflow endpoint redirect
// // export const redirectUri = `${siteUrl}${redirectPath}`;

// // // ====== MSAL Config ======
// // export const msalConfig: Configuration = {
// //   auth: {
// //     clientId,
// //     authority: b2cPolicies.authorities.signUpSignIn.authority,
// //     knownAuthorities: [b2cPolicies.authorityDomain],
// //     redirectUri,                         // -> https://mzn-e-hub-storefront.vercel.app/callback (in prod)
// //     postLogoutRedirectUri: `${siteUrl}/`,
// //     navigateToLoginRequestUrl: false,    // come back to our app route after auth
// //   },
// //   cache: {
// //     cacheLocation: "sessionStorage",
// //     storeAuthStateInCookie: false,
// //   },
// //   system: {
// //     loggerOptions: {
// //       loggerCallback: (level, message, containsPii) => {
// //         if (containsPii) return;
// //         switch (level) {
// //           case LogLevel.Error:   console.error(message); break;
// //           case LogLevel.Info:    console.info(message);  break;
// //           case LogLevel.Verbose: console.debug(message); break;
// //           case LogLevel.Warning: console.warn(message);  break;
// //         }
// //       },
// //     },
// //   },
// // };

// // // ====== Scopes ======
// // export const authScopes = {
// //   scopes: [
// //     "openid",
// //     "offline_access",
// //     "profile",
// //     "email"
// //   ],
// // };

// // export const loginRequest: RedirectRequest = {
// //   authority: b2cPolicies.authorities.signUpSignIn.authority,
// //   scopes: authScopes.scopes,
// //   extraQueryParameters: { prompt: "login" },
// // };

// // export const signupRequest: RedirectRequest = {
// //   authority: signupAuthority,                // dedicated signup policy
// //   scopes: ["openid", "offline_access", ...authScopes.scopes],
// //   extraQueryParameters: { prompt: "login" },
// // };

// // export const logoutRequest: EndSessionRequest = {
// //   // Uses msalConfig.auth.postLogoutRedirectUri by default; override here only if you need to
// // };