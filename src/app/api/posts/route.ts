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
      comments {
        id
        text
        createdAt
      }
    }
  }
`;

const GET_RECENT_POSTS_QUERY = `
  query RecentPosts($limit: Int!) {
    recentPosts(limit: $limit) {
      id
      title
      content
      tag
      views
      createdAt
      updatedAt
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    console.log("Server-side posts fetch attempt...");
    
    // Parse request body to get query type and parameters
    const body = await request.json();
    const { queryType = 'all', limit = 5 } = body;
    
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
    
    // Determine which query to use based on queryType
    let queryToUse = GET_POSTS_QUERY;
    let variables = {};
    
    if (queryType === 'recent') {
      queryToUse = GET_RECENT_POSTS_QUERY;
      variables = { limit };
      console.log(`Fetching recent posts with limit: ${limit}`);
    } else {
      console.log("Fetching all posts");
    }
    
    const requestBody: any = { query: queryToUse };
    if (Object.keys(variables).length > 0) {
      requestBody.variables = variables;
    }
    
    const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/services-api", {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
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