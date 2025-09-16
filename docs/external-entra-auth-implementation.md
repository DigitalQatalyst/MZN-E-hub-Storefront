# External Entra Authentication Implementation

## Overview

This Next.js application implements authentication using Microsoft Entra External ID (formerly Azure AD B2C) through the Microsoft Authentication Library (MSAL) for JavaScript. The implementation supports user sign-in, sign-up, and logout with both popup and redirect flows.

## Architecture

The authentication system consists of several key components:

- **MSAL Configuration**: Centralized configuration for Entra External ID tenant
- **Provider Wrappers**: Multiple MSAL provider implementations to handle SSR compatibility
- **Authentication Components**: Navbar integration with login/logout functionality
- **Callback Handling**: Custom token exchange implementation
- **Session Management**: Local storage-based session persistence

## Configuration

### MSAL Configuration (`src/lib/authConfig.ts`)

The configuration supports both standard Entra External ID domains and custom domains:

```typescript
export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: authority, // Dynamic based on subdomain or custom domain
    knownAuthorities: [domain],
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: false,
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
```

**Authority Construction:**
- Custom domain: `https://{custom-domain}/{tenant-id}`
- Default: `https://{subdomain}.ciamlogin.com/`

### Environment Variables

Required environment variables for configuration:

```env
NEXT_PUBLIC_CIAM_SUBDOMAIN=dqproj
NEXT_PUBLIC_AAD_CLIENT_ID=your-client-id
NEXT_PUBLIC_REDIRECT_URI=https://yourapp.com/auth/callback
NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI=https://yourapp.com/
NEXT_PUBLIC_API_SCOPES=https://yourtenant.onmicrosoft.com/api/read
NEXT_PUBLIC_CIAM_CUSTOM_DOMAIN=login.yourdomain.com (optional)
NEXT_PUBLIC_TENANT_ID=your-tenant-guid (required with custom domain)
```

## Provider Implementations

### Root Provider (`src/contexts/MsalProvider.tsx`)

Basic MSAL provider wrapper for the application root:

```typescript
const msalInstance = new PublicClientApplication(msalConfig);

export function MSALProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}
```

### Client-Side Provider (`src/contexts/MsalProviderClient.tsx`)

Handles dynamic imports to avoid SSR issues:

```typescript
useEffect(() => {
  (async () => {
    const { PublicClientApplication } = await import("@azure/msal-browser");
    const instance = new PublicClientApplication(msalConfig);
    await instance.initialize();
    setMsalInstance(instance);
  })();
}, []);
```

### Alternative Wrappers

- `src/components/MsalWrapper.tsx`: State-based instance management
- `src/app/msalProviders.tsx`: Direct instance provider

## Authentication Flow

### Login/Signup Process

1. **Initiation**: User clicks login/signup in navbar
2. **Popup Flow**: Attempts `loginPopup()` with scopes
3. **Fallback**: Falls back to `loginRedirect()` if popup fails
4. **Callback**: Redirects to `/auth/callback` for token exchange
5. **Session**: Stores decoded JWT in localStorage
6. **Redirect**: Routes to dashboard or onboarding

### Navbar Integration (`src/components/navbar/NavbarMarketplace.tsx`)

```typescript
const handleLogin = async () => {
  try {
    const res = await instance.loginPopup(loginRequest);
    instance.setActiveAccount(res.account);
    router.replace("/dashboard");
  } catch (e) {
    // Fallback to redirect
    await instance.loginRedirect(loginRequest);
  }
};
```

### Callback Handling (`src/app/auth/callback/page.tsx`)

Custom implementation that exchanges authorization code for tokens:

```typescript
const handleAuthentication = async () => {
  // Try sign-in endpoint first
  let result = await exchangeCode(loginUrl);

  // Fallback to sign-up if sign-in fails
  if (result.error === "invalid_grant") {
    result = await exchangeCode(signUpUrl);
  }

  // Store session and redirect
  if (result.id_token) {
    const decoded: AuthSession = jwtDecode(result.id_token);
    storeSession(decoded);
    window.location.href = "/dashboard";
  }
};
```

## Session Management

### Session Utilities (`src/app/auth/session_utils.ts`)

```typescript
export interface AuthSession {
  exp: number;
  nbf: number;
  ver: string;
  iss: string;
  sub: string;
  aud: string;
  nonce: string;
  iat: number;
  auth_time: number;
  idp: string;
  name: string;
  given_name: string;
  family_name: string;
  emails: string[];
  tfp: string;
}

export function getSession(): AuthSession | null {
  const session = localStorage.getItem("session");
  return session ? JSON.parse(session) : null;
}
```

## MSAL Hooks Usage

### Authentication State

```typescript
const { instance, accounts, inProgress } = useMsal();
const isAuthenticated = useIsAuthenticated();
```

### Account Management

```typescript
const activeAccount = instance.getActiveAccount() ?? accounts[0];
const displayName = activeAccount?.idTokenClaims?.name || "User";
```

### Event Handling

```typescript
instance.addEventCallback((evt: EventMessage) => {
  if (evt.eventType === EventType.LOGIN_SUCCESS) {
    const result = evt.payload as AuthenticationResult;
    instance.setActiveAccount(result.account);
    router.replace("/onboarding");
  }
});
```

## Security Considerations

1. **Token Storage**: Uses localStorage (consider sessionStorage for sensitive apps)
2. **Redirect URIs**: Must match registered application URIs in Entra
3. **Scopes**: Limited to necessary permissions
4. **Error Handling**: Graceful fallbacks for popup blocking
5. **Session Validation**: Check token expiration before API calls

## Dependencies

```json
{
  "@azure/msal-browser": "^3.x.x",
  "@azure/msal-react": "^2.x.x",
  "jwt-decode": "^4.x.x"
}
```

## Known Issues & Notes

- Multiple provider implementations exist - consolidation recommended
- Custom callback implementation bypasses MSAL's built-in redirect handling
- Login/Signup pages are placeholders - full implementation commented out
- B2C policy references in code may need updating for External ID

## Migration Notes

The codebase contains commented B2C-specific code. For full External ID migration:

1. Update authority URLs to use `ciamlogin.com`
2. Replace B2C policies with External ID user flows
3. Update scope formats if necessary
4. Test custom domain configuration

## Testing

Test authentication flows:

1. Login popup and redirect
2. Signup flow
3. Logout functionality
4. Session persistence across page reloads
5. Token expiration handling
6. Error scenarios (popup blocked, invalid credentials)
