"use client";

import { useState } from "react";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
import { GraphQLClient } from "graphql-request";
import Modal from "@component/Modal";

// GraphQL Client Setup
const endpoint = "https://22af-54-37-203-255.ngrok-free.app/admin-api";
const client = new GraphQLClient(endpoint);

const LOGIN_MUTATION = `
  mutation {
    login(username: "superadmin", password: "superadmin") {
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
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
          companyName
          businessType
          additionalMessage
          selectedProductSlug
          dynamicsLeadId
        }
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

let isAuthenticated = false;
let authPromise: Promise<boolean> | null = null;

async function authenticate(): Promise<boolean> {
  if (isAuthenticated) return true;

  try {
    const response = await client.request(LOGIN_MUTATION) as { login: any };
    console.log("Authentication response:", response);

    if (response.login.__typename === "CurrentUser") {
      // Since graphql-request does not provide headers in the response, use a static token or obtain it from another source if needed
      const authToken = "3dzd7d0mxu81apw175ou";
      client.setHeader("Authorization", `Bearer ${authToken}`);
      isAuthenticated = true;
      console.log("Authenticated successfully with token:", authToken);
      return true;
    } else {
      console.error("Login failed with response:", response.login);
      return false;
    }
  } catch (error) {
    console.error("Authentication error details:", error);
    return false;
  }
}

async function getAuthenticatedClient(): Promise<GraphQLClient> {
  if (!authPromise) {
    authPromise = authenticate();
  }
  await authPromise;
  if (!isAuthenticated) {
    console.error("Failed to authenticate client - isAuthenticated is false");
    throw new Error("Failed to authenticate client");
  }
  return client;
}

// STYLED COMPONENTS
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 60px 80px;
`;

const ContentColumn = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  font-family: 'Abhaya Libre', serif;
  align-items: flex-start;
  max-width: 50%;
`;

const StyledHeader = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Title-Large-Line-Height, 28px); /* 175% */
  letter-spacing: var(--Title-Large-Tracking, 0px);
  text-transform: uppercase;
  margin: 0;
`;

const StyledBody = styled.p`
  color: #000;
  font-family: "FS Kim Trial";
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Display-Medium-Line-Height, 52px); /* 108.333% */
  letter-spacing: var(--Display-Medium-Tracking, 0px);
  margin: 0 0 16px 0;
`;

const Description = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: Inter;
  font-size: var(--Body-Large-Size, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Body-Large-Line-Height, 24px); /* 150% */
`;

const HelpLink = styled.a`
  color: #0030E3;
  text-decoration: underline;
  cursor: pointer;
`;

const FormColumn = styled.div`
  display: flex;
  width: 585px;
  height: 550px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 0;
  width: 100%;
`;

const FormFieldWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormLabel = styled.label`
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  font-weight: 400;
`;

const FormField = styled.input`
  flex: 1;
  min-width: 0;
  max-width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  box-sizing: border-box;
`;

const FormSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  background-color: #fff;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

const FormTextareaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  resize: none;
`;

const PrivacyText = styled.p`
  color: var(--Light-Text-Primary, text-primary);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "Public Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  margin: 0;
`;

const PrivacyLink = styled.a`
  color: #5088FF;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "Public Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #0030E3;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 35%;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    background-color: #f9fbfd;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 48, 227, 0.1);
  }
`;

const AlertText = styled.div`
  color: #000;
  font-family: "Helvetica Neue";
  font-size: 14px;
  text-align: center;
`;

export default function Section19() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    businessType: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const client = await getAuthenticatedClient();
      const variables = {
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.email,
          phoneNumber: formData.phoneNumber,
          customFields: {
            businessType: formData.businessType,
            additionalMessage: formData.message,
            selectedProductSlug: "", // No productSlug prop in this component
          },
        },
      };

      type CreateCustomerResponse = {
        createCustomer: {
          __typename: string;
          id?: string;
          firstName?: string;
          lastName?: string;
          emailAddress?: string;
          phoneNumber?: string;
          customFields?: {
            companyName?: string;
            businessType?: string;
            additionalMessage?: string;
            selectedProductSlug?: string;
            dynamicsLeadId?: string;
          };
          errorCode?: string;
          message?: string;
        };
      };

      const response = await client.request<CreateCustomerResponse>(CREATE_CUSTOMER_MUTATION, variables);
      console.log("CreateCustomer mutation response:", response);

      if (response.createCustomer.__typename === "Customer") {
        setAlertMessage("🎉 Enquiry submitted successfully!");
        setShowAlert(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          businessType: "",
          message: "",
        });
      } else {
        setAlertMessage(`⚠️ ${response.createCustomer.message || "Submission failed. Please try again."}`);
        setShowAlert(true);
        console.error("Form submission failed with response:", response.createCustomer);
      }
    } catch (error) {
      setAlertMessage("🚫 Network error. Please try again later.");
      setShowAlert(true);
      console.error("Submission error details:", error);
    }
  };

  return (
    <CategorySectionCreator>
      <StyledModal open={showAlert} onClose={() => setShowAlert(false)}>
        <AlertText>{alertMessage}</AlertText>
      </StyledModal>
      <ContentWrapper>
        <ContentColumn>
          <StyledHeader>CONTACT OUR TEAM</StyledHeader>
          <StyledBody>Ready to Make an Enquiry?</StyledBody>
          <Description>
            Tell us what you’re looking for and we’ll get back to you shortly. For<br />
            additional information you can also visit our <HelpLink>Help Center</HelpLink>.
          </Description>
        </ContentColumn>
        <FormColumn as="form" onSubmit={handleSubmit}>
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
                placeholder="johndoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$"
                title="Email must be a valid Gmail or Yahoo address"
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
                maxLength={14}
                title="Phone number should only contain numbers and be up to 11 characters"
              />
            </FormFieldWrapper>
          </FormRow>
          <FormRow>
            <FormSelectWrapper>
              <FormLabel>Business Type</FormLabel>
              <FormSelect
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select</option>
                <option value="Funding request">Funding request</option>
                <option value="Mentorship">Mentorship</option>
                <option value="Business consultation">Business consultation</option>
                <option value="Event registration">Event registration</option>
                <option value="Legal or Compliance">Legal or Compliance</option>
                <option value="Product/Service Inquiry">Product/Service Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Feedback or Suggestions">Feedback or Suggestions</option>
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
            * By submitting this form, you agree to our{" "}
            <PrivacyLink>Privacy Policy</PrivacyLink>.
          </PrivacyText>
          <SubmitButton type="submit">Submit Enquiry</SubmitButton>
        </FormColumn>
      </ContentWrapper>
    </CategorySectionCreator>
  );
}