import type { Configuration, PopupRequest } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId:
      process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || "your-azure-app-client-id", // Replace with your Azure App Registration client ID
    authority:
      process.env.NEXT_PUBLIC_AZURE_AUTHORITY ||
      "https://login.microsoftonline.com/your-tenant-id", // Replace with your tenant ID
    redirectUri:
      process.env.NEXT_PUBLIC_REDIRECT_URI ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000"),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Request configurations for login
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
  prompt: "select_account",
};

// Request configurations for signup
export const signupRequest: PopupRequest = {
  scopes: ["User.Read"],
  prompt: "create",
};

// Logout request configuration
export const logoutRequest = {
  postLogoutRedirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URI ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"),
  mainWindowRedirectUri:
    process.env.NEXT_PUBLIC_REDIRECT_URI ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"),
};
