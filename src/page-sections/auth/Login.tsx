"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

import useVisibility from "./useVisibility";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import { StyledRoot } from "./styles";
import Divide from "./components/Divide";
import SocialLinks from "./components/SocialLinks";

// ✅ Adjust these to your tenant/policies as needed
const SIGNIN_AUTHORITY =
  "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_KF_SignIn";
const SIGNUP_AUTHORITY =
  "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_KF_Signup";

// ✅ Your app/API scopes
const SCOPES = [
  "openid",
  "offline_access",
  "https://dgqatalyst.onmicrosoft.com/b94aa491-036c-4ddb-8bbf-12b510113078/Files.Read",
];

export default function Login() {
  const router = useRouter();
  const { instance } = useMsal();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = { email: "", password: "" };
  const formSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("${path} is required"),
    password: yup.string().required("${path} is required"),
  });

  // 🔐 Sign-in via B2C (redirect). MSAL will use msalConfig.auth.redirectUri.
  const doSignIn = async () => {
    setSubmitting(true);
    try {
      await instance.loginRedirect({
        authority: SIGNIN_AUTHORITY,
        scopes: SCOPES,
        extraQueryParameters: { prompt: "login" },
        // Do NOT set redirectUri here; use the one in msalConfig
      });
      // control never reaches here because we redirect
    } catch (e) {
      console.error("loginRedirect error", e);
      setSubmitting(false);
    }
  };

  // 🆕 Sign-up via the SignUp policy
  const doSignUp = async () => {
    setSubmitting(true);
    try {
      await instance.loginRedirect({
        authority: SIGNUP_AUTHORITY,
        scopes: ["openid", "offline_access"],
      });
    } catch (e) {
      console.error("signup redirect error", e);
      setSubmitting(false);
    }
  };

  // 📝 Submit handler: trigger MSAL sign-in instead of local auth
  const handleFormSubmit = async () => {
    await doSignIn();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Ecommerce
        </H3>

        <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
          Log in with your account
        </H5>

        {/* Inputs kept for UX; the submit triggers B2C sign-in */}
        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="example@mail.com"
          label="Email"
          errorText={touched.email && errors.email}
        />

        <TextField
          mb="1rem"
          fullwidth
          name="password"
          label="Password"
          autoComplete="on"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="*********"
          value={values.password}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
          disabled={submitting}
        >
          {submitting ? "Redirecting…" : "Login"}
        </Button>

        <Divide />

        <SocialLinks />

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have an account?</SemiSpan>
          {/* Use B2C signup policy instead of a static /signup page */}
          <Button
            ml="0.5rem"
            variant="text"
            onClick={doSignUp}
            disabled={submitting}
            type="button"
          >
            <H6 borderBottom="1px solid" borderColor="gray.900">Sign Up</H6>
          </Button>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        {/* You can point this to a password reset policy if you have one */}
        <Link href="/">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Reset It
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
