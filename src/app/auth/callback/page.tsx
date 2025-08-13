'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {Suspense, useEffect} from 'react'
import {jwtDecode} from "jwt-decode";
import {AuthSession, storeSession} from "../session_utils";

function Content() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const loginUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/b2c_1_kf_signin/oauth2/v2.0/token"
    const client_id = "b94aa491-036c-4ddb-8bbf-12b510113078"
    const client_secret = "F3H8Q~h4BsPDaMke07PvafoWCMP2UCSYWMS8JbDr"
    const redirect_url = "http://localhost:3000/auth/callback"
    const scope = "openid profile offline_access https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/read"
    const signUpUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/b2c_1_kf_signup/oauth2/v2.0/token"
    const passwordResetUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/b2c_1_kf_passwordreset/oauth2/v2.0/token"

    const requestBody = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_url,
        code: code,
        scope: scope,
        grant_type: "authorization_code",
    }

    const urlSearchParams = new URLSearchParams(requestBody as Record<string, string>)

    useEffect(() => {
        if (!error) return;
        // Handle error
        if (error === "access_denied") {
            window.location.href = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_PaswordReset&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-git-landingpage-digitalqatalysts-projects.vercel.app%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=27E-2q808jFpdnjYOVywsLVHLiA9PI3dTM_BNQRZlnI";
            console.error("Access denied by user");
        } else if (error === "invalid_request") {
            console.error("Invalid request, possibly due to missing parameters");
        } else {
            console.error("An unknown error occurred:", error);
        }
    }, [error]);

    useEffect(() => {
        if (!code) return;

        // First try to exchange the code for tokens
        const exchangeCode = async (endpoint: string) => {
            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: urlSearchParams,
                });
                return await response.json();
            } catch (error) {
                console.error("Error exchanging code:", error);
                return { error: "network_error" };
            }
        };

        const handleAuthentication = async () => {
            // First try the sign-in endpoint
            let result = await exchangeCode(loginUrl);
            
            // If sign-in fails with invalid_grant, try sign-up
            if (result.error === "invalid_grant") {
                console.log("Sign-in failed, trying sign-up...");
                result = await exchangeCode(signUpUrl);
                
                // If sign-up also fails with invalid_grant, try password reset
                if (result.error === "invalid_grant") {
                    console.log("Sign-up failed, trying password reset...");
                    result = await exchangeCode(passwordResetUrl);
                }
            }

            // Handle successful authentication
            if (result.id_token) {
                console.log("Authentication successful:", result);
                const decoded: AuthSession = jwtDecode(result.id_token);
                storeSession(decoded);
                setTimeout(()=>{
                    router.push("/dashboard")
                }, 3000)
            } else {
                console.error("Authentication failed:", result);
            }
        };

        handleAuthentication();
    }, [code]);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">

            <div className="flex flex-col items-center space-y-4">
                <p className="text-xl">Authenticating</p>
            </div>

        </div>
    )
}

export default function Page() {
    return (
        <Suspense>
            <Content/>
        </Suspense>
    )
}