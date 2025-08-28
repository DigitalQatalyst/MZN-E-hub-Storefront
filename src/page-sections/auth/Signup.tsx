"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMsal } from "@azure/msal-react";

import useVisibility from "./useVisibility";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import Divide from "./components/Divide";
import SocialLinks from "./components/SocialLinks";
import { StyledRoot } from "./styles";

import { authScopes, signupAuthority } from "../../authConfig";

export default function Signup() {
  const { instance } = useMsal();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false,
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("${path} is required"),
    email: yup.string().email("invalid email").required("${path} is required"),
    password: yup.string().required("${path} is required"),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type password"),
    agreement: yup.bool().oneOf([true], "You have to agree with our Terms and Conditions!"),
  });

  const handleFormSubmit = async () => {
    // Launch the dedicated SIGNUP policy
    await instance.loginRedirect({
      authority: signupAuthority,       // 👈 your B2C_1_KF_Signup policy
      scopes: authScopes.scopes,        // ["openid","offline_access", your API scopes]
      extraQueryParameters: { prompt: "login" },
      // redirectUri comes from msalConfig.auth.redirectUri (/callback)
    });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">Create Your Account</H3>
        <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
          Please fill all forms to continue
        </H5>

        {/* purely UX fields before redirecting to B2C */}
        <TextField fullwidth name="name" mb="0.75rem" label="Full Name"
          onBlur={handleBlur} value={values.name} onChange={handleChange}
          placeholder="Ralph Adwards" errorText={touched.name && errors.name} />

        <TextField fullwidth mb="0.75rem" name="email" type="email"
          onBlur={handleBlur} value={values.email} onChange={handleChange}
          placeholder="example@mail.com" label="Email"
          errorText={touched.email && errors.email} />

        <TextField fullwidth mb="0.75rem" name="password" label="Password"
          placeholder="*********" onBlur={handleBlur} value={values.password}
          onChange={handleChange} errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton p="0.25rem" mr="0.25rem" type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}>
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <TextField mb="1rem" fullwidth name="re_password" placeholder="*********"
          label="Confirm Password" onBlur={handleBlur} onChange={handleChange}
          value={values.re_password} type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password}
          endAdornment={
            <IconButton p="0.25rem" size="small" mr="0.25rem" type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}>
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <CheckBox mb="1.75rem" name="agreement" color="secondary"
          onChange={handleChange} checked={values.agreement}
          label={
            <FlexBox>
              <SemiSpan>By signing up, you agree to</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Terms &amp; Conditions
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth>
          Create Account
        </Button>

        <Divide />
        <SocialLinks />
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have account?</SemiSpan>
        <Link href="/login">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Log in
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
