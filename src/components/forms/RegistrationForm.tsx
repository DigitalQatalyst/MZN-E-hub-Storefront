"use client";

import { useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H3 } from "@component/Typography";
import Modal from "@component/Modal";
import TextField from "@component/text-field";

interface RegistrationFormProps {
  open: boolean;
  onClose: () => void;
  productSlug: string;
}

// Styled Components
const StyledBox = styled(Box)`
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  background-color: #f9fbfd;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 48, 227, 0.1);
`;

const StyledTextField = styled(TextField)`
  & input,
  & textarea {
    border-radius: 8px;
    border: 1px solid #d0d7e8;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    background-color: #ffffff;
    color: #1c2a3a;

    &:focus {
      border-color: #0070f3;
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
`;

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

export default function RegistrationForm({
  open,
  onClose,
  productSlug,
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const [firstName, ...lastNameParts] = formData.fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ") || "";
  
    const loginResponse = await fetch("https://9609a7336af8.ngrok-free.app/admin-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: LOGIN_MUTATION }),
    });
  
    const loginData = await loginResponse.json();
    const authToken = loginResponse.headers.get("vendure-auth-token");
  
    if (!authToken) {
      console.error("Login failed:", loginData);
      alert("❌ Failed to authenticate with Vendure Admin API.");
      return;
    }
  
    const payload = {
      query: CREATE_CUSTOMER_MUTATION,
      variables: {
        input: {
          firstName,
          lastName,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
          customFields: {
            companyName: formData.companyName,
            businessType: formData.businessType,
            additionalMessage: formData.message,
            selectedProductSlug: productSlug,
          },
        },
      },
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const response = await fetch("https://9609a7336af8.ngrok-free.app/admin-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include the token here
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (data.errors && Array.isArray(data.errors)) {
        alert("❌ Submission failed. See console for error details.");
        console.group("🛑 GraphQL Errors");
        data.errors.forEach((error: any, index: number) => {
          console.error(`Error ${index + 1}:`, error.message);
        });
        console.groupEnd();
      } else if (data?.data?.createCustomer?.id) {
        alert("🎉 Application submitted successfully!");
      } else if (data?.data?.createCustomer?.message) {
        alert(`⚠️ ${data.data.createCustomer.message}`);
      } else {
        alert("⚠️ Unknown response. Please try again.");
      }
    } catch (error) {
      console.error("Network/GraphQL error:", error);
      alert("🚫 Network error. Please try again later.");
    }
  
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      businessType: "",
      message: "",
    });
  
    onClose();
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <StyledBox>
        <H3 mb="1.5rem" color="#0030E3">
          Registration Application
        </H3>

        <form onSubmit={handleSubmit}>
          {[
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Enter your email",
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "text",
              placeholder: "Enter your phone number",
            },
            {
              name: "companyName",
              label: "Company Name",
              type: "text",
              placeholder: "Enter your company name",
            },
            {
              name: "businessType",
              label: "Business Type",
              type: "text",
              placeholder: "Enter your business type",
            },
          ].map(({ name, label, type, placeholder }) => (
            <Box mb="1rem" key={name}>
              <StyledTextField
                fullwidth
                name={name}
                type={type}
                label={label}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
              />
            </Box>
          ))}

          <Box mb="1.5rem">
            <StyledTextField
              fullwidth
              multiline
              rows={4}
              name="message"
              label="Additional Message"
              placeholder="Enter any additional information"
              value={formData.message}
              onChange={handleChange}
            />
          </Box>

          <FlexBox justifyContent="flex-end" gridGap="1rem">
            <StyledButton variant="outlined" type="button" onClick={onClose}>
              Cancel
            </StyledButton>
            <StyledButton variant="contained" color="primary" type="submit">
              Submit Application
            </StyledButton>
          </FlexBox>
        </form>
      </StyledBox>
    </Modal>
  );
}
