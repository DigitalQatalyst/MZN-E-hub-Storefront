"use client";

import { useState } from "react";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";

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

const AlertPopup = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  z-index: 1000;
`;

const AlertText = styled.div`
  color: #000;
  font-family: "Helvetica Neue";
  font-size: 14px;
`;

const AlertClose = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
`;

export default function Section18() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    enquiryType: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setShowAlert(true);
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      enquiryType: "",
      message: "",
    });
    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <CategorySectionCreator>
      {showAlert && (
        <AlertPopup>
          <AlertText>
            <strong>Inquiry Submitted Successfully!</strong>
            <br />
            Thank you! your inquiry has been submitted successfully. We’ll get back to you soon
          </AlertText>
          <AlertClose onClick={() => setShowAlert(false)}>×</AlertClose>
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