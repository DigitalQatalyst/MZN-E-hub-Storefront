import { GraphQLClient } from "graphql-request";

// Define your GraphQL endpoint URL here
const endpoint = "https://22af-54-37-203-255.ngrok-free.app/services-api";  // Replace with your actual URL

// Create a new instance of the GraphQLClient
const client = new GraphQLClient(endpoint);

export default client;

