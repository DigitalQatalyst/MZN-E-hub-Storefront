"use client";

import styled from "styled-components";
import { H3 } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import Image from "next/image";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #FFF; /* White background as per the image */
  color: #000;
  padding: 50px 120px 50px 120px;
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
  align-items: flex-start; /* Align items to the top to match the image */
  width: 100%;
  margin-bottom: 1rem;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Spacing between the heading and the new text */
`;

const SubText = styled.p`
  font-size: 16px;
  font-family: "Public Sans";
  font-weight: 400;
  color: #000; /* Gray color to match the style of other secondary text */
  margin: 0;
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
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0; /* Equal flex basis for even distribution */
  min-width: 0; /* Prevent overflow */
`;

const EventImage = styled.div`
  height: 200px;
  flex-shrink: 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
`;

const EventDetails = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Reduced gap to match the tighter spacing in the image */
`;

const EventTitle = styled.h4`
  font-size: 18px; /* Slightly smaller to match the image */
  font-weight: 400;
  color: #000;
  margin: 0;
`;

const EventMeta = styled.div`
  font-size: 14px;
  font-family: "Public Sans";
  color: #666; /* Gray color for dates as per the image */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExploreAllButton = styled(DefaultButton)`
  background-color: transparent;
  color: #0030E3; /* Blue color to match the image */
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  &:hover {
    color: #002180; /* Darker blue on hover */
  }
`;

// TYPES

interface Event {
  id: number;
  image: string;
  title: string;
  date: string;
}

const Section16: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      image: "/assets/images/Groceries Shop/one.png",
      title: "Khalifa Fund for Enterprise Development sponsors ...",
      date: "17-03-2025",
    },
    {
      id: 2,
      image: "/assets/images/Groceries Shop/two.png",
      title: "Khalifa Fund sponsors 4 ventures participating in Dubai Internation ...",
      date: "14-04-2025",
    },
    {
      id: 3,
      image: "/assets/images/Groceries Shop/three.png",
      title: "Khalifa Fund for Enterprise Development sponsors ...",
      date: "24-04-2025",
    },
    {
      id: 4,
      image: "/assets/images/Groceries Shop/four.png",
      title: "Khalifa Fund sponsors 4 ventures participating in Dubai Internation ...",
      date: "09-05-2025",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <H3 style={{ fontSize: "16px", fontWeight: "500", textTransform: "uppercase" }}>
            Latest Insights & Success Stories
          </H3>
          <H3 fontSize="48px" fontWeight="600">
            Stay informed with curated news, <br /> market analysis, and real-world case studies
          </H3>
        </ContentColumn>
        <FeaturedEvents>
          <FeaturedEventsHeader>
            <HeaderTextContainer>
              <p style={{ fontSize: "16px", fontWeight: "400", textTransform: "uppercase" }}>
                Latest Media Updates
              </p>
              <SubText>Discover the latest news and updates.</SubText>
            </HeaderTextContainer>
            <ExploreAllButton>
              Explore more <span>→</span>
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
                    <span>{event.date}</span>
                  </EventMeta>
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