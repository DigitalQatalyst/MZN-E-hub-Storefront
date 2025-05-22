"use client";

import styled from "styled-components";
import { H3 } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import Image from "next/image";
import Icon from "@component/icon/Icon";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  font-family: 'Abhaya Libre', serif;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  flex-wrap: nowrap; /* Prevent wrapping to ensure even distribution */
`;

const EventCard = styled.div`
  background-color: #0030E3;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0; /* Equal flex basis for even distribution */
  min-width: 0; /* Prevent overflow */
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
`;

const EventMeta = styled.div`
  font-size: 14px;
  font-family: "Public Sans";
  color: #FFF;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Add spacing between icon and text */
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

  return (
    <div>
      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <p style={{ fontSize: "16px", fontWeight: "400" }}>JOIN OUR UPCOMING EVENTS</p>
          <H3 fontSize="48px" fontWeight="400" mb="1rem">
            Workshops, bootcamps, and info sessions <br /> designed to help you grow.
          </H3>
        </ContentColumn>
        <FeaturedEvents>
          <FeaturedEventsHeader>
            <p style={{ fontSize: "16px", fontWeight: "400" }}>Featured Events</p>
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
                      <Icon>calendar_month</Icon>
                      {event.date}
                    </span>
                    <span>
                      <Icon>pin_drop</Icon>
                      {event.location}
                    </span>
                  </EventMeta>
                  <RegisterButton>Register Now</RegisterButton>
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