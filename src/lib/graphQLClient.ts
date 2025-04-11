import { GraphQLClient } from "graphql-request";

// Define your GraphQL endpoint URL here
const endpoint = "http://172.210.21.120/kf-portal/shop-api";  // Replace with your actual URL

// Create a new instance of the GraphQLClient
const client = new GraphQLClient(endpoint);

// Export the client so it can be used in other parts of the app
export default client;
