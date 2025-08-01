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
      comments {
        id
        text
        createdAt
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
  comments: Array<{
    id: string;
    text: string;
    createdAt: string;
  }>;
}

// Interface for recent posts (similar to Post but may have fewer fields)
export interface RecentPost {
  id: string;
  title: string;
  content: string;
  tag: string;
  views: number;
  createdAt: string;
  updatedAt: string;
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

export interface RecentPostsResponse {
  data?: {
    recentPosts: RecentPost[];
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
    
    // Use Next.js API route to avoid CORS issues
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This ensures cookies are included
      body: JSON.stringify({
        queryType: 'all'
      })
    }).catch(error => {
      console.error("Network error during posts fetch:", error);
      throw new Error(`Network error: ${error.message}. Please check if the development server is running.`);
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
      
      // Provide more specific error messages for common issues
      if (error.message.includes("Cannot return null for non-nullable field")) {
        throw new Error("API schema issue: Some required fields are missing in the database. Please contact the API team.");
      }
      
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
        
        // Retry the request after re-authentication using API route
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            queryType: 'all'
          })
        }).catch(error => {
          console.error("Network error during retry:", error);
          throw new Error(`Network error on retry: ${error.message}`);
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();
        
        console.log("Full retry posts response:", JSON.stringify(data, null, 2));
        
        if (data.errors && data.errors.length > 0) {
          const error = data.errors[0];
          
          // Provide more specific error messages for common issues
          if (error.message.includes("Cannot return null for non-nullable field")) {
            throw new Error("API schema issue: Some required fields are missing in the database. Please contact the API team.");
          }
          
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

// API function to fetch recent posts with authentication
export const getRecentPosts = async (limit: number = 5): Promise<RecentPost[]> => {
  try {
    // Check if user is authenticated, if not, authenticate first
    if (!authService.isUserAuthenticated()) {
      console.log("User not authenticated, logging in...");
      await authService.login();
    }

    console.log(`Fetching recent posts with limit ${limit} and authenticated session...`);
    
    // Use Next.js API route to avoid CORS issues
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // This ensures cookies are included
      body: JSON.stringify({
        queryType: 'recent',
        limit: limit
      })
    }).catch(error => {
      console.error("Network error during recent posts fetch:", error);
      throw new Error(`Network error: ${error.message}. Please check if the development server is running.`);
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();
    
    console.log("Full recent posts response:", JSON.stringify(data, null, 2));
    
    // Check for GraphQL errors
    if (data.errors && data.errors.length > 0) {
      console.error("GraphQL errors details:", JSON.stringify(data.errors, null, 2));
      const error = data.errors[0];
      
      // Provide more specific error messages for common issues
      if (error.message.includes("Cannot return null for non-nullable field")) {
        throw new Error("API schema issue: Some required fields are missing in the database. Please contact the API team.");
      }
      
      throw new Error(`GraphQL error: ${error.message} (Code: ${error.extensions?.code || 'N/A'})`);
    }
    
    // Check if we have data.recentPosts
    if (!data.data || !data.data.recentPosts) {
      console.error("Invalid recent posts response structure:", data);
      throw new Error("Invalid recent posts response structure");
    }
    
    console.log(`Successfully fetched ${data.data.recentPosts.length} recent posts`);
    return data.data.recentPosts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    
    // If it's an authentication error, try to re-authenticate
    if (error instanceof Error && (error.message.includes("unauthorized") || error.message.includes("FORBIDDEN"))) {
      try {
        console.log("Authentication expired, re-authenticating...");
        await authService.login();
        
        // Retry the request after re-authentication using API route
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            queryType: 'recent',
            limit: limit
          })
        }).catch(error => {
          console.error("Network error during retry:", error);
          throw new Error(`Network error on retry: ${error.message}`);
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();
        
        console.log("Full retry recent posts response:", JSON.stringify(data, null, 2));
        
        if (data.errors && data.errors.length > 0) {
          const error = data.errors[0];
          
          // Provide more specific error messages for common issues
          if (error.message.includes("Cannot return null for non-nullable field")) {
            throw new Error("API schema issue: Some required fields are missing in the database. Please contact the API team.");
          }
          
          throw new Error(`GraphQL error: ${error.message} (Code: ${error.extensions?.code || 'N/A'})`);
        }
        
        if (!data.data || !data.data.recentPosts) {
          throw new Error("Invalid recent posts response structure");
        }
        
        return data.data.recentPosts;
      } catch (retryError) {
        console.error("Failed to re-authenticate:", retryError);
        throw new Error("Authentication failed. Please try again.");
      }
    }
    
    throw new Error("Failed to fetch recent posts");
  }
}; 