"use client";

import FlexBox from "../../FlexBox";
import Icon from "../../icon/Icon";
import Typography from "../../Typography";

const styles = `
  .sign-in {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    color: #333;
    text-align: left;
    cursor: pointer;
    font-weight: 500;
    font-style: normal;
    min-width: 140px;
  }

  .profile-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    .sign-in {
      font-size: 14px;
      color: #FFF;
    }
    
    .profile-icon {
      width: 30px;
      height: 30px;
    }
  }
`;

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
    <div>
      <style>{styles}</style>
      <FlexBox
        alignItems="center"
        className="sign-in"
        onClick={handleClick}
      >
        <img
          src="/assets/images/icons/profile.svg"
          alt="Profile"
          className="profile-icon"
        />
        <Typography
          fontSize="14px"
          color="#FFF"
        >
          Sign In or Register
        </Typography>
      </FlexBox>
    </div>
  );
}