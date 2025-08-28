"use client";

import styled from "styled-components";
import { H3 } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import Image from "next/image";
import { useRouter } from "next/navigation";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #FFF;
  color: #000;
  padding: 50px 120px 50px 120px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 40px 80px 40px 80px;
  }

  @media (max-width: 768px) {
    padding: 30px 40px 30px 40px;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 20px 20px 20px 20px;
    gap: 1rem;
  }
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
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const EventsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const EventCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1 1 0;
  min-width: 0;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const EventImage = styled.div`
  height: 200px;
  flex-shrink: 0;
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }
`;

const EventDetails = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const EventTitle = styled.h4`
  font-size: 18px;
  font-weight: 400;
  color: #000;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const EventMeta = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 0.25rem;
  }
`;

const ExploreAllButton = styled(DefaultButton)`
  background-color: transparent;
  color: #0030E3;
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  &:hover {
    color: #002180;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
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
      title: "Khalifa Fund sponsors ventures participating in Dubai ...",
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
      title: "Khalifa Fund sponsors ventures participating in Dubai ...",
      date: "09-05-2025",
    },
  ];

  const router = useRouter();

  const handleExploreAllClick = () => {
    router.push("https://kf-ej-media-marketplace-c0cllh08g-digitalqatalysts-projects.vercel.app/");
  };

  return (
    <div>
      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <H3 style={{ fontSize: "16px", fontWeight: "400", textTransform: "uppercase" }}>
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
            <ExploreAllButton onClick={handleExploreAllClick}>
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