
import { LogLevel } from "@azure/msal-browser";

const clientId = "b94aa491-036c-4ddb-8bbf-12b510113078";

const tenantName = "dgqatalyst";

const flows = {
  localAccSignIn: "B2C_1_KF_SingIn", 
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
    clientId: clientId, // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    //redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    //postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};


export const authScopes = {
  scopes: [
    "https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/Files.Read",
  ],
};
