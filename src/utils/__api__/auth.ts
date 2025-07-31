import { adminClient, setGlobalSession } from "@lib/graphQLClient";

// Login mutation
const LOGIN_MUTATION = `
  mutation {
    login(username: "superadmin", password: "superadmin") {
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

// Interface for login response
export interface CurrentUser {
  id: string;
  identifier: string;
}

export interface ErrorResult {
  errorCode: string;
  message: string;
}

export interface LoginResponse {
  data?: {
    login: CurrentUser | ErrorResult;
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: any;
  }>;
}

// Authentication service
class AuthService {
  private static instance: AuthService;
  private isAuthenticated: boolean = false;
  private currentUser: CurrentUser | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Check if user is authenticated
  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  // Get current user
  public getCurrentUser(): CurrentUser | null {
    return this.currentUser;
  }

  // Login function using direct fetch to ensure proper cookie handling
  public async login(): Promise<CurrentUser> {
    try {
      console.log("Starting authentication with superadmin credentials...");
      console.log("Attempting to connect to admin-api endpoint...");
      
      // Use Next.js API route to avoid CORS issues
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are included and stored
      }).catch(error => {
        console.error("Network error during authentication:", error);
        throw new Error(`Network error: ${error.message}. Please check if the development server is running.`);
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();
      
      console.log("Full authentication response:", JSON.stringify(data, null, 2));
      
      // Check if response has errors
      if (data.errors && data.errors.length > 0) {
        const error = data.errors[0];
        console.error("GraphQL authentication error:", error);
        throw new Error(`Authentication failed: ${error.message}`);
      }
      
      // Check if we have data and data.login
      if (!data.data || !data.data.login) {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid authentication response structure");
      }
      
      const loginResult = data.data.login;
      
      // Check if login was successful (has id field)
      if (loginResult && typeof loginResult === 'object' && 'id' in loginResult) {
        // Success case - CurrentUser
        this.currentUser = loginResult as CurrentUser;
        this.isAuthenticated = true;
        
        console.log("Authentication successful - session cookies handled by Next.js API");
        console.log("Authentication successful:", this.currentUser);
        return this.currentUser;
      } else if (loginResult && typeof loginResult === 'object' && 'errorCode' in loginResult) {
        // Error case - ErrorResult
        const error = loginResult as ErrorResult;
        console.error("Authentication failed:", error);
        throw new Error(`Authentication failed: ${error.message} (${error.errorCode})`);
      } else {
        console.error("Unexpected login result structure:", loginResult);
        throw new Error("Unexpected authentication response format");
      }
    } catch (error) {
      console.error("Login error:", error);
      this.isAuthenticated = false;
      this.currentUser = null;
      throw new Error("Failed to authenticate. Please try again.");
    }
  }

  // Extract session cookies from document.cookie
  private extractSessionCookies(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const sessionCookies = cookies.filter(cookie => 
      cookie.startsWith('session=') || cookie.startsWith('session.sig=')
    );
    
    if (sessionCookies.length > 0) {
      return sessionCookies.join('; ');
    }
    
    return null;
  }

  // Logout function
  public logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Convenience functions
export const login = () => authService.login();
export const logout = () => authService.logout();
export const isAuthenticated = () => authService.isUserAuthenticated();
export const getCurrentUser = () => authService.getCurrentUser(); 