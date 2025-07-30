import { GraphQLClient } from "graphql-request";
 
// Define your GraphQL endpoint URLs
const servicesEndpoint = "https://22af-54-37-203-255.ngrok-free.app/services-api";
const adminEndpoint = "https://22af-54-37-203-255.ngrok-free.app/admin-api";

// Session management
let sessionCookies: string = '';

// Create GraphQL clients with dynamic headers
class AuthenticatedGraphQLClient {
  private client: GraphQLClient;
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = new GraphQLClient(endpoint);
    this.updateClient();
  }

  private updateClient() {
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
    }

    this.client = new GraphQLClient(this.endpoint, {
      headers,
      credentials: 'include',
      mode: 'cors'
    });
  }

  async request<T = any, V = object>(query: string, ...args: any[]): Promise<T> {
    this.updateClient(); // Ensure latest session is used
    return await this.client.request<T>(query, ...args);
  }

  // Method to update session cookies
  setSessionCookies(cookies: string) {
    sessionCookies = cookies;
    this.updateClient();
  }

  // Get current session cookies
  getSessionCookies(): string {
    return sessionCookies;
  }
}

// Create clients for both endpoints
const servicesClient = new AuthenticatedGraphQLClient(servicesEndpoint);
const adminClient = new AuthenticatedGraphQLClient(adminEndpoint);

// Function to set session for both clients
export const setGlobalSession = (cookies: string) => {
  sessionCookies = cookies;
  servicesClient.setSessionCookies(cookies);
  adminClient.setSessionCookies(cookies);
};

// Function to get current session
export const getGlobalSession = () => sessionCookies;

// Export both clients
export { adminClient, servicesClient };
export default servicesClient; // Keep backward compatibility