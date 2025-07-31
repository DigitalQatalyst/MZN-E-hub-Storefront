import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    console.log("Server-side authentication attempt...");
    
    const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/admin-api", {
      method: "POST",
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Origin': 'https://22af-54-37-203-255.ngrok-free.app'
      },
      body: JSON.stringify({
        query: LOGIN_MUTATION
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Server-side authentication response:", JSON.stringify(data, null, 2));
    
    // Extract cookies from the response
    const cookies = response.headers.get('set-cookie');
    
    // Create response with data
    const nextResponse = NextResponse.json(data);
    
    // Forward cookies to the client if they exist
    if (cookies) {
      // Parse and set individual cookies
      const cookieArray = cookies.split(',').map(cookie => cookie.trim());
      cookieArray.forEach(cookie => {
        if (cookie.startsWith('session=') || cookie.startsWith('session.sig=')) {
          const [name, ...valueParts] = cookie.split('=');
          const value = valueParts.join('=').split(';')[0];
          nextResponse.cookies.set(name, value, {
            httpOnly: false, // Allow client-side access
            secure: false, // Allow over HTTP for localhost
            sameSite: 'lax'
          });
        }
      });
    }
    
    return nextResponse;
  } catch (error) {
    console.error("Server-side authentication error:", error);
    return NextResponse.json(
      { error: `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}