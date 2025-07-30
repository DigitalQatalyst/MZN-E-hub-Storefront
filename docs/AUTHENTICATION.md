# Authentication System Documentation

## Overview

The community marketplace now includes an authentication system that automatically logs in users before making any API requests to fetch posts.

## Authentication Flow

### 1. **Login Process**
- **Endpoint**: `https://22af-54-37-203-255.ngrok-free.app/admin-api`
- **Method**: POST (GraphQL mutation)
- **Credentials**: `username: "superadmin"`, `password: "superadmin"`
- **Response**: Returns either `CurrentUser` (with id and identifier) or `ErrorResult`

### 2. **Authentication States**
- **Not authenticated**: Initial state, shows red indicator
- **Authenticating...**: During login process
- **Authenticated as: [identifier]**: Successfully logged in, shows green indicator
- **Authentication failed**: Login error occurred

## Implementation Details

### Files Created/Modified

#### `src/utils/__api__/auth.ts`
- Contains authentication service (singleton pattern)
- Handles login/logout functionality
- Manages authentication state
- Provides utility functions: `login()`, `logout()`, `isAuthenticated()`, `getCurrentUser()`

#### `src/utils/__api__/communityMarketPosts.ts`
- Modified to include authentication check before API calls
- Automatically authenticates if user is not logged in
- Handles authentication retry on auth errors
- Provides error handling for authentication failures

#### `src/page-sections/market-1/Section6.tsx`
- Added authentication status display
- Shows loading states for authentication process
- Includes manual login button for testing
- Enhanced error handling with authentication context

## Usage

### Automatic Authentication
1. User clicks "All Posts" filter
2. System checks if authenticated
3. If not authenticated, automatically calls login API
4. On successful authentication, fetches posts
5. Displays posts in the community feed

### Manual Authentication (Testing)
1. Click the "Login" button (visible when not authenticated)
2. System attempts authentication
3. Status indicator updates based on result

### Authentication Status Indicator
- **Red**: Not authenticated or authentication failed
- **Green**: Successfully authenticated
- Shows current user identifier when logged in

## API Endpoints

### Authentication
```
POST https://22af-54-37-203-255.ngrok-free.app/admin-api
```

### Posts
```
POST https://22af-54-37-203-255.ngrok-free.app/services-api
```

## Error Handling

The system handles several error scenarios:
- **Network errors**: Displays connection error messages
- **Authentication failures**: Shows specific auth error messages
- **Session expiry**: Automatically re-authenticates and retries
- **API errors**: Displays user-friendly error messages

## Testing

1. **Initial Load**: Check authentication status on page load
2. **Manual Login**: Use the login button to test authentication
3. **All Posts**: Click "All Posts" to test full flow (auth + posts)
4. **Error Cases**: Test with network disconnected to see error handling

## Technical Notes

- Uses GraphQL for both authentication and data fetching
- Implements singleton pattern for auth state management
- Includes automatic retry logic for expired sessions
- Provides comprehensive console logging for debugging
- Built with TypeScript for type safety

## Console Output

When functioning correctly, you should see:
```
User not authenticated, logging in...
Authentication successful: { id: "...", identifier: "superadmin" }
Fetching community posts...
Successfully loaded X posts
``` 