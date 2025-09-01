"use client";

import { Button } from "../../buttons";
import { StyledNavbar } from "./styles";

export default function Signup() {
  const registerUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=openid&response_type=code&prompt=login";

  return (
    <StyledNavbar>
      <Button
        className="sign-up-btn"
        variant="contained"
        onClick={() => {
          window.location.href = registerUrl;
        }}
      >
        Sign Up
      </Button>
    </StyledNavbar>
  );
}