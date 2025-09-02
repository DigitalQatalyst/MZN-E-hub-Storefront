"use client";

import { useState } from "react";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import { useRouter } from "next/navigation";

// GraphQL Mutations (unchanged)
const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
        channels {
          id
          code
          token
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const SUBMIT_ENQUIRY_MUTATION = `
  mutation SubmitEnquiry(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $additionalMessage: String!
    $serviceEnquiryType: String!
  ) {
    submitEnquiry(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      additionalMessage: $additionalMessage
      serviceEnquiryType: $serviceEnquiryType
    ) {
      success
      message
    }
  }
`;

const CREATE_CUSTOMER_MUTATION = `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      ... on Customer {
        id
        firstName
        lastName
        emailAddress
        phoneNumber
        customFields {
          additionalMessage
          serviceEnquiryType
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const UPDATE_CUSTOMER_MUTATION = `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      ... on Customer {
        id
        firstName
        lastName
        emailAddress
        phoneNumber
        customFields {
          additionalMessage
          serviceEnquiryType
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

const GET_CUSTOMER_BY_EMAIL = `
  query GetCustomerByEmail($emailAddress: String!) {
    customers(options: { filter: { emailAddress: { eq: $emailAddress } } }) {
      items {
        id
        firstName
        lastName
        emailAddress
        phoneNumber
      }
    }
  }
`;

// OPTIMIZED RESPONSIVE STYLED COMPONENTS
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 60px 80px;
  min-height: 100vh;
  
  @media (max-width: 1199px) {
    padding: 32px 24px;
    gap: 2.5rem;
    min-height: auto;
  }
  
  @media (max-width: 899px) {
    flex-direction: column;
    padding: 24px 16px;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 16px 12px;
    gap: 1.5rem;
  }
`;

const ContentColumn = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  max-width: 50%;
  
  @media (max-width: 1199px) {
    max-width: 42%;
    flex: 0 0 42%;
  }
  
  @media (max-width: 899px) {
    max-width: 100%;
    flex: 1;
    margin-bottom: 0;
    text-align: center;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    text-align: left;
    align-items: flex-start;
  }
`;

const StyledHeader = styled.p`
  color: var(--KF-BG-Black, #000);
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  
  @media (max-width: 1199px) {
    font-size: 15px;
    line-height: 26px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

const StyledBody = styled.h1`
  color: #000;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 52px;
  letter-spacing: 0px;
  margin: 0 0 16px 0;
  
  @media (max-width: 1199px) {
    font-size: 36px;
    line-height: 40px;
  }
  
  @media (max-width: 899px) {
    font-size: 32px;
    line-height: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 12px;
  }
`;

const Description = styled.p`
  color: var(--KF-BG-Black, #000);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 24px;
  
  @media (max-width: 1199px) {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 899px) {
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    margin-bottom: 20px;
  }
`;

const HelpLink = styled.a`
  color: #0030E3;
  text-decoration: underline;
  cursor: pointer;
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
  
  @media (max-width: 1199px) {
    margin-top: 24px;
    gap: 10px;
  }
  
  @media (max-width: 899px) {
    align-items: center;
    margin-top: 20px;
  }
  
  @media (max-width: 480px) {
    align-items: flex-start;
    margin-top: 16px;
  }
`;

const FeatureItem = styled.div`
  color: #0030E3;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 1199px) {
    font-size: 15px;
  }
  
  @media (max-width: 899px) {
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    text-align: left;
  }
`;

const FormColumn = styled.form`
  display: flex;
  width: 100%;
  max-width: 585px;
  min-height: 550px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  
  @media (max-width: 1199px) {
    max-width: 520px;
    width: 100%;
    min-height: auto;
    padding: 20px;
    gap: 18px;
    flex: 0 0 auto;
  }
  
  @media (max-width: 899px) {
    max-width: 100%;
    padding: 20px;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    padding: 16px;
    gap: 16px;
    border-radius: 6px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 0;
  width: 100%;
  
  @media (max-width: 1199px) {
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FormFieldWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  
  @media (max-width: 1199px) {
    gap: 5px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const FormLabel = styled.label`
  font-size: 14px;
  color: #000;
  font-weight: 500;
  
  @media (max-width: 1199px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const FormField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0030E3;
    box-shadow: 0 0 0 2px rgba(0, 48, 227, 0.1);
  }
  
  @media (max-width: 1199px) {
    padding: 10px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
  }
`;

const FormSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  @media (max-width: 1199px) {
    gap: 5px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
  background-color: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0030E3;
    box-shadow: 0 0 0 2px rgba(0, 48, 227, 0.1);
  }
  
  @media (max-width: 1199px) {
    padding: 10px;
    padding-right: 35px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    padding-right: 35px;
    font-size: 16px;
  }
`;

const FormTextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  @media (max-width: 1199px) {
    gap: 5px;
  }
  
  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #0030E3;
    box-shadow: 0 0 0 2px rgba(0, 48, 227, 0.1);
  }
  
  @media (max-width: 1199px) {
    padding: 10px;
    font-size: 14px;
    height: 100px;
    min-height: 80px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
    min-height: 80px;
    height: 100px;
  }
`;

const PrivacyText = styled.p`
  color: #666;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  margin: 0;
  
  @media (max-width: 1199px) {
    font-size: 12px;
    line-height: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

const PrivacyLink = styled.a`
  color: #5088FF;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-decoration-line: underline;
  cursor: pointer;
  
  @media (max-width: 1199px) {
    font-size: 12px;
    line-height: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0030E3")};
  color: #fff;
  padding: 14px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: auto;
  min-width: 140px;
  align-self: flex-start;
  transition: all 0.2s ease;
  
  &:not(:disabled):hover {
    background-color: #0026CC;
    transform: translateY(-1px);
  }
  
  &:not(:disabled):active {
    transform: translateY(0);
  }
  
  @media (max-width: 1199px) {
    padding: 12px 20px;
    font-size: 15px;
    min-width: 120px;
    width: auto;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    min-width: auto;
    align-self: stretch;
  }
`;

const AlertPopup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  text-align: center;
  
  @media (max-width: 480px) {
    top: 10px;
    width: 95%;
    max-width: none;
    margin: 0 10px;
    padding: 12px;
    border-radius: 6px;
  }
`;

const AlertHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

const AlertText = styled.div`
  color: #555;
  font-size: 14px;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const AlertClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #666;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    width: 20px;
    height: 20px;
    top: 6px;
    right: 6px;
  }
`;

export default function Section19() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    enquiryType: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<null | true | "error">(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      formData.firstName.match(/^[A-Za-z]+$/) &&
      formData.lastName.match(/^[A-Za-z]+$/) &&
      isValidEmail(formData.email) &&
      formData.phoneNumber.match(/^[0-9]{1,11}$/) &&
      [
        "Funding Request",
        "Mentorship",
        "Business Consultation",
        "Event Registration",
        "Legal or Compliance",
        "Product/Service Inquiry",
        "Technical Support",
        "General Inquiry",
        "Feedback/Suggestions",
        "Partnership/Collaboration",
      ].includes(formData.enquiryType) &&
      formData.message.trim() !== ""
    );
  };

  const handleHelpLinkClick = () => {
    router.push("/faq");
  };

  const handlePrivacyLinkClick = () => {
    router.push("/development");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setAlertHeader("Validation Error");
      setAlertMessage("❌ Please fill in all fields correctly.");
      setShowAlert("error");
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    setIsSubmitting(true);
    console.log("Form submitted with data:", formData);

    if (!formData.enquiryType) {
      setAlertMessage("❌ Please select a valid enquiry type.");
      setShowAlert("error");
      setTimeout(() => setShowAlert(null), 3000);
      setIsSubmitting(false);
      return;
    }

    try {
      const submitResponse = await fetch("https://9cfc0644da1b.ngrok-free.app/services-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: SUBMIT_ENQUIRY_MUTATION,
          variables: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            additionalMessage: formData.message,
            serviceEnquiryType: formData.enquiryType,
          },
        }),
      });

      const submitData = await submitResponse.json();
      console.log("SubmitEnquiry mutation response:", JSON.stringify(submitData, null, 2));

      if (submitData?.data?.submitEnquiry?.success) {
        setAlertHeader("Enquiry Submitted Successfully!");
        setAlertMessage(submitData.data.submitEnquiry.message || "Thank you! Your Enquiry has been submitted successfully. We'll get back to you soon.");
        setShowAlert(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          enquiryType: "",
          message: "",
        });
        setIsSubmitting(false);
        setTimeout(() => setShowAlert(null), 5000);
        return;
      }

      console.log("SubmitEnquiry mutation failed, falling back to original logic");

      const loginResponse = await fetch("https://9cfc0644da1b.ngrok-free.app/services-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables: {
            username: "superadmin",
            password: "superadmin",
          },
        }),
      });

      const loginData = await loginResponse.json();
      const authToken = loginResponse.headers.get("vendure-auth-token");

      if (!authToken || loginData?.data?.login?.__typename === "ErrorResult") {
        console.error("Login failed:", loginData);
        setAlertHeader("Authentication Error");
        setAlertMessage("❌ Failed to authenticate with Vendure Admin API.");
        setShowAlert("error");
        setTimeout(() => setShowAlert(null), 3000);
        setIsSubmitting(false);
        return;
      }

      console.log("Authenticated successfully with token:", authToken);

      const checkCustomerResponse = await fetch("https://9cfc0644da1b.ngrok-free.app/services-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          query: GET_CUSTOMER_BY_EMAIL,
          variables: {
            emailAddress: formData.email,
          },
        }),
      });

      const checkCustomerData = await checkCustomerResponse.json();
      console.log("Customer check response:", JSON.stringify(checkCustomerData, null, 2));

      let payload;
      let isUpdate = false;

      if (checkCustomerData?.data?.customers?.items?.length > 0) {
        const existingCustomer = checkCustomerData.data.customers.items[0];
        isUpdate = true;
        const timestamp = new Date().toISOString();
        const enquiryId = `${formData.enquiryType}-${timestamp}`;
        payload = {
          query: UPDATE_CUSTOMER_MUTATION,
          variables: {
            input: {
              id: existingCustomer.id,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phoneNumber: formData.phoneNumber,
              customFields: {
                additionalMessage: `[${enquiryId}] ${formData.message}`,
                serviceEnquiryType: formData.enquiryType,
              },
            },
          },
        };
        console.log("Updating existing customer:", payload);
      } else {
        payload = {
          query: CREATE_CUSTOMER_MUTATION,
          variables: {
            input: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              emailAddress: formData.email,
              phoneNumber: formData.phoneNumber,
              customFields: {
                additionalMessage: formData.message,
                serviceEnquiryType: formData.enquiryType,
              },
            },
          },
        };
        console.log("Creating new customer:", payload);
      }

      const response = await fetch("https://9cfc0644da1b.ngrok-free.app/services-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(`${isUpdate ? 'Update' : 'Create'}Customer mutation response:`, JSON.stringify(data, null, 2));

      const customerData = isUpdate ? data?.data?.updateCustomer : data?.data?.createCustomer;

      if (data.errors && Array.isArray(data.errors)) {
        setAlertHeader("Submission Error");
        setAlertMessage("❌ Submission failed: " + data.errors[0].message);
        setShowAlert("error");
        console.group("🛑 GraphQL Errors");
        data.errors.forEach((error: any, index: number) => {
          console.error(`Error ${index + 1}:`, error.message);
        });
        console.groupEnd();
      } else if (customerData?.id || customerData?.__typename === "Customer") {
        setAlertHeader("Enquiry Submitted Successfully!");
        setAlertMessage(`Thank you! Your Enquiry has been ${isUpdate ? 'updated' : 'submitted'} successfully. We'll get back to you soon.`);
        setShowAlert(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          enquiryType: "",
          message: "",
        });
      } else if (customerData?.__typename === "ErrorResult") {
        setAlertHeader("Submission Error");
        if (customerData.errorCode === "EMAIL_ADDRESS_CONFLICT_ERROR") {
          setAlertMessage("⚠️ An enquiry with this email already exists. Please use a different email or contact us directly.");
        } else {
          setAlertMessage(`⚠️ ${customerData.message}`);
        }
        setShowAlert("error");
      } else {
        console.error("Unexpected response structure:", JSON.stringify(data, null, 2));
        setAlertHeader("Submission Error");
        setAlertMessage("⚠️ Unexpected response from server. Please try again.");
        setShowAlert("error");
      }
    } catch (error) {
      console.error("Network/GraphQL error:", error);
      setAlertHeader("Network Error");
      setAlertMessage("🚫 Network error. Please try again later.");
      setShowAlert("error");
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => setShowAlert(null), 5000);
  };

  return (
    <CategorySectionCreator>
      {showAlert && (
        <AlertPopup>
          <AlertHeader>{alertHeader}</AlertHeader>
          <AlertText>{alertMessage}</AlertText>
          <AlertClose onClick={() => setShowAlert(null)}>×</AlertClose>
        </AlertPopup>
      )}
      <ContentWrapper>
        <ContentColumn>
          <StyledHeader>CONTACT OUR TEAM</StyledHeader>
          <StyledBody>Ready to Make an Enquiry?</StyledBody>
          <Description>
            Tell us what you're looking for and we'll get back to you shortly. For
            additional information you can also visit our <HelpLink onClick={handleHelpLinkClick}>Help Center</HelpLink>.
          </Description>
          <FeatureContainer>
            <FeatureItem><Icon>mark</Icon> 500+ Tailored Services</FeatureItem>
            <FeatureItem><Icon>mark</Icon> AI Support for Every Stage of Your Business</FeatureItem>
            <FeatureItem><Icon>mark</Icon> Simplified access, all in one place</FeatureItem>
            <FeatureItem><Icon>mark</Icon> Support that grows with your business</FeatureItem>
          </FeatureContainer>
        </ContentColumn>
        
        <FormColumn onSubmit={handleSubmit}>
          <FormRow>
            <FormFieldWrapper>
              <FormLabel>First Name</FormLabel>
              <FormField
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                pattern="[A-Za-z]+"
                title="First name should only contain letters"
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Last Name</FormLabel>
              <FormField
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
                pattern="[A-Za-z]+"
                title="Last name should only contain letters"
              />
            </FormFieldWrapper>
          </FormRow>
          
          <FormRow>
            <FormFieldWrapper>
              <FormLabel>Email</FormLabel>
              <FormField
                type="email"
                name="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                title="Please enter a valid email address"
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Phone number</FormLabel>
              <FormField
                type="tel"
                name="phoneNumber"
                placeholder="+971 xxx xxxx"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{1,11}"
                maxLength={20}
                title="Phone number should only contain numbers and be up to 11 characters"
              />
            </FormFieldWrapper>
          </FormRow>
          
          <FormRow>
            <FormSelectWrapper>
              <FormLabel>Select Enquiry Type</FormLabel>
              <FormSelect
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Funding Request">Funding Request</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Business Consultation">Business Consultation</option>
                <option value="Event Registration">Event Registration</option>
                <option value="Legal or Compliance">Legal or Compliance</option>
                <option value="Product/Service Inquiry">Product/Service Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Feedback/Suggestions">Feedback/Suggestions</option>
                <option value="Partnership/Collaboration">Partnership/Collaboration</option>
              </FormSelect>
            </FormSelectWrapper>
          </FormRow>
          
          <FormRow>
            <FormTextareaWrapper>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                placeholder="Describe your enquiry in detail"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormTextareaWrapper>
          </FormRow>
          
          <PrivacyText>
            * By submitting this form, you agree to our <PrivacyLink onClick={handlePrivacyLinkClick}>Privacy Policy</PrivacyLink>.
          </PrivacyText>
          
          <SubmitButton type="submit" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </SubmitButton>
        </FormColumn>
      </ContentWrapper>
    </CategorySectionCreator>
  );
}