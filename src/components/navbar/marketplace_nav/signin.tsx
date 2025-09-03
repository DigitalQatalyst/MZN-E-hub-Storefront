"use client";

import FlexBox from "../../FlexBox";
import Icon from "../../icon/Icon";
import Typography from "../../Typography";
import { StyledNavbar } from "./styles";

interface SigninProps {
  onClick?: () => void;
}

export default function Signin({ onClick }: SigninProps) {
  const loginUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_SignIn&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&scope=openid&response_type=code&prompt=login";

  const handleClick = () => {
    if (onClick) onClick(); // Call onClick if provided (e.g., to close mobile menu)
    window.location.href = loginUrl;
  };

  return (
    <StyledNavbar>
      <FlexBox
        alignItems="center"
        style={{
          cursor: "pointer",
          color: "#FFF",
          fontWeight: 500,
          fontSize: "14px",
        //   fontFamily: "Inter",
          fontStyle: "normal",
        //   lineHeight: "22px",
        //   padding: "10px 20px",
        //   transition: "all 0.3s ease",
        //   minWidth: "140px",
        }}
        onClick={handleClick}
      >
        <Icon
          className="profile-icon"
          size="30px"
          color="#002180"
          marginRight= "5px"  /* Replaced gap with margin-right */
        >
          profile
        </Icon>
        <Typography
        //   fontFamily="Inter"
          fontSize="14px"
        //   fontStyle="normal"
        //   fontWeight="500"
        //   lineHeight="22px"
          color="#FFF"
        >
          Sign In
        </Typography>
      </FlexBox>
    </StyledNavbar>
  );
}