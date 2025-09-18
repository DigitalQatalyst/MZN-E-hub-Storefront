import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// export const getToken = async () => {
//   try {
//     const response = await axios.post(
//       "https://login.microsoftonline.com/199ebd0d-2986-4f3d-8659-4388c5b2a724/oauth2/v2.0/token",
//       {
//         client_id: "7a3b5855-4b59-4459-b15e-2414bd7a0817",
//         client_secret: "8Fh8Q~zBWtGVW8QYUE7B.X_ywKdtOy3kLamPTcEC",
//         scope: "https://kf-dev-a.crm15.dynamics.com/.default",
//         grant_type: "client_credentials",
//       }
//       // {
//       //   headers: {
//       //     "Content-Type": "application/x-www-form-urlencoded",
//       //   },
//       // }
//     );

//     console.log("response returned", response.data);
//   } catch (error) {
//     console.error(
//       "Error fetching token:",
//       error.response?.data || error.message
//     );
//   }
// };

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const response = await axios.post(
//       "https://login.microsoftonline.com/199ebd0d-2986-4f3d-8659-4388c5b2a724/oauth2/v2.0/token",
//       {
//         // client_id: process.env.AZURE_CLIENT_ID!,
//         // client_secret: process.env.AZURE_CLIENT_SECRET!,
//         // scope: "https://kf-dev-a.crm15.dynamics.com/.default",
//         // grant_type: "client_credentials",
//         client_id: "7a3b5855-4b59-4459-b15e-2414bd7a0817",
//         client_secret: "8Fh8Q~zBWtGVW8QYUE7B.X_ywKdtOy3kLamPTcEC",
//         scope: "https://kf-dev-a.crm15.dynamics.com/.default",
//         grant_type: "client_credentials",
//       }
//       // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );

//     res.status(200).json(response.data);
//   } catch (error: any) {
//     console.log("error", error);
//     // res
//     //   .status(error.response?.status || 500)
//     //   .json(error.response?.data || { message: error.message });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    //   const params = new URLSearchParams();
    const urlencoded = new URLSearchParams();
    // params.append("client_id", process.env.NEXT_CLIENT_ID);
    // params.append("client_secret", process.env.NEXT_CLIENT_SECRET);
    // params.append("scope", process.env.NEXT_CLIENT_SCOPE);
    // params.append("grant_type", "client_credentials");

    urlencoded.append("client_id", "7a3b5855-4b59-4459-b15e-2414bd7a0817");
    urlencoded.append(
      "client_secret",
      "8Fh8Q~zBWtGVW8QYUE7B.X_ywKdtOy3kLamPTcEC"
    );
    urlencoded.append("scope", "https://kf-dev-a.crm15.dynamics.com/.default");
    urlencoded.append("grant_type", "client_credentials");

    const response = await axios.post(
      "https://login.microsoftonline.com/199ebd0d-2986-4f3d-8659-4388c5b2a724/oauth2/v2.0/token",
      urlencoded,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
      console.log("resp",response.data)

    // Return only the token payload
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}


export async function GET(request: NextRequest) {
    // Get token from cookies
    const token = request.cookies.get("authToken")?.value;
  
    try {
      // Create plain object for headers
      const headers = {
        "Authorization": `${token}`,
        "Accept": "application/json",
        "Data-Version": "4.0",  // Modified from "0Data-Version"
        "Data-MaxVersion": "4.0"  // Modified from "0Data-MaxVersion"
      };
  
      // Make the GET request using axios with correct headers
      const response = await axios.get(
        "https://kf-dev-a.crm15.dynamics.com/api/data/v9.2/accounts?$filter=accountid eq '0d4cd8bd-8a0f-f011-998a-6045bd145efe'",
        { headers }
      );
  
      console.log("response", response.data);
  
      // Return the response data as JSON
      return NextResponse.json(response.data, { status: 200 });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching data:", error.response?.data || error.message);
        } else {
            console.error("Error fetching data:", error.message);
        }
  
      return NextResponse.json(
        { error: error || error },
        { status: error.response?.status || 500 }
      );
    }
  }
// const users = [
//   { id: 1, name: "test" },
//   { id: 2, name: "test2" },
// ];

// export async function GET() {
//   return Response.json(users);
// }


