import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./lib/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);
