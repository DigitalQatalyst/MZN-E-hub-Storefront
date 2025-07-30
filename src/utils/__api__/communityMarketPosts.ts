import { servicesClient, getGlobalSession } from "@lib/graphQLClient";
import { authService } from "./auth";

// Helper function to get current session cookies
const getCurrentSessionCookies = (): string | null => {
  // First try to get from global session
  const globalSession = getGlobalSession();
  if (globalSession) {
    return globalSession;
  }
  
  // Fallback to reading from document.cookie
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const sessionCookies = cookies.filter(cookie => 
      cookie.startsWith('session=') || cookie.startsWith('session.sig=')
    );
    
    if (sessionCookies.length > 0) {
      return sessionCookies.join('; ');
    }
  }
  
  return null;
};

// GraphQL query for fetching posts
const GET_POSTS_QUERY = `
  query {
    posts {
      id
      title
      content
      tag
      views
      createdAt
      updatedAt
      author {
        id
      }
      comments {
        id
        text
        createdAt
        author {
          id
        }
      }
    }
  }
`;

// Interface for the API response
export interface Post {
  id: string;
  title: string;
  content: string;
  tag: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
  };
  comments: Array<{
    id: string;
    text: string;
    createdAt: string;
    author: {
      id: string;
    };
  }>;
}

export interface PostsResponse {
  data?: {
    posts: Post[];
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: any;
  }>;
}

// API function to fetch community posts with authentication
export const getCommunityPosts = async (): Promise<Post[]> => {
  try {
    // Check if user is authenticated, if not, authenticate first
    if (!authService.isUserAuthenticated()) {
      console.log("User not authenticated, logging in...");
      await authService.login();
    }

    console.log("Fetching community posts with authenticated session...");
    
    // Get current session cookies
    const sessionCookies = getCurrentSessionCookies();
    
    // Prepare headers
    const headers: Record<string, string> = {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Origin': 'https://22af-54-37-203-255.ngrok-free.app'
    };
    
    // Add session cookies if available
    if (sessionCookies) {
      headers['Cookie'] = sessionCookies;
      console.log("Including session cookies in request:", sessionCookies);
    }
    
    // Use direct fetch to ensure cookies are properly sent
    const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/services-api", {
      method: "POST",
      headers,
      credentials: 'include', // This ensures cookies are included
      body: JSON.stringify({
        query: GET_POSTS_QUERY
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();
    
    console.log("Full posts response:", JSON.stringify(data, null, 2));
    
    // Check for GraphQL errors
    if (data.errors && data.errors.length > 0) {
      console.error("GraphQL errors details:", JSON.stringify(data.errors, null, 2));
      const error = data.errors[0];
      throw new Error(`GraphQL error: ${error.message} (Code: ${error.extensions?.code || 'N/A'})`);
    }
    
    // Check if we have data.posts
    if (!data.data || !data.data.posts) {
      console.error("Invalid posts response structure:", data);
      throw new Error("Invalid posts response structure");
    }
    
    console.log(`Successfully fetched ${data.data.posts.length} posts`);
    return data.data.posts;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    
    // If it's an authentication error, try to re-authenticate
    if (error instanceof Error && (error.message.includes("unauthorized") || error.message.includes("FORBIDDEN"))) {
      try {
        console.log("Authentication expired, re-authenticating...");
        await authService.login();
        
        // Get updated session cookies after re-authentication
        const retrySessionCookies = getCurrentSessionCookies();
        
        // Prepare headers for retry
        const retryHeaders: Record<string, string> = {
          'Accept-Encoding': 'gzip, deflate, br',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Connection': 'keep-alive',
          'DNT': '1',
          'Origin': 'https://22af-54-37-203-255.ngrok-free.app'
        };
        
        // Add session cookies if available
        if (retrySessionCookies) {
          retryHeaders['Cookie'] = retrySessionCookies;
          console.log("Including updated session cookies in retry:", retrySessionCookies);
        }
        
        // Retry the request after re-authentication
        const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/services-api", {
          method: "POST",
          headers: retryHeaders,
          credentials: 'include',
          body: JSON.stringify({
            query: GET_POSTS_QUERY
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();
        
        console.log("Full retry posts response:", JSON.stringify(data, null, 2));
        
        if (data.errors && data.errors.length > 0) {
          const error = data.errors[0];
          throw new Error(`GraphQL error: ${error.message} (Code: ${error.extensions?.code || 'N/A'})`);
        }
        
        if (!data.data || !data.data.posts) {
          throw new Error("Invalid posts response structure");
        }
        
        return data.data.posts;
      } catch (retryError) {
        console.error("Failed to re-authenticate:", retryError);
        throw new Error("Authentication failed. Please try again.");
      }
    }
    
    throw new Error("Failed to fetch community posts");
  }
}; 