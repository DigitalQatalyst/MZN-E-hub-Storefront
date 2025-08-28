import { GraphQLClient } from "graphql-request";
 
// Define your GraphQL endpoint URL here
const endpoint = "https://9cfc0644da1b.ngrok-free.app/services-api";  // Replace with your actual URL

// Create a new instance of the GraphQLClient
const client = new GraphQLClient(endpoint);
 
export default client;