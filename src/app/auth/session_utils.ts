const SESSION_KEY = "session";

//if the current stored session is not a valid json object, the user is not signed in
export function getSession(): AuthSession | null {
    const session = localStorage.getItem(SESSION_KEY);

    if (session) {
        return JSON.parse(session);
    }
    return null;
}


export function storeSession(session: AuthSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}


export function destroySession() {
    localStorage.clear()
}


export interface AuthSession {
    exp: number;
    nbf: number;
    ver: string;
    iss: string;
    sub: string;
    aud: string;
    nonce: string;
    iat: number;
    auth_time: number;
    idp: string;
    name: string;
    given_name: string;
    family_name: string;
    emails: string[];
    tfp: string;
}