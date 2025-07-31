import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    console.log("Server-side posts fetch attempt...");
    
    // Get session cookies from the request
    const sessionCookie = request.cookies.get('session')?.value;
    const sessionSigCookie = request.cookies.get('session.sig')?.value;
    
    let cookieHeader = '';
    if (sessionCookie && sessionSigCookie) {
      cookieHeader = `session=${sessionCookie}; session.sig=${sessionSigCookie}`;
      console.log("Using session cookies for posts request:", cookieHeader);
    }
    
    const headers: Record<string, string> = {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Origin': 'https://22af-54-37-203-255.ngrok-free.app'
    };
    
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }
    
    const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/services-api", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: GET_POSTS_QUERY
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Server-side posts response:", JSON.stringify(data, null, 2));
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server-side posts fetch error:", error);
    return NextResponse.json(
      { error: `Posts fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}