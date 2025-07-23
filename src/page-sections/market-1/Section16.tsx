"use client";

import { useState } from "react";
import styled from "styled-components";
import { H3 } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import Image from "next/image";
import Icon from "@component/icon/Icon";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 90px 120px 50px 120px;
  display: flex;
  flex-direction: column;
  font-family: 'Abhaya Libre', serif;
  gap: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 1199px) {
    padding: 32px 32px 32px 32px;
  }
  @media (max-width: 899px) {
    padding: 16px 8px 16px 8px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeaturedEvents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FeaturedEventsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const EventsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  flex-wrap: nowrap;
  @media (max-width: 899px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
  @media (max-width: 599px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const EventCard = styled.div`
  background-color: #0030E3;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;
  @media (max-width: 899px) {
    flex: 1 1 100%;
    border-radius: 8px;
  }
  @media (max-width: 599px) {
    border-radius: 6px;
  }
`;

const EventImage = styled.div`
  height: 220px;
  flex-shrink: 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

const EventDetails = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EventTitle = styled.h4`
  font-size: 20px;
  font-weight: 400;
  color: #FFF;
  margin: 0;
  @media (max-width: 899px) {
    font-size: 16px;
  }
`;

const EventMeta = styled.div`
  font-size: 14px;
  font-family: "FS Kim Trial";
  color: #FFF;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const RegisterButton = styled(DefaultButton)`
  display: flex;
  padding: 8px 26px 8px 27px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--KF-BG-White, #FFF);
  color: #0030E3;
  border: none;
  font-size: 14px;
  font-weight: 400;
  width: fit-content;

  &:hover {
    background-color: #E0E0E0;
    color: #002180;
  }
`;

const ExploreAllButton = styled(DefaultButton)`
  background-color: transparent;
  color: #FFF;
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  &:hover {
    color: #A9C9FF;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PopupTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const PopupSubtitle = styled.p`
  font-size: 14px;
  color: #000;
  margin: 0 0 24px 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px; /* Increased size */
  cursor: pointer;
  color: #666;
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  font-weight: 400;
`;

const FormField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #000;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #0030E3;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
`;

const SuccessPopup = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SuccessHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0;
`;

const SuccessIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #e6f7e9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
`;

const Checkmark = styled.span`
  font-size: 24px;
  color: #28a745;
`;

const SuccessMessage = styled.div`
  font-family: "Helvetica Neue";
  font-size: 16px;
  color: #000;
`;

const SuccessSubMessage = styled.div`
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #666;
  margin-top: 8px;
`;

// TYPES
interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
  location: string;
}

const Section16: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      image: "/assets/images/Groceries Shop/Image.png",
      title: "Entrepreneurship with Creativity: Turn ...",
      date: "24 Apr 2025, 04:30 PM - 06:30 PM",
      location: "Abu Dhabi SME Hub, Khalifa Fund HQ, Abu Dhabi",
    },
    {
      id: 2,
      image: "/assets/images/Groceries Shop/Image1.png",
      title: "Creating Value in Entrepreneurship",
      date: "28-29 Jun 2025, 04:30 PM - 06:30 PM",
      location: "Hub71, Al Khatem Tower, Abu Dhabi Global Market",
    },
    {
      id: 3,
      image: "/assets/images/Groceries Shop/Image2.png",
      title: "Feasibility Study of the Business Model",
      date: "30 Apr 2025, 04:30 PM - 07:30 PM",
      location: "Khalifa Innovation Center, Abu Dhabi University",
    },
  ];

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setFormData({ fullName: "", email: "", phoneNumber: "" });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedEvent(null);
    setShowSuccess(true);
    setFormData({ fullName: "", email: "", phoneNumber: "" });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      {selectedEvent && (
        <PopupOverlay>
          <PopupContent as="form" onSubmit={handleSubmit}>
            <PopupHeader>
              <PopupTitle>Event Registration</PopupTitle>
              <CloseButton onClick={handleClosePopup}>×</CloseButton>
            </PopupHeader>
            <PopupSubtitle>Register for: {selectedEvent.title}</PopupSubtitle>
            <FormFieldWrapper>
              <FormLabel>Full Name *</FormLabel>
              <FormField
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                pattern="[A-Za-z\s]+"
                title="Full name should only contain letters and spaces"
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Email Address *</FormLabel>
              <FormField
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$"
                title="Email must be a valid Gmail or Yahoo address"
              />
            </FormFieldWrapper>
            <FormFieldWrapper>
              <FormLabel>Phone Number *</FormLabel>
              <FormField
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="[0-9]{1,11}"
                maxLength={11}
                title="Phone number should only contain numbers and be up to 11 characters"
              />
            </FormFieldWrapper>
            <SubmitButton type="submit">Submit Registration</SubmitButton>
          </PopupContent>
        </PopupOverlay>
      )}
      {showSuccess && (
        <PopupOverlay>
          <SuccessPopup>
            <SuccessHeader>
              <SuccessTitle>Event Registration</SuccessTitle>
              <CloseButton onClick={handleCloseSuccess}>×</CloseButton>
            </SuccessHeader>
            <SuccessIcon>
              <Checkmark>✔</Checkmark>
            </SuccessIcon>
            <SuccessMessage>Registration Successful!</SuccessMessage>
            <SuccessSubMessage>
              Thank you for registering! You will receive a confirmation email shortly
            </SuccessSubMessage>
          </SuccessPopup>
        </PopupOverlay>
      )}
      <WelcomeSection>
        <ContentColumn>
          <p style={{ fontSize: "16px", fontWeight: "400", fontFamily: "Helvetica Neue" }}>JOIN OUR UPCOMING EVENTS</p>
          <H3 fontSize="48px" fontWeight="400" fontFamily="FS Kim Trial" mb="1rem">
            Workshops, bootcamps, and info sessions <br /> designed to help you grow.
          </H3>
        </ContentColumn>
        <FeaturedEvents>
          <FeaturedEventsHeader>
            <p style={{ fontSize: "16px", fontWeight: "400", fontFamily: "Helvetica Neue" }}>Featured Events</p>
            <ExploreAllButton>
              Explore all Events <span>→</span>
            </ExploreAllButton>
          </FeaturedEventsHeader>
          <EventsContainer>
            {events.map((event) => (
              <EventCard key={event.id}>
                <EventImage>
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </EventImage>
                <EventDetails>
                  <EventTitle>{event.title}</EventTitle>
                  <EventMeta>
                    <span>
                      <Icon>calendar</Icon>
                      {event.date}
                    </span>
                    <span>
                      <Icon>pin_drop</Icon>
                      {event.location}
                    </span>
                  </EventMeta>
                  <RegisterButton onClick={() => handleRegisterClick(event)}>
                    Register Now
                  </RegisterButton>
                </EventDetails>
              </EventCard>
            ))}
          </EventsContainer>
        </FeaturedEvents>
      </WelcomeSection>
    </div>
  );
};

export default Section16;