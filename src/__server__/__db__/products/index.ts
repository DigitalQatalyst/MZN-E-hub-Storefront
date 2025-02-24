
// import axios from 'axios';

// // URL of the Express server
// const url = 'http://localhost:3000';

// // Function to send GET request
// async function sendRequest() {
//   try {
//     const response = await axios.get(url);
//     console.log('Response:', response.data);  // Log the response from the server
//   } catch (error) {
//     console.error('Error making request:', error);
//   }
// }

// // Call the function to send the request
// sendRequest();



// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// // Initialize the Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:3009/shop-api',
//   cache: new InMemoryCache(),
// });

// // Define the GraphQL queries
// const GET_PRODUCTS = gql`
//   query GetProducts($options: ProductListOptions) {
//     products(options: $options) {
//       items {
//         id
//         name
//         slug
//         description
//         variants {
//           id
//           priceWithTax
//         }
//       }
//       totalItems
//     }
//   }
// `;

// const GET_PRODUCT_BY_SLUG = gql`
//   query GetProductBySlug($slug: String!) {
//     product(slug: $slug) {
//       id
//       name
//       description
//       variants {
//         id
//         priceWithTax
//       }
//     }
//   }
// `;

// const GET_PRODUCT_SLUGS = gql`
//   query GetProductSlugs {
//     products {
//       items {
//         slug
//       }
//     }
//   }
// `;

// // Replace the mocked endpoints with Apollo queries
// export const productApiEndpoints = () => {
//   return {
//     getProducts: async (page: number = 1, pageSize: number = 28) => {
//       try {
//         const options = { take: pageSize, skip: (page - 1) * pageSize };

//         // Use Apollo Client's query method
//         const { data } = await client.query({
//           query: GET_PRODUCTS,
//           variables: { options },
//         });

//         return {
//           meta: {
//             page,
//             pageSize,
//             total: data.products.totalItems,
//             totalPage: Math.ceil(data.products.totalItems / pageSize),
//           },
//           result: data.products.items,
//         };
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         throw new Error("Internal server error");
//       }
//     },

//     getProductBySlug: async (slug: string) => {
//       try {
//         const { data } = await client.query({
//           query: GET_PRODUCT_BY_SLUG,
//           variables: { slug },
//         });
//         return data.product;
//       } catch (error) {
//         console.error("Error fetching product by slug:", error);
//         throw new Error("Internal server error");
//       }
//     },

//     getProductSlugs: async () => {
//       try {
//         const { data } = await client.query({
//           query: GET_PRODUCT_SLUGS,
//         });
//         return data.products.items.map((item) => ({
//           params: { slug: item.slug },
//         }));
//       } catch (error) {
//         console.error("Error fetching product slugs:", error);
//         throw new Error("Internal server error");
//       }
//     },
//   };
// };






























import { GraphQLClient, gql } from "graphql-request";
import Product from "@models/product.model";

// Initialize the Vendure GraphQL client
const client = new GraphQLClient("http://localhost:3009/shop-api", {
  headers: {
     "Content-Type" : "application/json"
  },
});

// Define the structure of the query response
interface ProductVariant {
  id: string;
  priceWithTax: number;
}

// interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   variants: ProductVariant[];
// }

interface ProductListData {
  products: {
    items: Product[];
    totalItems: number;
  };
}

// For the "GetProductBySlug" query response
interface ProductVariant {
  id: string;
  priceWithTax: number;
}

interface GetProductBySlugResponse {
  product: Product;
}

// For the "GetProductSlugs" query response
interface ProductSlug {
  slug: string;
}

interface Products {
  items: ProductSlug[];
}

interface GetProductSlugsResponse {
  products: Products;
}







// Define the GraphQL queries
const GET_PRODUCTS = gql`
  query GetProducts($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        slug
        description
        variants {
          id
          priceWithTax
        }
      }
      totalItems
    }
  }
`;

const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      variants {
        id
        priceWithTax
      }
    }
  }
`;

const GET_PRODUCT_SLUGS = gql`
  query GetProductSlugs {
    products {
      items {
        slug
      }
    }
  }
`;

// Replace your mocked endpoints
export const productApiEndpoints = () => {
  const slug = 'football';
  return {
    getProducts: async (page: number = 1, pageSize: number = 28) => {
      try {
        const options = { take: pageSize, skip: (page - 1) * pageSize };
        // const response = await client.request(GET_PRODUCTS, { options });
        // Use this type when making the GraphQL request
      const response = await client.request<ProductListData>(GET_PRODUCTS, { options });
      console.log(response.products.items);
        return {
          meta: {
            page,
            pageSize,
            total: response.products.totalItems,
            totalPage: Math.ceil(response.products.totalItems / pageSize),
          },
          result: response.products.items,
        };
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Internal server error");
      }
    },

    getProductBySlug: async (slug: string) => {
      try {
        const response: GetProductBySlugResponse = await client.request(
          GET_PRODUCT_BY_SLUG,
          { slug }
        );
        return response.product;
      } catch (error) {
        console.error("Error fetching product by slug:", error);
        throw new Error("Internal server error");
      }
    },

    getProductSlugs: async () => {
      try {
        const response: GetProductSlugsResponse = await client.request(
          GET_PRODUCT_SLUGS
        );
        return response.products.items.map((item) => ({ params: { slug: item.slug } }));
      } catch (error) {
        console.error("Error fetching product slugs:", error);
        throw new Error("Internal server error");
      }
    },
  };
};






















// // // FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// // // YOU NEED TO BUILD YOUR OWN SERVER
// // // IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// // // CONTACT US AT support@ui-lib.com
// // import type MockAdapter from "axios-mock-adapter";
// // import { shuffle } from "lodash";
// // import { uniqueProudcts, slugs } from "./data";

// // export const productApiEndpoints = (Mock: MockAdapter) => {
// //   Mock.onGet("/api/products").reply(async (config) => {
// //     try {
// //       const page = config.params?.page || 1;
// //       const pageSize = config.params?.pageSize || 28;
// //       const reversedOrder = uniqueProudcts.reverse();
// //       const products = reversedOrder.slice((page - 1) * pageSize, page * pageSize);

// //       const meta = {
// //         page,
// //         pageSize,
// //         total: reversedOrder.length,
// //         totalPage: Math.ceil(reversedOrder.length / pageSize)
// //       };

// //       return [200, { meta, result: products }];
// //     } catch (err) {
// //       console.error(err);
// //       return [500, { message: "Internal server error" }];
// //     }
// //   });

// //   // single product based on slug
// //   Mock.onGet("/api/products/slug").reply(async (config) => {
// //     try {
// //       if (config?.params?.slug) {
// //         const product = uniqueProudcts.find((item) => item.slug === config.params.slug);
// //         return [200, product];
// //       }

// //       return [200, shuffle(uniqueProudcts)[0]];
// //     } catch (err) {
// //       console.error(err);
// //       return [500, { message: "Internal server error" }];
// //     }
// //   });

// //   //all products slug list
// //   Mock.onGet("/api/products/slug-list").reply(async () => {
// //     try {
// //       return [200, slugs];
// //     } catch (err) {
// //       console.error(err);
// //       return [500, { message: "Internal server error" }];
// //     }
// //   });
// // };
