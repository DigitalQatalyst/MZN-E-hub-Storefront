"use client";

import { useState } from "react";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";

// GraphQL Mutations
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
  cursor: pointer;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0030E3")};
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 35%;
`;

const AlertPopup = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 1000;
  text-align: center;
`;

const AlertHeader = styled.div`
  font-family: "Helvetica Neue";
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-bottom: 12px;
`;

const AlertText = styled.div`
  color: #555;
  font-family: "Helvetica Neue";
  font-size: 14px;
  line-height: 1.5;
`;

const AlertClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form to enable/disable submit button
  const isFormValid = () => {
    return (
      formData.firstName.match(/^[A-Za-z]+$/) &&
      formData.lastName.match(/^[A-Za-z]+$/) &&
      formData.email.match(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/) &&
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Client-side validation for enquiryType
    if (!formData.enquiryType) {
      setAlertMessage("❌ Please select a valid enquiry type.");
      setShowAlert("error");
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    // Step 1: Authenticate with the Admin API
    const loginResponse = await fetch("https://22af-54-37-203-255.ngrok-free.app/admin-api", {
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

    if (!authToken || loginData?.login?.__typename === "ErrorResult") {
      console.error("Login failed:", loginData);
      setAlertMessage("❌ Failed to authenticate with Vendure Admin API.");
      setShowAlert("error");
      setTimeout(() => setShowAlert(null), 3000);
      return;
    }

    console.log("Authenticated successfully with token:", authToken);

    // Step 2: Prepare and send the createCustomer mutation
    const payload = {
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

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch("https://22af-54-37-203-255.ngrok-free.app/admin-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("CreateCustomer mutation response:", JSON.stringify(data, null, 2));

      if (data.errors && Array.isArray(data.errors)) {
        setAlertMessage("❌ Submission failed: " + data.errors[0].message);
        setShowAlert("error");
        console.group("🛑 GraphQL Errors");
        data.errors.forEach((error: any, index: number) => {
          console.error(`Error ${index + 1}:`, error.message);
        });
        console.groupEnd();
      } else if (data?.data?.createCustomer?.id || data?.data?.createCustomer?.__typename === "Customer") {
        setAlertHeader("Inquiry Submitted Successfully!");
        setAlertMessage("Thank you! your inquiry has been submitted successfully. We'll get back to you soon.");
        setShowAlert(true);
        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          enquiryType: "",
          message: "",
        });
      } else if (data?.data?.createCustomer?.__typename === "ErrorResult") {
        setAlertMessage(`⚠️ ${data.data.createCustomer.message}`);
        setShowAlert("error");
      } else {
        console.error("Unexpected response structure:", JSON.stringify(data, null, 2));
        setAlertMessage("⚠️ Unexpected response from server. Please try again.");
        setShowAlert("error");
      }
    } catch (error) {
      console.error("Network/GraphQL error:", error);
      setAlertMessage("🚫 Network error. Please try again later.");
      setShowAlert("error");
    }

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(null), 3000);
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
            Tell us what you’re looking for and we’ll get back to you shortly. For<br></br> additional information you can also visit our{" "}
            <HelpLink>Help Center</HelpLink>.
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
            * By submitting this form, you agree to our{" "}
            <PrivacyLink>Privacy Policy</PrivacyLink>.
          </PrivacyText>
          <SubmitButton type="submit" disabled={!isFormValid()}>
            Submit Enquiry
          </SubmitButton>
        </FormColumn>
      </ContentWrapper>
    </CategorySectionCreator>
  );
}